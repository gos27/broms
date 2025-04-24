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
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import ReusableForm from "../../components/ReusableForm";
import { onAuthStateChanged } from "firebase/auth";
import { EventSchema } from "../../components/schemas/schemas";
import { query, orderBy } from "firebase/firestore";

const Events = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const pageTitle = "Events";

  const initialValues = { name: "", event: "", message: "" };

  const fields = [
    { name: "name", label: "Name", control: "input" },
    { name: "event", label: "Event", control: "input" },
    { name: "message", label: "Message", control: "textarea" },
  ];

  const fetchRecords = async () => {
    setLoading(true);
    toast.info("Loading...", { icon: "⏳", theme: "dark" });
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const fetchRecords = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(fetchRecords);
    } catch (error) {
      console.error("Failed to fetch events", error);
      toast.error("Error fetching records!", { icon: "⚠️", theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.role === "admin");
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
      const docRef = await addDoc(collection(db, "events"), formData);
      setRecords((prev) => [...prev, { id: docRef.id, ...formData }]);
      toast.success("Event added!", { icon: "📘", theme: "dark" });
    } catch (error) {
      toast.error("Error adding event!", { icon: "⚠️", theme: "dark" });
    }
  };

  const handleUpdate = async (formData) => {
    if (!formData.id) return;
    try {
      const docRef = doc(db, "events", formData.id);
      await updateDoc(docRef, formData);
      setRecords((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item)),
      );
      setModalOpen(false);
      toast.success("Event updated!", { icon: "✅", theme: "dark" });
    } catch (error) {
      toast.error("Error updating record!", { icon: "⚠️", theme: "dark" });
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "events", deleteId);
      await deleteDoc(docRef);
      setRecords((prev) => prev.filter((item) => item.id !== deleteId));
      toast.success("Record deleted!", { icon: "🗑️", theme: "dark" });
    } catch (error) {
      toast.error("Error deleting record!", { icon: "⚠️", theme: "dark" });
    } finally {
      setConfirmDeleteOpen(false);
      setDeleteId(null);
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
      rec.event.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  useEffect(() => {
    document.title = pageTitle || "Broms";
  }, [pageTitle]);

  return (
    <Paper sx={{ mt: 2 }}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }} variant="h4" mb={3}>
          Our School Events
        </Typography>

        {isAdmin && (
          <ReusableForm
            initialValues={initialValues}
            validationSchema={EventSchema}
            fields={fields}
            submitLabel="Add Event"
            onSubmit={handlePost}
          />
        )}

        <TextField
          label="Search Event"
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
              Loading Events
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr", // full width on small screens
                  sm: "1fr",
                  md: "1fr", // can later change to "repeat(2, 1fr)" if needed
                  lg: "1fr",
                },
                gap: 3,
                mt: 4,
              }}
            >
              {currentRecords.map((record) => (
                <Card
                  key={record.id}
                  elevation={3}
                  sx={{
                    width: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    borderRadius: 3,
                    ":hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 10,
                    },
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom color="primary">
                      {record.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.secondary"
                    >
                      Event: {record.event}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1.5 }}>
                      Message: {record.message}
                    </Typography>
                  </CardContent>

                  {isAdmin && (
                    <CardActions
                      sx={{
                        justifyContent: "flex-end",
                        px: 2,
                        pb: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => openModal(record)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => confirmDelete(record.id)}
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

        {/* Edit Modal */}
        {isAdmin && (
          <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm">
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
              <ReusableForm
                initialValues={currentData || initialValues}
                validationSchema={EventSchema}
                fields={fields}
                submitLabel="Update Record"
                onSubmit={handleUpdate}
                mode="update"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Confirm Delete Dialog */}
        <Dialog
          open={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this event?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};

export default Events;
