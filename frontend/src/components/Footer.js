import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h6 className="text-lg font-semibold">Employee Management System</h6>
          <p className="text-sm mt-1">
            Empowering your organization with efficient employee management tools.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
          <a href="#" className="text-sm text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white mx-2">
            Contact Us
          </a>
        </div>
      </div>
      <div className="mt-4 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Employee Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
