import React, { useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';

const auth = getAuth();

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 text-center">
          {/* Success Illustration */}
          <div className="mx-auto w-24 h-24 mb-2">
            <svg viewBox="0 0 100 100" className="text-green-400">
              <circle cx="50" cy="50" r="48" fill="#c6f6d5" />
              <path
                d="M30 52l14 14 26-26"
                fill="none"
                stroke="#38a169"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Welcome, {user.email}!</h2>
          <p className="text-gray-600">You are already logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 relative overflow-hidden">
        {/* Header with Logo */}
        <div className="text-center space-y-2 relative z-10">
          <div className="mx-auto w-20 h-20">
            {/* Abstract brain/heart SVG logo */}
            <svg viewBox="0 0 100 100" className="text-blue-500">
              <path fill="currentColor" d="M50 16.7c-18.4 0-33.3 14.9-33.3 33.3 0 10.7 5.1 20.6 13.7 26.9l19.6-46.6 19.6 46.6c8.6-6.3 13.7-16.2 13.7-26.9 0-18.4-14.9-33.3-33.3-33.3zm0 66.6c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 font-serif">
            Mindful Journey
          </h1>
          <p className="text-gray-600 text-sm">
            Your Personal Mental Health Companion
          </p>
        </div>

        {/* Forgot Password Section */}
        {showForgotPassword ? (
          <div className="space-y-4 relative z-10">
            <h2 className="text-xl font-semibold text-center text-gray-800">
              Reset Password
            </h2>
            {resetSent ? (
              <div className="bg-green-100 p-4 rounded-lg text-green-700 text-sm">
                Password reset email sent! Check your inbox.
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-sm text-center">
                  Enter your email to receive a password reset link
                </p>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all font-medium"
                  type="button"
                >
                  Send Reset Email
                </button>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetSent(false);
                    setError('');
                  }}
                  className="w-full text-blue-600 font-medium hover:underline"
                  type="button"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Purpose Demonstration with Illustration */}
            <div className="bg-blue-50 p-4 rounded-lg relative z-10 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 opacity-15">
                <svg viewBox="0 0 100 100" className="text-blue-300">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
                </svg>
              </div>
              <div className="relative z-10 space-y-3">
                <h2 className="text-lg font-semibold text-blue-800">
                  Start Your Wellness Journey
                </h2>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                  <li>Track daily mood patterns</li>
                  <li>Secure private journaling</li>
                  <li>Personalized mental health insights</li>
                  <li>Expert-curated resources</li>
                </ul>
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 opacity-10">
                <svg viewBox="0 0 100 100" className="text-purple-400">
                  <path fill="currentColor" d="M50 10c22.1 0 40 17.9 40 40s-17.9 40-40 40S10 72.1 10 50 27.9 10 50 10zm0 65c13.8 0 25-11.2 25-25S63.8 25 50 25 25 36.2 25 50s11.2 25 25 25z"/>
                </svg>
              </div>
            </div>

            {/* Auth Form */}
            <div className="space-y-4 relative z-10">
              <div className="relative">
                <div className="absolute -top-8 right-0 w-16 opacity-20">
                  <svg viewBox="0 0 83 68" className="text-indigo-300">
                    <path fill="currentColor" d="M41.5 0L81.9 67.5H1.1L41.5 0z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-center text-gray-800 relative">
                  {isLogin ? 'Welcome Back' : 'Get Started'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all font-medium"
                >
                  {isLogin ? 'Continue Your Journey' : 'Start Your Journey'}
                </button>
              </form>
              {isLogin && (
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-600 text-sm font-medium hover:underline w-full text-center"
                  type="button"
                >
                  Forgot Password?
                </button>
              )}
            </div>
          </>
        )}

        {/* Bottom Decorative Wave */}
        <div className="pt-4 border-t border-gray-100 relative z-10">
          <div className="w-full opacity-60">
            <svg viewBox="0 0 1440 120" className="text-blue-400">
              <path fill="currentColor" d="M0 64l60-10.7C120 43 240 21 360 37.3 480 53 600 107 720 112s240-37 360-48 240 37 360 42 240-37 300-48l60-10.7V0H0z"/>
            </svg>
          </div>
        </div>

        {/* Toggle login/signup */}
        {!showForgotPassword && (
          <p className="text-center text-gray-600 text-sm relative z-10">
            {isLogin ? "New to Mindful Journey?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-medium hover:underline"
              type="button"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
