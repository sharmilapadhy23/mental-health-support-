import React from 'react';
import { motion } from 'framer-motion';
export default function Sidebar({ activeSection, setActiveSection }) {
  // Color palette from your app's theme
  const colors = {
    primary: '#1976d2',       // Main blue
    secondary: '#009688',     // Teal
    accent: '#81d4fa',        // Light sky blue
    background: '#e3f2fd',    // Light blue background
    textDark: '#1a237e',      // Dark blue text
    textLight: '#f8f9fa'      // Off-white
  };

  return (
    <div
      className="p-6 rounded-2xl shadow-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(16px) saturate(180%)',
        border: `1px solid ${colors.accent}`,
        minWidth: '240px',
        boxShadow: '0 4px 30px rgba(25, 118, 210, 0.1)',
      }}
    >
      <h2
        className="text-2xl mb-6 font-bold"
        style={{
          color: colors.primary,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '-0.02em',
        }}
      >
        Navigation
      </h2>
      <ul className="space-y-3">
        {[
          { key: 'moodTracker', label: 'Mood Tracker' },
          { key: 'journal', label: 'Journal' },
          { key: 'articles', label: 'Articles' },
          { key: 'doctors', label: 'Doctors' },
        ].map(({ key, label }) => (
          <li key={key}>
            <button
              onClick={() => setActiveSection(key)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300
                ${activeSection === key
                  ? `bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] text-white shadow-lg`
                  : 'hover:bg-blue-50 text-blue-900 hover:pl-4'
                }`}
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
              }}
            >
              {label}
              {activeSection === key && (
                <motion.span 
                  className="ml-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  →
                </motion.span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
