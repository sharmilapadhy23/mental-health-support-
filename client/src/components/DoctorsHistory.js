import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function DoctorHistory({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    async function fetchAppointments() {
      setLoading(true);
      try {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(
          appointmentsRef,
          where('userEmail', '==', user.email),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointments(data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user, db]);

  if (loading) return <p className="text-gray-700">Loading appointment history...</p>;

  if (appointments.length === 0)
    return <p className="text-gray-700">You have no doctor appointment history.</p>;

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Appointment History</h2>

      <ul className="divide-y divide-gray-200">
        {appointments.map(appointment => (
          <li key={appointment.id} className="py-3">
            <p>
              <strong>Doctor:</strong> {appointment.doctorName} ({appointment.doctorSpecialty})
            </p>
            <p>
              <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()} at{' '}
              {appointment.time}
            </p>
            <p>
              <strong>Session Type:</strong> {appointment.type}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
