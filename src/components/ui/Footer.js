/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="max-w-7xl mx-auto px-2 pt-5  flex justify-center gap-4 text-sm text-gray-600">
      <a href="#" onClick={() => setCurrentPage("Privacy")} className="hover:text-gray-900">
        Privacy Policy
      </a>
      <span>|</span>
      <a href="#" onClick={() => setCurrentPage("Terms")} className="hover:text-gray-900">
        Terms & Conditions
      </a>
    </footer>
  );
};

export default Footer;
