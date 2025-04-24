import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@mui/material';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

const ContactList = () => {
  const pageTitle = 'Contact List';
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    toast.info("Loading contacts ...", { icon: "📞", theme: "dark" });
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const fetchedData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(fetchedData);
    } catch (error) {
      console.error("Failed to fetch contact records", error);
      toast.error("Error fetching records", { icon: "⚠️", theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = pageTitle;
  }, []);

  useEffect(() => {
    fetchRecords();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setIsAdmin(userDoc.data().role === "admin");
          }
        } catch (error) {
          console.error("Error fetching user role", error);
          setIsAdmin(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Records
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress />
          <Typography mt={2}>Loading contact records...</Typography>
        </Box>
      ) : records.length === 0 ? (
        <Typography align="center" mt={4}>No contact found</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" mt={2}>
          {records.map((record) => (
            <Grid item key={record.id}>
              <Box width={300}>
                <Card
                  elevation={4}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    backgroundColor: '#fefefe',
                    ':hover': {
                      backgroundColor: '#e3f2fd',
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{record.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong> {record.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Phone:</strong> {record.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      <strong>Message:</strong> {record.message}
                    </Typography>
                  </CardContent>

                  
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContactList;
