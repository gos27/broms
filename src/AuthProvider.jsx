// src/AuthProvider.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser && !currentUser.emailVerified) {
        alert("Please verify your email before proceeding!");
      }
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  return user;
};

export default useAuth;
