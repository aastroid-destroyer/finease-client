import React from "react";
import { Link } from "react-router";
import Card from "./SocialCards";

const Footer = () => {
  return (
    <footer className="bg-base-100 dark:bg-base-900 backdrop-blur-md shadow-md border-t border-base-200 dark:border-base-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur-sm opacity-75"></div>
              <div className="relative bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            FinEase
          </Link>
          <p className="mt-4 text-sm text-base-content/70 max-w-xs">
            Smart, secure & effortless personal finance management since 2024.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-4 text-base text-base-content flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary rounded-full"></span>
            Services
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link 
                className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1" 
                to="/add-transaction"
              >
                <span className="text-primary">›</span> Add Transaction
              </Link>
            </li>
            <li>
              <Link 
                className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1" 
                to="/my-transactions"
              >
                <span className="text-primary">›</span> View Transactions
              </Link>
            </li>
            <li>
              <Link 
                className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1" 
                to="/reports"
              >
                <span className="text-primary">›</span> Reports
              </Link>
            </li>
            <li>
              <a className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1">
                <span className="text-primary">›</span> Budget Planning
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-base text-base-content flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary rounded-full"></span>
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link 
                className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1" 
                to="/about-us"
              >
                <span className="text-primary">›</span> About Us
              </Link>
            </li>
            <li>
              <Link 
                className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1" 
                to="/contact"
              >
                <span className="text-primary">›</span> Contact
              </Link>
            </li>
            <li>
              <a className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1">
                <span className="text-primary">›</span> Career
              </a>
            </li>
            <li>
              <a className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1">
                <span className="text-primary">›</span> Press Kit
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-4 text-base text-base-content flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary rounded-full"></span>
            Legal
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link 
                className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1" 
                to="/terms-of-service"
              >
                <span className="text-primary">›</span> Terms of Use
              </Link>
            </li>
            <li>
              <Link 
                className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1" 
                to="/privacy-policy"
              >
                <span className="text-primary">›</span> Privacy Policy
              </Link>
            </li>
            <li>
              <a className="text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-1 hover:translate-x-1">
                <span className="text-primary">›</span> Cookie Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <Card />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-3 text-center text-sm text-base-content/50 border-t border-base-200 dark:border-base-800">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <span>© 2025 FinEase. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;