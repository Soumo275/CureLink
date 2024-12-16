import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebase.config';
import { collection, addDoc } from 'firebase/firestore';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
            createdAt: new Date(),
        };

        try {
            await addDoc(collection(db, 'orders'), newOrder);
            Swal.fire({
                title: "Order Confirmed",
                text: "Your order has been placed successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
            navigate("/");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order");
        }
    };

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                    <p className="text-gray-500 mb-2">Total Price: Rs.{totalPrice}</p>
                    <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <p className="font-medium text-lg text-gray-600">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="text" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    disabled defaultValue={currentUser?.email} />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    {...register("phone", { required: true })}
                                    type="text" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="address">Address / Street</label>
                                <input
                                    {...register("address", { required: true })}
                                    type="text" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div>
                                <label htmlFor="city">City</label>
                                <input
                                    {...register("city", { required: true })}
                                    type="text" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div>
                                <label htmlFor="state">State / Province</label>
                                <input
                                    {...register("state", { required: true })}
                                    type="text" id="state" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div>
                                <label htmlFor="country">Country</label>
                                <input
                                    {...register("country", { required: true })}
                                    type="text" id="country" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div>
                                <label htmlFor="zipcode">Zipcode</label>
                                <input
                                    {...register("zipcode", { required: true })}
                                    type="text" id="zipcode" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                            </div>

                            <div className="md:col-span-2 mt-3">
                                <div className="inline-flex items-center">
                                    <input
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                        type="checkbox" id="billing_same" className="form-checkbox" />
                                    <label htmlFor="billing_same" className="ml-2">I agree to the <Link className='underline text-blue-600'>Terms & Conditions</Link> and <Link className='underline text-blue-600'>Shopping Policy.</Link></label>
                                </div>
                            </div>

                            <div className="md:col-span-2 text-right">
                                <button
                                    disabled={!isChecked}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place an Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
