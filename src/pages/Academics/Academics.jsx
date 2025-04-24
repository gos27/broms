import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Pagination,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import ReusableForm from "../../components/ReusableForm";
import { onAuthStateChanged } from "firebase/auth";
import { AcademicSchema } from "../../components/schemas/schemas";

const Academic = () => {
  const pageTitle = "Academics";

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const initialValues = { name: "", subject: "", score: "", gender: "" };
  const fields = [
    { name: "name", label: "Name", control: "input" },
    { name: "subject", label: "Subject", control: "input" },
    { name: "score", label: "Score", control: "input" },
    {
      name: "gender",
      label: "Gender",
      control: "select",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
    },
  ];

  const fetchRecords = async () => {
    setLoading(true);
    toast.info("Loading...", { icon: "⏳", theme: "dark" });
    try {
      const querySnapshot = await getDocs(collection(db, "academics"));
      const fetchedRecords = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(fetchedRecords);
    } catch (error) {
      console.error("Failed to fetch academics", error);
      toast.error("Error fetching records!", { icon: "⚠️", theme: "dark" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = pageTitle || "Broms";
  }, [pageTitle]);

  useEffect(() => {
    fetchRecords();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Fetch the user's role from Firestore (e.g., a `users` collection)
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          }
        } catch (error) {
          console.error("Error fetching user role", error);
          setIsAdmin(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePost = async (formData) => {
    try {
      const docRef = await addDoc(collection(db, "academics"), formData);
      setRecords((prev) => [...prev, { id: docRef.id, ...formData }]);
      toast.success("Record added!", { icon: "📘", theme: "dark" });
    } catch (err) {
      toast.error("Error adding record!", { icon: "⚠️", theme: "dark" });
    }
  };

  const handleUpdate = async (formData) => {
    if (!formData.id) return;
    try {
      const docRef = doc(db, "academics", formData.id);
      await updateDoc(docRef, formData);
      setRecords((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item)),
      );
      setModalOpen(false);
      toast.success("Record updated!", { icon: "✅", theme: "dark" });
    } catch (error) {
      toast.error("Error updating record!", { icon: "⚠️", theme: "dark" });
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "academics", id);
      await deleteDoc(docRef);
      setRecords((prev) => prev.filter((item) => item.id !== id));
      toast.success("Record deleted!", { icon: "🗑️", theme: "dark" });
    } catch (error) {
      toast.error("Error deleting record!", { icon: "⚠️", theme: "dark" });
    }
  };

  const openModal = (data) => {
    setCurrentData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentData(null);
    setModalOpen(false);
  };

  const filteredRecords = records.filter(
    (rec) =>
      rec.name.toLowerCase().includes(search.toLowerCase()) ||
      rec.subject.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  return (
    <Paper sx={{ mt: 2 }}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }} variant="h4" mb={3}>
          Academic Records
        </Typography>

        {/* Show ReusableForm only if the user is admin */}
        {isAdmin && (
          <ReusableForm
            initialValues={initialValues}
            validationSchema={AcademicSchema}
            fields={fields}
            submitLabel="Add Academic Record"
            onSubmit={handlePost}
          />
        )}

        <TextField
          label="Search by Name or Subject"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Loading Academics...
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
                mt: 4,
              }}
            >
              {currentRecords.map((record) => (
                <Card
                  key={record.id}
                  elevation={3}
                  sx={{
                    transition: "all 0.3s ease",
                    ":hover": {
                      boxShadow: 6,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {record.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Subject: {record.subject}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Gender: {record.gender}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Score: {record.score}
                    </Typography>
                  </CardContent>

                  {/* Show Edit/Delete buttons only if the user is admin */}
                  {isAdmin && (
                    <CardActions
                      sx={{ justifyContent: "space-between", px: 2 }}
                    >
                      <Button size="small" onClick={() => openModal(record)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  )}
                </Card>
              ))}
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}

        {/* Modal for updating records */}
        {isAdmin && (
          <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm">
            <DialogTitle>Edit Academic</DialogTitle>
            <DialogContent>
              <ReusableForm
                initialValues={initialValues}
                validationSchema={null}
                fields={[
                  { name: "name", label: "Name", control: "input" },
                  { name: "subject", label: "Subject", control: "input" },
                  { name: "score", label: "Score", control: "input" },
                  {
                    name: "gender",
                    label: "Gender",
                    control: "select",
                    options: [
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Other", value: "Other" },
                    ],
                  },
                ]}
                submitLabel="Update Record"
                onSubmit={handleUpdate}
                mode="update"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>Cancel</Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Paper>
  );
};

export default Academic;
