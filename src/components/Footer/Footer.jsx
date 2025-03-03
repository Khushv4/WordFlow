import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-amber-400 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col justify-between">
            <div className="mb-4 flex items-center justify-center lg:justify-start">
              <Logo width="100px" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-600">Created by KV</p>
            </div>
          </div>

          <div>
            <h3 className="text-center lg:text-left tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
              WordFlow
            </h3>
            <ul className="text-center lg:text-left">
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Features
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Pricing
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-center lg:text-left tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
              Support
            </h3>
            <ul className="text-center lg:text-left">
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/login">
                  Account
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Help
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-center lg:text-left tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
              Legals
            </h3>
            <ul className="text-center lg:text-left">
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-900 hover:text-gray-700 transition" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
