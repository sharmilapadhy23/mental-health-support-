import React, { useState } from 'react';

export default function Journal({ user }) {
  const [entry, setEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState(() => {
    const storedEntries = localStorage.getItem(`journal_${user.uid}`);
    return storedEntries ? JSON.parse(storedEntries) : [];
  });

  function getFormattedDate() {
    const now = new Date();
    return now.toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    const newEntry = { text: entry, date: getFormattedDate() };
    const newEntries = [...journalEntries, newEntry];
    setJournalEntries(newEntries);
    localStorage.setItem(`journal_${user.uid}`, JSON.stringify(newEntries));
    setEntry('');
  };

  return (
    <div
      className="p-8 rounded-2xl shadow-xl w-full max-w-xl mx-auto"
      style={{
        background: '#ffffffcc',
        color: '#2c3e50',
        fontFamily: "'Montserrat', sans-serif",
        minHeight: '500px',
        boxSizing: 'border-box',
        border: '1.5px solid #a1c4fd',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      }}
    >
      <h2
        className="text-3xl mb-6"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          borderBottom: '2px solid #a1c4fd',
          paddingBottom: '12px',
          marginBottom: '32px',
          color: '#2c3e50',
          letterSpacing: '0.03em',
        }}
      >
        Journal
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full h-32 p-4 border rounded-md resize-none focus:outline-none"
          style={{
            background: '#f0f5ff',
            color: '#2c3e50',
            borderColor: '#a1c4fd',
            marginBottom: '18px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.07rem',
            borderWidth: '2px',
            transition: 'border-color 0.2s',
          }}
        />
        <button
          type="submit"
          className="rounded-md px-5 py-2 self-end transition-colors duration-200 shadow font-semibold"
          style={{
            background: '#4a90e2',
            color: '#ffffff',
            fontFamily: "'Lato', Arial, sans-serif",
            fontSize: '1rem',
            letterSpacing: '0.03em',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#357ABD')}
          onMouseOut={e => (e.currentTarget.style.background = '#4a90e2')}
        >
          Add Entry
        </button>
      </form>
      <div className="mt-8 max-h-64 overflow-y-auto">
        {journalEntries.map((entry, index) => (
          <div
            key={index}
            className="border-b py-3"
            style={{
              borderColor: '#a1c4fd',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '1.05rem',
              background: index % 2 === 0 ? '#f0f5ff' : '#ffffff',
              borderRadius: '6px',
              marginBottom: '6px',
              padding: '8px 12px',
              boxShadow: '0 1px 2px rgba(161, 196, 253, 0.08)',
            }}
          >
            <div style={{
              fontSize: '0.93rem',
              color: '#7f8c9a',
              marginBottom: '4px',
              fontStyle: 'italic'
            }}>
              {entry.date}
            </div>
            <div>{entry.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

