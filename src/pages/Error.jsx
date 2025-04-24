import React, { useEffect } from "react";

const Error = () => {
  const pageTitle = "Error Page";

  useEffect(() => {
    document.title = pageTitle || "Broms";
  }, [pageTitle]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="text-5xl font-extrabold text-blue-600">404</h2>
        <p className="mt-4 text-xl text-gray-600">
          Oops! The page you are looking for doesn't exist.
        </p>
        <p className="mt-2 text-lg text-gray-500">
          Please check the URL or go back to the homepage.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg text-white transition hover:bg-blue-700"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Error;
