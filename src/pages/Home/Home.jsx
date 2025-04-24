import React, { useEffect } from "react";
import Hero from "./Hero";
import Display from "./Display";

const Home = () => {
  const pageTitle = "Home";

  useEffect(() => {
    document.title = pageTitle || "Home Page";
  }, [pageTitle]);

  return (
    <>
      <Hero />
      <Display />
    </>
  );
};

export default Home;
