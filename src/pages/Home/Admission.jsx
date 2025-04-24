import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Admission = () => {
  return (
    <section className="mx-auto my-12 max-w-4xl rounded-xl bg-white p-8 shadow-md">
      <Typography
        sx={{ textAlign: "center", fontSize: 42, color: "blue" }}
        variant="h1"
      >
        Apply For Admission
      </Typography>
      <h4 className="mb-8 text-center text-lg text-gray-700">
        Admission into Broms' International School for 2025/2026 Academic
        Session is in progress.
      </h4>

      <div className="flex flex-col justify-center gap-4 text-center sm:flex-row">
        <a
          href="/forms/broms-application-2025.pdf" // replace with your actual file URL
          download
          className="rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition hover:bg-blue-700"
        >
          Download Application Form
        </a>

        <Link
          to="/contact"
          className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          Arrange a Visit
        </Link>
      </div>
    </section>
  );
};

export default Admission;
