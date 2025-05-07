// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import MoodTracker from '../components/MoodTracker';
import MoodHistory from '../components/MoodHistory';
import Journal from '../components/Journal';
import Articles from '../components/Article';
import Doctors from '../components/Doctors';
import DoctorHistory from '../components/DoctorsHistory';
import Sidebar from '../components/Sidebar';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ user }) {
  const [moodHistory, setMoodHistory] = useState([]);
  const [activeSection, setActiveSection] = useState('moodTracker');
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`moodHistory_${user.uid}`);
      setMoodHistory(stored ? JSON.parse(stored) : []);
    }
  }, [user]);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        navigate('./HomePage.js'); // Redirect to homepage after logout
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-700 p-4 flex space-x-6">
      {/* Sidebar navigation */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main content area */}
      <main className="flex-1 bg-white rounded-lg p-6 shadow-lg max-w-5xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Mental Health Support Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 transition"
            type="button"
          >
            Logout
          </button>
        </header>

        {/* Conditionally render sections based on active tab */}
        {activeSection === 'moodTracker' && (
          <>
            <MoodTracker user={user} />
            <div className="mt-8">
              <MoodHistory moodHistory={moodHistory} />
            </div>
          </>
        )}
        {activeSection === 'journal' && <Journal user={user} />}
        {activeSection === 'articles' && <Articles />}
        {activeSection === 'doctors' && <Doctors />}
        {activeSection === 'doctorHistory' && <DoctorHistory user={user} />}
      </main>
    </div>
  );
}
