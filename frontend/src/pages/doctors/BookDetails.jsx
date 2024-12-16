import { useState, useEffect } from 'react';
import { db, collection, addDoc, Timestamp } from '../../firebase/firebase.config'; // Import Firebase functions

const BookDetails = () => {
    const [doctor, setDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve doctor and selected date data from localStorage
        const storedDoctor = localStorage.getItem('doctor');
        const storedDate = localStorage.getItem('selectedDate');

        if (storedDoctor && storedDate) {
            setDoctor(JSON.parse(storedDoctor));  // Parse the doctor object
            setSelectedDate(storedDate);          // Set the selected date
        } else {
            // If no data found in localStorage, redirect to homepage or show error
            window.location.href = '/';
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save the appointment to Firestore
            await addDoc(collection(db, "bookings"), {
                doctorName: doctor.name,
                speciality: doctor.speciality,
                userName: userDetails.name,
                userEmail: userDetails.email,
                userPhone: userDetails.phone,
                appointmentDate: selectedDate,
                fromTime: Timestamp.fromDate(new Date()), // Store current time as timestamp
            });

            // Show confirmation message
            alert('Booking confirmed! You will be notified soon.');

            // Optionally, you can redirect after successful booking
            window.location.href = '/'; // Or navigate to a confirmation page
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!doctor) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-4">Enter Your Details</h2>

            <div className="mb-6">
                <p><strong>Doctor:</strong> {doctor.name}</p>
                <p><strong>Speciality:</strong> {doctor.speciality}</p>
                <p><strong>Appointment Date:</strong> {selectedDate}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button type="submit" disabled={loading} className="btn-primary px-6 py-2">
                    {loading ? 'Submitting...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    );
};

export default BookDetails;
