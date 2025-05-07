import React from 'react';

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <div
      className="p-6 rounded-2xl shadow-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        fontFamily: "'Lato', Arial, sans-serif",
        minWidth: '220px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}
    >
      <h2
        className="text-xl mb-5"
        style={{
          fontFamily: "'Montserrat', Arial, sans-serif",
          fontWeight: 700,
          letterSpacing: '0.02em',
          color: '#2d3748',
        }}
      >
        Navigation
      </h2>
      <ul className="space-y-2">
        {[
          { key: 'moodTracker', label: 'Mood Tracker' },
          { key: 'journal', label: 'Journal' },
          { key: 'articles', label: 'Articles' },
          { key: 'doctors', label: 'Doctors' },
        ].map(({ key, label }) => (
          <li key={key}>
            <button
              onClick={() => setActiveSection(key)}
              className={`w-full text-left p-2 rounded-lg transition-all duration-200 font-semibold ${
                activeSection === key
                  ? 'bg-blue-500 text-white shadow'
                  : 'text-blue-800 hover:bg-blue-100'
              }`}
              style={{
                fontFamily: "'Lato', Arial, sans-serif",
                fontSize: '1.05rem',
                letterSpacing: '0.01em',
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
