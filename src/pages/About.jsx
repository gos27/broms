import React, { useEffect } from "react";

const About = () => {
  const pageTitle = "About ";
  useEffect(() => {
    document.title = pageTitle || "Brom`s";
  }, [pageTitle]);

  return (
    <section className="bg-blue-50 px-6 py-16 text-center">
      <h2 className="text-4xl font-bold text-blue-700">About Our School</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
        We are committed to providing quality education using modern learning
        facilities and experienced educators. Our goal is to empower students
        with the knowledge, skills, and confidence to excel in their academic
        and personal lives.
      </p>

      {/* Optional Image */}
      <div className="mt-8">
        <img
          src="/assets/learn.jpg"
          alt="School Campus"
          className="mx-auto h-64 w-full rounded-lg object-cover shadow-lg"
        />
      </div>
      {/* Call to Action */}
      <div className="mt-12">
        <a
          href="/contact"
          className="rounded-full bg-blue-700 px-8 py-3 text-lg text-white transition hover:bg-blue-800"
        >
          Get in Touch
        </a>
      </div>
      {/* History or Mission */}
      <div className="mx-auto mt-12 max-w-3xl">
        <h3 className="text-2xl font-semibold text-blue-600">Our Mission</h3>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Our mission is to create a learning environment that fosters
          creativity, critical thinking, and collaboration, while providing
          students with the tools they need to become lifelong learners and
          responsible global citizens.
        </p>
        <div className="mt-8">
          <img
            src="/assets/atlas.jpg"
            alt="Atlas "
            className="mx-auto h-64 w-full rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
