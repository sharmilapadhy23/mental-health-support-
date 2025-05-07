import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const doctors = [
  {
    name: 'Dr. Alice Morgan',
    specialty: 'Clinical Psychologist',
    phone: '+1-555-123-4567',
    email: 'alice.morgan@example.com',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'Delhi, India',
  },
  {
    name: 'Dr. Puneet Mathur',
    specialty: 'Senior Consultant, Psychiatry (14+ yrs)',
    phone: '+91-98765-43210',
    email: 'puneet.mathur@maxhealthcare.com',
    image: 'https://randomuser.me/api/portraits/men/51.jpg',
    location: 'Mumbai, India',
  },
  {
    name: 'Dr. Soumiya Mudgal',
    specialty: 'Senior Consultant, Mental Health',
    phone: '+91-99887-65432',
    email: 'soumiya.mudgal@maxhealthcare.com',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    location: 'Bangalore, India',
  },
  {
    name: 'Dr. Apala Singh',
    specialty: 'Psychiatrist, MBBS, MD, MRC(Psych) UK (7 yrs)',
    phone: '+91-91234-56789',
    email: 'apala.singh@kpcmindclinic.com',
    image: 'https://randomuser.me/api/portraits/women/52.jpg',
    location: 'Kolkata, India',
  },
  {
    name: 'Dr. Pratik Kumar',
    specialty: 'Psychiatrist, MBBS, DNB-Psychiatry (10 yrs)',
    phone: '+91-90000-12345',
    email: 'pratik.kumar@globalmindclinic.com',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    location: 'Hyderabad, India',
  },
  {
    name: 'Dr. Richa Kumari',
    specialty: 'Psychiatrist, MBBS, DPM (10 yrs)',
    phone: '+91-95555-11223',
    email: 'richa.kumari@apolloclinic.com',
    image: 'https://randomuser.me/api/portraits/women/53.jpg',
    location: 'Chennai, India',
  },
  {
    name: 'Dr. Rohit Ranjan',
    specialty: 'Psychiatrist, MBBS, MD (10 yrs)',
    phone: '+91-98888-77665',
    email: 'rohit.ranjan@apollomedical.com',
    image: 'https://randomuser.me/api/portraits/men/53.jpg',
    location: 'Pune, India',
  },
  {
    name: 'Dr. Manamohan N',
    specialty: 'Psychiatrist, MBBS, MD, DNB, MRC psych, SST-RANZCP (10 yrs)',
    phone: '+91-91111-22233',
    email: 'manamohan.n@apolloclinic.com',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    location: 'Gurgaon, India',
  },
  {
    name: 'Dr. Dinesh Reddy Panati',
    specialty: 'Psychiatrist, MBBS, MD (12 yrs)',
    phone: '+91-92222-33344',
    email: 'dinesh.panati@apollo247.com',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
    location: 'Ahmedabad, India',
  },
  {
    name: 'Dr. Vunnam Shashanka',
    specialty: 'Psychiatrist, MBBS, MD (8 yrs)',
    phone: '+91-93333-44455',
    email: 'vunnam.shashanka@apollo247.com',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    location: 'Lucknow, India',
  }
];

export default function Doctors() {
  const [booking, setBooking] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const db = getFirestore();

  const wellnessResources = [
    "24/7 Crisis Helpline: 1800-123-4567",
    "Mindfulness Exercises Available",
    "Free Initial Consultation",
    "Confidential Sessions Guaranteed"
  ];

  const handleInput = (e, index) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [index]: { ...prev[index], [name]: value }
    }));
    setErrorMsg('');
  };

  const handleBook = async (doctor, index, e) => {
    e.preventDefault();
    setErrorMsg('');
    const formData = booking[index] || {};

    if (!formData.userEmail || !formData.date || !formData.time || !formData.type) {
      setErrorMsg('Please fill all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'appointments'), {
        userEmail: formData.userEmail,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorPhone: doctor.phone,
        doctorEmail: doctor.email,
        doctorLocation: doctor.location,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        createdAt: new Date()
      });

      setSuccessMsg(
        `Your appointment with ${doctor.name} has been booked successfully!`
      );
      setBooking(prev => ({ ...prev, [index]: {} }));
    } catch (error) {
      setErrorMsg('We encountered an issue. Please try again or contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Wellness Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Your Mental Wellness Journey Starts Here
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {wellnessResources.map((resource, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <span className="text-blue-600">✓</span> {resource}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center">
            <span className="text-2xl mr-4">🌸</span>
            <div>
              <h3 className="font-bold text-lg">Appointment Confirmed!</h3>
              <p>{successMsg}</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center">
            <span className="text-2xl mr-4">⚠️</span>
            <div>
              <h3 className="font-bold text-lg">Attention Needed</h3>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex items-start mb-4">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-blue-600 text-sm">{doc.specialty}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 ml-1">4.9 (128 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {doc.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Languages:</span> English, Hindi
                </p>
              </div>

              <form onSubmit={e => handleBook(doc, index, e)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value={booking[index]?.userEmail || ''}
                    onChange={e => handleInput(e, index)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={booking[index]?.date || ''}
                      onChange={e => handleInput(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={booking[index]?.time || ''}
                      onChange={e => handleInput(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Type
                  </label>
                  <select
                    name="type"
                    value={booking[index]?.type || ''}
                    onChange={e => handleInput(e, index)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select session type</option>
                    <option value="Online">Video Consultation</option>
                    <option value="Offline">In-person Visit</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
                >
                  <span className="mr-2">📅</span>
                  Schedule Session
                </button>
              </form>
            </div>
          ))}
        </div>

        {/* Wellness Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-4">You're not alone in this journey. We're here to help.</p>
          <div className="flex justify-center space-x-6">
            <a href="/mental-health-resources" className="text-blue-600 hover:underline">
              Wellness Resources
            </a>
            <a href="/emergency-support" className="text-blue-600 hover:underline">
              Emergency Support
            </a>
            <a href="/self-care-tools" className="text-blue-600 hover:underline">
              Self-care Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

