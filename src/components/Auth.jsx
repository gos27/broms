import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Paper, Container } from "@mui/material";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, login, signInWithGoogle, logout, user } = useAuth();
  const navigate = useNavigate();

  const pageTitle = "Login";

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      toast.success("Sign up successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google sign-in failed.");
    }
  };

  useEffect(() => {
    document.title = pageTitle || "Broms";
  });

  return (
    <Container>
      <Paper sx={{ margin: "auto", padding: "40px" }}>
        <div className="mx-auto mt-16 max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-md">
          <h2 className="text-center text-xl font-bold underline">
            Login / Register
          </h2>

          <input
            className="w-full rounded border p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded border p-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="space-y-2">
            <button
              onClick={handleSignUp}
              className="w-full rounded bg-green-500 px-3 py-2 text-white"
              disabled={!email || !password}
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="w-full rounded bg-blue-500 px-3 py-2 text-white"
              disabled={!email || !password}
            >
              Login
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="w-full rounded bg-red-500 px-3 py-2 text-white"
            >
              Google Sign In
            </button>
          </div>

          {user && (
            <button
              onClick={logout}
              className="mt-2 text-sm text-gray-600 underline"
            >
              Logout
            </button>
          )}
        </div>
      </Paper>
    </Container>
  );
}

export default Auth;
