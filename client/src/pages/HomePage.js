import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Color palette
  const colors = {
    primary: '#1a73e8',       // Google Blue
    secondary: '#009688',     // Teal
    accent: '#81d4fa',        // Light Sky Blue
    background: '#f0f4f8',    // Soft Blue-Gray
    textDark: '#2d3748',      // Dark Gray
    textLight: '#f8f9fa'      // Off White
  };

  // Loader progress simulation
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.7, type: "spring" }
    })
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative">
      {/* Fixed Get Started Button */}
      {!loading && (
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: `0 4px 20px ${colors.accent}80` }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={() => navigate('/auth')}
          className="fixed top-8 right-8 px-8 py-3 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '0.04em',
            border: `2px solid ${colors.primary}`
          }}
        >
          Get Started
        </motion.button>
      )}

      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="game-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            style={{ 
              backgroundColor: colors.background,
              fontFamily: "'Press Start 2P', cursive" 
            }}
          >
            <div className="p-8 border-4 rounded-lg bg-white shadow-2xl" style={{ borderColor: colors.primary }}>
              <div className="text-xl mb-6 text-center" style={{ color: colors.primary }}>
                LOADING MENTAL WELLNESS...
              </div>
              <div className="w-64 h-8 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>
              <div className="text-sm text-center mb-4" style={{ color: colors.textDark }}>
                {progress < 100 ? "Initializing support systems..." : "Ready for journey!"}
              </div>
              {progress >= 100 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full"
                  onClick={() => setLoading(false)}
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  BEGIN
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <div className="w-full" style={{ backgroundColor: colors.background }}>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-extrabold mb-6 text-center pt-20"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: colors.primary,
              letterSpacing: '0.05em',
            }}
          >
            Welcome to <span style={{ color: colors.secondary }}>MindCare</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-3xl text-center mb-12 text-lg mx-auto px-4"
            style={{
              color: colors.textDark,
              fontWeight: 500,
              lineHeight: '1.6'
            }}
          >
            Your holistic platform for emotional well-being, offering personalized tools for mental health management and professional support.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto px-4 mb-16">
            {[
              {
                img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
                title: "Mood Tracking",
                desc: "Visualize emotional patterns with intuitive daily logging"
              },
              {
                img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80",
                title: "Guided Journal",
                desc: "Secure space for self-reflection with AI-powered prompts"
              },
              {
                img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
                title: "Expert Support",
                desc: "Connect with licensed mental health professionals"
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: `0 8px 32px ${colors.accent}40`
                }}
                className="bg-white rounded-xl p-6 shadow-lg transition-transform border border-gray-100"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                  loading="lazy"
                />
                <h2 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                  {card.title}
                </h2>
                <p className="text-gray-600" style={{ color: colors.textDark }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
