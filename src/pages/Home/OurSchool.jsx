import React from "react";
import CountUp from "react-countup";
import {
  FaChalkboardTeacher,
  FaSchool,
  FaGlobe,
  FaAward,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaChalkboardTeacher size={40} className="text-blue-600" />,
    label: "Certified Teachers",
    count: 50,
  },
  {
    icon: <FaSchool size={40} className="text-green-600" />,
    label: "Modern Facilities",
    count: 10,
  },
  {
    icon: <FaGlobe size={40} className="text-yellow-500" />,
    label: "International Students",
    count: 200,
  },
  {
    icon: <FaAward size={40} className="text-purple-600" />,
    label: "Years of Excellence",
    count: 5,
  },
];

const OurSchool = () => {
  return (
    <section className="mx-auto max-w-6xl bg-white px-4 py-12 text-center">
      <h2 className="mb-2 text-3xl font-bold capitalize text-blue-700">
        Few facts about our school
      </h2>
      <h4 className="mb-8 text-lg text-gray-600">
        Here are some statistics about our School.
      </h4>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg bg-gray-100 p-6 shadow transition hover:shadow-md"
          >
            {stat.icon}
            <h3 className="mt-3 text-2xl font-bold text-blue-800">
              <CountUp end={stat.count} duration={2} />+
            </h3>
            <p className="mt-1 text-base font-medium text-gray-800">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurSchool;
