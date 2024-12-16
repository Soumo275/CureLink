import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import itemsData from '../../../assets/items.json'; // Import items data
import doctorsData from '../../../assets/doctors.json'; // Import doctors data

const ManageData = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Load data from items.json and doctors.json
        setItems(itemsData);
        setDoctors(doctorsData);
    }, []);

    // Handle deleting an item
    const handleDeleteItem = (id) => {
        const updatedItems = items.filter(item => item._id !== id);
        setItems(updatedItems);
        alert('Item deleted successfully!');
    };

    // Handle deleting a doctor
    const handleDeleteDoctor = (id) => {
        const updatedDoctors = doctors.filter(doctor => doctor._id !== id);
        setDoctors(updatedDoctors);
        alert('Doctor deleted successfully!');
    };

    return (
        <section className="py-1 bg-blueGray-50">
            {/* Items Section */}
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 className="font-semibold text-base text-blueGray-700">All Items</h3>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">#</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Item Title</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Category</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Price</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items && items.map((item, index) => (
                                    <tr key={item._id}>
                                        <th className="border-t-0 px-6 py-4 text-blueGray-700">{index + 1}</th>
                                        <td className="border-t-0 px-6 py-4">{item.title}</td>
                                        <td className="border-t-0 px-6 py-4">{item.category}</td>
                                        <td className="border-t-0 px-6 py-4">Rs.{item.newPrice}</td>
                                        <td className="border-t-0 px-6 py-4">
                                            <Link to={`/dashboard/edit-item/${item._id}`} className="text-indigo-600 hover:underline">Edit</Link>
                                            <button 
                                                onClick={() => handleDeleteItem(item._id)}
                                                className="ml-2 text-white bg-red-500 px-4 rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Doctors Section */}
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <h3 className="font-semibold text-base text-blueGray-700">All Doctors</h3>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">#</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Doctor Name</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Specialty</th>
                                    {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Experience</th> */}
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors && doctors.map((doctor, index) => (
                                    <tr key={doctor._id}>
                                        <th className="border-t-0 px-6 py-4 text-blueGray-700">{index + 1}</th>
                                        <td className="border-t-0 px-6 py-4">{doctor.name}</td>
                                        <td className="border-t-0 px-6 py-4">{doctor.speciality}</td>
                                        {/* <td className="border-t-0 px-6 py-4">{doctor.availability} availability</td> */}
                                        <td className="border-t-0 px-6 py-4">
                                            <Link to={`/dashboard/edit-doctor/${doctor._id}`} className="text-indigo-600 hover:underline">Edit</Link>
                                            <button 
                                                onClick={() => handleDeleteDoctor(doctor._id)}
                                                className="ml-2 text-white bg-red-500 px-4 rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageData;
