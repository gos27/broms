// src/components/PostModal.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const PostModal = ({ open, onClose, editablePost, refresh }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editablePost) {
      setTitle(editablePost.title);
      setContent(editablePost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editablePost]);

  const handleSubmit = async () => {
    if (!user) return alert("Please log in to create or update a post.");

    const postData = {
      title,
      content,
      authorId: user.uid,
      createdAt: serverTimestamp(),
    };

    try {
      if (editablePost) {
        const docRef = doc(db, "posts", editablePost.id);
        await updateDoc(docRef, postData);
        toast.success("Post updated!");
      } else {
        await addDoc(collection(db, "posts"), postData);
        toast.success("Post added!");
      }
      refresh(); // trigger parent update
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = async () => {
    if (!editablePost) return;
    try {
      const docRef = doc(db, "posts", editablePost.id);
      await deleteDoc(docRef);
      refresh(); // trigger parent update
      onClose();
      toast.success("Post deleted!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editablePost ? "Edit Post" : "Add New Post"}</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          minRows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {editablePost && (
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editablePost ? "Update" : "Post"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;
