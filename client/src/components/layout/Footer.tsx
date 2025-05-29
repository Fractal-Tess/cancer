
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-bold">SafeRide</h3>
          <p className="text-sm text-gray-600">
            The future of car insurance. Simple, transparent, and tailored to you.
          </p>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase text-gray-500">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-sm text-gray-600 hover:text-insurance-blue">About Us</Link></li>
            <li><Link to="/careers" className="text-sm text-gray-600 hover:text-insurance-blue">Careers</Link></li>
            <li><Link to="/press" className="text-sm text-gray-600 hover:text-insurance-blue">Press</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase text-gray-500">Resources</h4>
          <ul className="space-y-2">
            <li><Link to="/faq" className="text-sm text-gray-600 hover:text-insurance-blue">FAQ</Link></li>
            <li><Link to="/support" className="text-sm text-gray-600 hover:text-insurance-blue">Support</Link></li>
            <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-insurance-blue">Privacy Policy</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase text-gray-500">Contact</h4>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600">Email: hello@saferide.com</li>
            <li className="text-sm text-gray-600">Phone: 1-800-SAFE-RIDE</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto mt-8 border-t border-gray-200 pt-6">
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SafeRide Insurance. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
