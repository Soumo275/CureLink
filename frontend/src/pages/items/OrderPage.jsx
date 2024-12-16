import React, { useEffect, useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useAuth } from '../../context/AuthContext';  // Assuming you have an AuthContext to get the current user.

const OrderPage = () => {
    const { currentUser } = useAuth(); // Get the current logged-in user.
    const firestore = useFirestore(); // Get Firestore instance from redux-firebase.
    const [orders, setOrders] = useState([]); // State to store fetched orders.
    const [isLoading, setIsLoading] = useState(true); // State to handle loading state.
    const [isError, setIsError] = useState(false); // State to handle errors.

    useEffect(() => {
        // Check if the current user is authenticated
        if (currentUser?.email) {
            // Fetch orders where the email matches the current user's email
            firestore.collection('orders')
                .where('email', '==', currentUser.email) // Search by the user's email
                .get()
                .then((snapshot) => {
                    // Map through the snapshot and retrieve the order details
                    const fetchedOrders = snapshot.docs.map(doc => ({
                        _id: doc.id,
                        ...doc.data(),
                    }));
                    setOrders(fetchedOrders); // Set the fetched orders to state
                    setIsLoading(false); // Set loading to false after data is fetched
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error); // Log any errors
                    setIsError(true); // Set error state to true
                    setIsLoading(false); // Set loading to false after error
                });
        } else {
            setIsLoading(false);
            setIsError(true); // If no user is logged in, set error state
        }
    }, [currentUser, firestore]);

    // Display loading state
    if (isLoading) return <div>Loading...</div>;
    // Display error message if fetching fails
    if (isError) return <div>Error getting orders data</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            {orders.length === 0 ? (
                <div>No orders found!</div> // If no orders found, display this message
            ) : (
                orders.map(order => (
                    <div key={order._id} className="border-b mb-4 pb-4">
                        <p className="p-1 bg-secondary text-white w-10 rounded mb-1"># {order._id}</p>
                        <h3 className="font-bold">Order ID: {order._id}</h3>
                        <p className="text-gray-600">Name: {order.name}</p>
                        <p className="text-gray-600">Email: {order.email}</p>
                        <p className="text-gray-600">Phone: {order.phone}</p>
                        <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                        <h4 className="font-semibold mt-2">Address:</h4>
                        <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                        <h4 className="font-semibold mt-2">Products:</h4>
                        <ul>
                            {order.productIds.map((productId, index) => (
                                <li key={index}>{productId}</li> // List all product IDs in the order
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderPage;
