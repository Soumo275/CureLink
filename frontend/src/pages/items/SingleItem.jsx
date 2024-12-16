import { useParams } from 'react-router-dom';
import itemsData from '../../assets/items.json';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../../redux/features/cart/cartSlice';
import { useState } from 'react';
import { getImgUrl } from '../../utils/getImgUrl';

const SingleItem = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.cartItems);
    const itemInCart = cartItems.find(item => item._id === id);
    const initialQuantity = itemInCart ? itemInCart.quantity : 1;
    const [quantity, setQuantity] = useState(initialQuantity); // Manage quantity state locally

    console.log("ID from URL:", id); 
    console.log("Items data:", itemsData);  

    const item = itemsData.find((item) => String(item._id) === String(id));  

    if (!item) {
        console.log("Item not found with ID:", id);  
        return <div>Item not found</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ ...item, quantity: 1 }));
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleRemoveFromCart = () => {
        if (quantity > 1) {
            dispatch(updateQuantity({ _id: item._id, quantity: quantity - 1 }));
            setQuantity(prevQuantity => prevQuantity - 1);
        } else {
            dispatch(removeFromCart(item));
            setQuantity(0); // Set to zero if the item is removed entirely from cart
        }
    };

    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{item.title}</h1>
            {/* Display item details */}
            <div>
                <img
                    src={getImgUrl(item.coverImage)}
                    alt={item.title || "Product Image"}
                    className="mb-8"
                />
                <p className="text-gray-700 mb-4"><strong>Category:</strong> {item.category}</p>
                <p className="text-gray-700"><strong>Description:</strong> {item.description}</p>
                <p className="font-medium mb-5">
                    Rs.{item.newPrice?.toFixed(2)}
                    {item.oldPrice && (
                        <span className="line-through font-normal ml-2">Rs.{item.oldPrice.toFixed(2)}</span>
                    )}
                </p>

                {/* Quantity Adjustment */}
                <div className="flex items-center space-x-2 mb-4">
                    <button
                        onClick={handleRemoveFromCart}
                        className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={handleAddToCart}
                        className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                        +
                    </button>
                </div>

                <button onClick={handleAddToCart} className="btn-primary px-6 space-x-1 flex items-center gap-1">
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default SingleItem;
