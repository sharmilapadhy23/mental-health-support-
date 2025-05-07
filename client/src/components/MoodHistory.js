import React, { useState } from 'react';

export default function MoodHistory({ moodHistory }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleClick = (date) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  return (
    <section className="mt-8 w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood History</h2>
      {moodHistory.length === 0 ? (
        <p className="text-gray-600 text-center">No mood data yet.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-auto">
          {moodHistory.map(({ date, mood }) => (
            <li key={date}>
              <button
                className={`w-full flex justify-between items-center border-b border-gray-200 py-2 px-3 rounded transition 
                  ${selectedDate === date ? 'bg-blue-50' : 'hover:bg-blue-100'}`}
                onClick={() => handleClick(date)}
                type="button"
              >
                <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
                <span className="text-2xl">{mood}</span>
              </button>
              {selectedDate === date && (
                <div className="mt-2 bg-blue-50 rounded p-3 text-blue-800 text-center shadow-inner">
                  <p>
                    <span className="font-semibold">Date:</span> {new Date(date).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Mood:</span> <span className="text-2xl">{mood}</span>
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
