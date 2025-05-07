import React, { useState, useEffect } from 'react';

export default function MoodTracker({ user }) {
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [age, setAge] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`moodHistory_${user.uid}`);
      if (stored) setMoodHistory(JSON.parse(stored));
    }
  }, [user]);

  function saveMood(newMood) {
    if (!newMood) return;
    const date = new Date().toISOString().split('T')[0];
    const newEntry = { date, mood: newMood };
    const updatedHistory = [newEntry, ...moodHistory.filter(entry => entry.date !== date)];
    setMoodHistory(updatedHistory);
    localStorage.setItem(`moodHistory_${user.uid}`, JSON.stringify(updatedHistory));
  }

  function generateSuggestions(moodValue, ageValue, hobbiesValue) {
    const activities = [];
    const ageNum = parseInt(ageValue, 10);

    // Mood-based suggestions
    const moodSuggestions = {
      '😃': [
        'Share your joy by volunteering or helping someone',
        'Start a creative project like painting or writing',
        'Plan a social gathering with friends'
      ],
      '🙂': [
        'Take a nature walk with mindful breathing exercises',
        'Practice yoga or gentle stretching',
        'Listen to uplifting music or podcasts'
      ],
      '😐': [
        'Organize your living space for mental clarity',
        'Try a new recipe or cooking technique',
        'Engage in light physical activity'
      ],
      '😞': [
        'Write three things you\'re grateful for',
        'Connect with a trusted friend or counselor',
        'Try guided meditation for emotional balance'
      ],
      '😠': [
        'Channel energy into boxing or intense cardio',
        'Practice progressive muscle relaxation',
        'Write a letter to process your feelings'
      ]
    };

    // Age-based suggestions
    const ageGroups = [
      [12, 'Join a sports team or outdoor adventure club'],
      [17, 'Participate in art/music workshops'],
      [30, 'Try rock climbing or hiking groups'],
      [50, 'Join a meditation or book club'],
      [70, 'Participate in gentle yoga or walking groups'],
      [150, 'Engage in light gardening or puzzle activities']
    ];

    // Hobby-based suggestions
    const hobbyActivities = {
      reading: 'Join a book discussion group',
      music: 'Attend a live music performance',
      sports: 'Try a new sport or watch a game',
      art: 'Visit an art museum or take a class',
      gaming: 'Host a game night with friends',
      cooking: 'Take a cooking class together',
      gardening: 'Start a herb garden project',
      yoga: 'Try aerial yoga for a new challenge',
      travel: 'Plan a weekend getaway'
    };

    // Combine suggestions
    if (moodSuggestions[moodValue]) activities.push(...moodSuggestions[moodValue]);
    if (!isNaN(ageNum)) ageGroups.find(([maxAge, suggestion]) => ageNum <= maxAge && activities.push(suggestion));
    hobbiesValue.forEach(hobby => {
      if (hobbyActivities[hobby]) activities.push(hobbyActivities[hobby]);
    });

    setSuggestions(activities.slice(0, 5));
  }

  function handleGenerate() {
    if (mood && age && hobbies.length > 0) {
      saveMood(mood);
      generateSuggestions(mood, age, hobbies);
    } else {
      alert('Please select mood, enter age, and select at least one hobby before generating suggestions.');
    }
  }

  function handleMoodSelect(moodValue) {
    setMood(moodValue);
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
        minHeight: '100vh',
        fontFamily: "'Lato', Arial, sans-serif"
      }}
    >
      <div
        className="rounded-3xl shadow-2xl p-8 w-full max-w-2xl flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1.5px solid #a1c4fd',
        }}
      >
        <h2
          className="text-3xl mb-4 text-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            color: '#2c3e50',
            letterSpacing: '0.03em',
          }}
        >
          Mood Tracker
        </h2>
        <hr className="mb-6 border-blue-200" />

        <p className="mb-4 text-lg font-medium text-gray-700 text-center">How are you feeling today?</p>
        
        {/* Mood Selector */}
        <div className="flex justify-center gap-8 mb-8 text-4xl">
          {['😃', '🙂', '😐', '😞', '😠'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleMoodSelect(emoji)}
              className={`transition transform duration-200 rounded-full shadow-md px-4 py-2
                ${mood === emoji ? 'scale-150 bg-blue-100 ring-2 ring-blue-400' : 'hover:scale-125 hover:bg-blue-50'}
              `}
              type="button"
              aria-label={`Select mood ${emoji}`}
              style={{ outline: 'none' }}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Personalization Fields */}
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Age
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your age"
                min="10"
                max="100"
                style={{ fontFamily: "'Lato', Arial, sans-serif" }}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Select Hobbies
              <select
                multiple
                value={hobbies}
                onChange={(e) => {
                  const options = e.target.options;
                  const selected = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      selected.push(options[i].value);
                    }
                  }
                  setHobbies(selected);
                }}
                className="mt-1 w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                style={{ fontFamily: "'Lato', Arial, sans-serif" }}
              >
                <option value="reading">Reading</option>
                <option value="music">Music</option>
                <option value="sports">Sports</option>
                <option value="art">Art</option>
                <option value="cooking">Cooking</option>
                <option value="gardening">Gardening</option>
                <option value="yoga">Yoga</option>
                <option value="travel">Travel</option>
                <option value="gaming">Gaming</option>
              </select>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-400 text-white p-3 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all font-semibold text-lg mb-4 shadow"
          type="button"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '0.02em'
          }}
        >
          <span role="img" aria-label="spark">✨</span> Generate Suggestions
        </button>

        {/* Suggestions */}
        <div className="flex-grow overflow-auto">
          {suggestions.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-5 rounded-2xl border border-blue-100 shadow-inner max-h-56 overflow-auto">
              <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                <span role="img" aria-label="bulb">💡</span> Recommended Activities
              </h3>
              <ul className="list-disc list-inside space-y-2 text-blue-700 text-base">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
