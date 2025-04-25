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

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="/forms/broms-application-2025.pdf"
          download
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto sm:text-base"
        >
          Application Form
        </a>

        <Link
          to="/contact"
          className="w-full rounded-lg bg-green-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto sm:text-base"
        >
          Arrange a Visit
        </Link>
      </div>
    </section>
  );
};

export default Admission;
