import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DoctorCard from '../doctors/DoctorCard'; // Assuming you have DoctorCard component

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import doctor data (replace with your actual data source)
import doctorsData from '../../assets/doctors.json';

const AppointmentBooking = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [doctors, setDoctors] = useState([]);

    // Fetch doctor data from local JSON file or API
    useEffect(() => {
        // In real use, this would be an API call
        setDoctors(doctorsData);
    }, []);

    // Function to get available doctors for the selected date
    const getAvailableDoctors = (date) => {
        const dayOfWeek = format(new Date(date), 'EEEE'); // Get day name like "Monday"
        return doctors.filter(doctor =>
            doctor.availability.some(slot => slot.day === dayOfWeek) // Filter based on availability
        );
    };

    const availableDoctors = selectedDate ? getAvailableDoctors(selectedDate) : [];

    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">Book an Appointment</h2>

            {/* Date Picker */}
            <div className="mb-8">
                <label className="block text-lg font-medium mb-2">Select a Date</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full sm:w-64"
                />
            </div>

            {/* Available Doctors Slider */}
            {selectedDate && availableDoctors.length > 0 ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 40 },
                        1024: { slidesPerView: 2, spaceBetween: 50 },
                        1180: { slidesPerView: 3, spaceBetween: 50 },
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {availableDoctors.map((doctor, index) => (
                        <SwiperSlide key={index}>
                            <DoctorCard doctor={doctor} selectedDate={selectedDate} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-gray-500">
                    {selectedDate ? "No doctors available on this date." : "Please select a date to see available doctors."}
                </p>
            )}
        </div>
    );
};

export default AppointmentBooking;
