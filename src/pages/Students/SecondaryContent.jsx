import React,{useState,useEffect} from "react";
import {Box,Typography,Paper,CircularProgress,Dialog,DialogTitle,DialogContent, DialogActions,Button,Card,CardContent,CardActions,TextField,Pagination} from '@mui/material'
import {toast} from 'react-toastify'
import {collection,addDoc,updateDoc,deleteDoc,doc,getDoc,getDocs} from 'firebase/firestore'
import {db,auth} from '../../firebaseConfig'
import ReusableForm from "../../components/ReusableForm";
import { onAuthStateChanged } from "firebase/auth";
import { CollegeSchema } from "../../components/schemas/schemas";

const SecondaryContent = () => {
  const pageTitle = 'Secondary'
  const [loading,setLoading]=useState(true)
  const [records,setRecords]=useState([])
  const [modalOpen,setModalOpen] = useState(false)
  const [currentData,setCurrentData]= useState(null)
  const [deleteId,setDeleteId] =useState(null)
  const [confirmDeleteOpen,setConfirmDeleteOpen] =useState(false)
  const [search,setSearch]= useState('')
  const [currentPage,setCurrentPage]= useState(1)
  const recordsPerPage  = 6

  const [user,setUser] =useState(null)
  const[isAdmin,setIsAdmin] = useState(false)

  const initialValues = {
    name: "",
    class: "",
    gender: "",
    house: "",
    status: "",
  };

  const fields = [
    { name: "name", label: "Name", control: "input" },
    {
      name: "class",
      label: "Class",
      control: "select",
      options: [
        { label: "JSS 1", value: "JSS-1" },
        { label: "JSS 2", value: "JSS-2" },
        { label: "JSS 3", value: "JSS-3" },
        { label: "SSS 1", value: "SSS-1" },
        { label: "SSS 2", value: "SSS-2" },
        { label: "SSS 3", value: "SSS-3" },
        
      ],
    },
    {
      name: "gender",
      label: "Gender",
      control: "select",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
    {
      name: "house",
      label: "House",
      control: "select",
      options: [
        { label: "Red", value: "red" },
        { label: "Yellow", value: "yellow" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
      ],
    },
    {
      name: "status",
      label: "Payment Status",
      control: "select",
      options: [
        { label: "Paid", value: "paid" },
        { label: "Not-Paid", value: "not-Paid" },
        { label: "Scholarship", value: "scholarship" },
      ],
    },
  ];

  const fetchRecords = async () => {
    setLoading(true)
    toast.info('Loading data ...',{ icon: "⏳", theme: "dark" });
    try {
      const querySnapshot = await getDocs(collection(db, 'college'))
      const fetchRecords = querySnapshot.docs.map((doc)=> ({
        id: doc.id, ...doc.data()
      }))
      setRecords(fetchRecords)
    }catch (error) {
      console.error("Failed to fetch College records", error);
      toast.error("Error fecthing records", { icon: "⚠️", theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    document.title =pageTitle || 'Broms'
  },[pageTitle])

  useEffect(()=>{
    fetchRecords()
    const unsubscribe = onAuthStateChanged(auth,async(currentUser)=> {
      setUser(currentUser)
      if(currentUser){
        try {
          const userDocRef =doc(db, 'users', currentUser.uid)
          const userDoc = await getDoc(userDocRef)
          if(userDoc.exists()){
            const userData = userDoc.data()
            if(userData.role === 'admin'){
              setIsAdmin(true)
            }else {
              setIsAdmin(true)
            }
          }
        }catch (error) {
          console.error("Error fetching user role", error);
          setIsAdmin(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async(formData)=>{
    try {
      const docRef = await addDoc(collection(db,'college'),formData)
      setRecords((prev)=> [...prev, {id: docRef.id, ...formData}])
      toast.success("Student record added...", { icon: "📘", theme: "dark" });
    } catch (error) {
      toast.error("Error adding record!", { icon: "⚠️", theme: "dark" });
    }
  };

  const handleUpdate = async(formData)=> {
    if(!formData.id) return
    try {
      const docRef = doc(db, 'college', formData.id)
      await updateDoc(docRef,formData)
      setRecords((prev)=>
        prev.map((item)=> (item.id === formData.id ? formData : item))
      )
      setModalOpen(false);
      toast.success("Student record updated...", { icon: "✅", theme: "dark" });
    } catch (error) {
      toast.error("Error updating record", { icon: "⚠️", theme: "dark" });
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "college", deleteId);
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
    (record) =>
      record.name?.toLowerCase().includes(search.toLowerCase()) ||
      record.class?.toLowerCase().includes(search.toLowerCase()) ||
      record.house?.toLowerCase().includes(search.toLowerCase()) ||
      record.status?.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  
  return (
  <Paper sx={{mt:2}}>
    <Box sx={{p:3}}>
      <Typography sx={{textAlign:'center'}} variant='h4' mb={3} >
        College School Records
      </Typography>
      {isAdmin && (
        <ReusableForm initialValues={initialValues} validationSchema={CollegeSchema} fields={fields} submitLabel='Add Students'
        onSubmit={handlePost} 
        />
       
      )} <TextField label='College Records' variant='outlined' fullWidth sx={{mt:3}} value={search} 
        onChange={(e)=> setSearch(e.target.value)} />
        {loading ? (
          <Box sx={{textAlign:'center', marginTop:4}}>
            <CircularProgress/>
            <Typography sx={{marginTop:2}} variant='h6'>
              Loading College records
            </Typography>
          </Box>
        ):(
          <>
          <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: 3,
                mt: 4,
              }}
            >
                            {currentRecords.map((record) => (
                <Card
                  key={record.id}
                  elevation={4}
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    backgroundColor: "#f9f9f9",
                    ":hover": {
                      backgroundColor: "#e3f2fd",
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {record.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Class: {record.class}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gender: {record.gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      House:{" "}
                      {record.house.charAt(0).toUpperCase() +
                        record.house.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status:{" "}
                      {record.status.charAt(0).toUpperCase() +
                        record.status.slice(1)}
                    </Typography>
                  </CardContent>

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
              ></Pagination>
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
                validationSchema={CollegeSchema}
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
        <Dialog
          open={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this student record?
            </Typography>
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

export default SecondaryContent;
