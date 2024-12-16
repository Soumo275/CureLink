// import React from 'react';
import PropTypes from 'prop-types';
import { FiCalendar } from 'react-icons/fi';

const DoctorCard = ({ doctor, selectedDate }) => {
    // Store the doctor and selected date in localStorage
    const handleBookAppointment = () => {
        // Store doctor and selected date data in localStorage
        localStorage.setItem('doctor', JSON.stringify(doctor));
        localStorage.setItem('selectedDate', selectedDate);

        // Redirect to the booking details page
        window.location.href = '/book-details';  // New page where user will input details
    };

    // Get the day name from the selected date
    const dayOfWeek = selectedDate ? new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' }) : '';

    // Filter availability for the selected day
    const getAvailabilityForDay = (availability, day) => {
        const slotsForDay = availability.filter(slot => slot.day === day);
        return slotsForDay.length > 0 ? slotsForDay.map((slot) => `${slot.time}`).join(', ') : "No availability on this day";
    };

    const availabilityForSelectedDay = getAvailabilityForDay(doctor.availability, dayOfWeek);

    return (
        <div className="rounded-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                {/* Doctor Image */}
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <img
                        src={doctor.image || '/default-doctor.jpg'} // Fallback image if no image is provided
                        alt={doctor.name || 'Doctor Image'}
                        className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                    />
                </div>

                {/* Doctor Info */}
                <div>
                    <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                        {doctor.name || 'Unknown Doctor'}
                    </h3>

                    {/* speciality with icon */}
                    <div className="text-gray-600 font-medium mb-5">
                        <span className="font-semibold text-blue-600">{doctor.speciality || 'speciality not available'}</span>
                    </div>

                    {/* Show availability for the selected day */}
                    <p className="text-gray-700 mb-5">
                        {availabilityForSelectedDay ? `Available on ${dayOfWeek}: ${availabilityForSelectedDay}` : "No availability for the selected day"}
                    </p>

                    {/* Book Appointment Button */}
                    <button
                        onClick={handleBookAppointment}  // Trigger redirection
                        className="btn-primary px-6 space-x-1 flex items-center gap-1"
                    >
                        <FiCalendar />
                        <span>Book Appointment</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

DoctorCard.propTypes = {
    doctor: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        speciality: PropTypes.string,
        image: PropTypes.string,
        availability: PropTypes.arrayOf(
            PropTypes.shape({
                day: PropTypes.string.isRequired,
                time: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
    selectedDate: PropTypes.string, // The selected date passed from parent component
};

export default DoctorCard;
