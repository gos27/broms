import React, { useEffect } from "react";
import Events from "../Events/Events";
import Admission from "./Admission";
import OurSchool from "./OurSchool";

const Display = () => {
  const pageTitle = "Home";

  useEffect(() => {
    document.title = pageTitle || "Home Page";
  }, [pageTitle]);

  return (
    <div className="pb-8">
      <Admission />
      <OurSchool />
      <Events />
    </div>
  );
};

export default Display;
