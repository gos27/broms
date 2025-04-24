import React from "react";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between bg-blue-900 px-6 py-4 text-gray-300 shadow-inner md:flex-row">
      <div className="text-center text-sm font-bold md:text-left">
        <p>
          © {new Date().getFullYear()}
          <span className="ml-1 text-emerald-400 hover:text-white">
            <a href="https://spiffy-ganache-3303fc.netlify.app/">
              Abolade-GOS.
            </a>
          </span>
          All rights reserved
        </p>
      </div>
      <div className="mt-4 flex gap-3 md:mt-0">
        <a
          href="https://www.facebook.com/gos27"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-400 p-2 text-white transition hover:bg-white hover:text-emerald-600"
        >
          <FaFacebook />
        </a>
        <a
          href="https://x.com/GOS027"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-400 p-2 text-white transition hover:bg-white hover:text-emerald-600"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com/in/gos27/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-400 p-2 text-white transition hover:bg-white hover:text-emerald-600"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
