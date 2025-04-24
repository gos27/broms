import React, { useEffect, useState } from "react";
import instance from "../../context/instance";
import TestimonialsForm from "./TestimonialsForm";
import DataDisplay from "../../components/DataDisplay";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Testimonials = () => {
  const pageTitle = "Testimonials";

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/testimonials.json");
      if (res.data) {
        const fetched = Object.entries(res.data).map(([id, data]) => ({
          id,
          ...data,
        }));
        setRecords(fetched);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = pageTitle || "Broms";
  }, [pageTitle]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const handlePost = async (formData) => {
    const { id, ...cleanedData } = formData;
    const res = await instance.post("/testimonials.json", cleanedData);
    const newItem = { id: res.data.name, ...cleanedData };
    setRecords((prev) => [...prev, newItem]);
  };

  const handleUpdate = async (formData) => {
    if (!formData.id) return alert("No ID provided for update!");
    try {
      await instance.put(`/testimonials/${formData.id}.json`, {
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
      });
      fetchRecords();
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating record: ", error);
      alert("An error occurred while updating the record");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return alert("No ID provided for deletion");
    try {
      await instance.delete(`/testimonials/${id}.json`);
      setRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting record: ", error);
      alert("An error occurred while deleting the record.");
    }
  };

  const openModal = (data) => {
    if (data && data.id) {
      setCurrentData(data);
      setModalOpen(true);
    } else {
      console.error("Invalid data or missing ID", data);
    }
  };

  const closeModal = () => {
    setCurrentData(null);
    setModalOpen(false);
  };

  return (
    <Paper sx={{ mt: 2 }}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }} variant="h4" mb={3}>
          Testimonials Records
        </Typography>
        <TestimonialsForm handlePost={handlePost} />
        {loading ? (
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Loading testimonials...
          </Typography>
        ) : (
          <DataDisplay
            data={records}
            keys={["name", "subject", "message"]}
            onEdit={(record) => openModal(record)}
            onDelete={handleDelete}
          />
        )}
        <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth>
          <DialogTitle>Edit Testimonials</DialogTitle>
          <DialogContent>
            <TestimonialsForm
              initialData={currentData}
              handleUpdate={handleUpdate}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};

export default Testimonials;
