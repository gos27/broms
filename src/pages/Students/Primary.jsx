import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert, Paper } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import PrimaryContent from "./PrimaryContent"; // move your main logic into this component

const Primary = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Primary";
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("You must be logged in to access this page.");
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.role === "admin") {
            setIsAdmin(true);
          } else {
            setError("Access denied. Admins only.");
          }
        } else {
          setError("User role not found.");
        }
      } catch (err) {
        console.error("Error fetching user role", err);
        setError("Failed to verify access.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography mt={2}>Checking permissions...</Typography>
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Paper sx={{ p: 4, maxWidth: 500, margin: "0 auto" }}>
          <Alert severity="error">{error}</Alert>
        </Paper>
      </Box>
    );
  }

  return <PrimaryContent />;
};

export default Primary;
