import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Top Converters
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link to="/length-converter" className="hover:text-blue-600 transition-colors">Length Converter</Link></li>
              <li><Link to="/weight-converter" className="hover:text-blue-600 transition-colors">Weight &amp; Mass Converter</Link></li>
              <li><Link to="/temperature-converter" className="hover:text-blue-600 transition-colors">Temperature Converter</Link></li>
              <li><Link to="/volume-converter" className="hover:text-blue-600 transition-colors">Volume Converter</Link></li>
              <li><Link to="/area-converter" className="hover:text-blue-600 transition-colors">Area Converter</Link></li>
              <li><Link to="/speed-converter" className="hover:text-blue-600 transition-colors">Speed Converter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Popular Pairs
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link to="/convert/kg-to-lbs" className="hover:text-blue-600 transition-colors">KG to LBS (Kilograms to Pounds)</Link></li>
              <li><Link to="/convert/lbs-to-kg" className="hover:text-blue-600 transition-colors">LBS to KG (Pounds to Kilograms)</Link></li>
              <li><Link to="/convert/cm-to-inches" className="hover:text-blue-600 transition-colors">CM to Inches</Link></li>
              <li><Link to="/convert/inches-to-cm" className="hover:text-blue-600 transition-colors">Inches to CM</Link></li>
              <li><Link to="/convert/celsius-to-fahrenheit" className="hover:text-blue-600 transition-colors">Celsius to Fahrenheit</Link></li>
              <li><Link to="/convert/km-to-miles" className="hover:text-blue-600 transition-colors">KM to Miles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link to="/pressure-converter" className="hover:text-blue-600 transition-colors">Pressure Converter</Link></li>
              <li><Link to="/energy-converter" className="hover:text-blue-600 transition-colors">Energy Converter</Link></li>
              <li><Link to="/power-converter" className="hover:text-blue-600 transition-colors">Power Converter</Link></li>
              <li><Link to="/data-converter" className="hover:text-blue-600 transition-colors">Digital Data Converter</Link></li>
              <li><Link to="/time-converter" className="hover:text-blue-600 transition-colors">Time Converter</Link></li>
              <li><Link to="/fuel-economy-converter" className="hover:text-blue-600 transition-colors">Fuel Economy Converter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Trust &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About UnitFlow</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Use</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} UnitFlow. Free online unit conversion tools for everyday, educational, and professional use.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/popular" className="hover:text-blue-600 transition-colors">Popular</Link>
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
