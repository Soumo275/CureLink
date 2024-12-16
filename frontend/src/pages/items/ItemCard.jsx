import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart, updateQuantity } from '../../redux/features/cart/cartSlice';
import { getImgUrl } from '../../utils/getImgUrl';

const ItemCard = ({ item }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    
    // Check if item is already in the cart
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id);

    const itemLink = `/items/${item._id}`;

    const handleAddToCart = () => {
        dispatch(addToCart(item));
    };

    const handleIncreaseQuantity = () => {
        dispatch(updateQuantity({ _id: item._id, quantity: existingItem.quantity + 1 }));
    };

    const handleDecreaseQuantity = () => {
        if (existingItem.quantity > 1) {
            dispatch(updateQuantity({ _id: item._id, quantity: existingItem.quantity - 1 }));
        }
    };

    const truncateDescription = (description, length) => {
        return description.length > length ? `${description.slice(0, length)}...` : description;
    };

    return (
        <div className="rounded-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <Link to={itemLink}>
                        <img
                            src={getImgUrl(item.coverImage)}
                            alt={item.title || "Product Image"}
                            className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div>
                    <Link to={itemLink}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {item.title || 'Untitled Product'}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">
                        {truncateDescription(item.description || 'No description available.', 80)}
                    </p>
                    <p className="font-medium mb-5">
                        Rs.{item.newPrice?.toFixed(2) || '0.00'}
                        {item.oldPrice && (
                            <span className="line-through font-normal ml-2">
                                Rs.{item.oldPrice.toFixed(2)}
                            </span>
                        )}
                    </p>

                    <div className="flex items-center space-x-4 mb-4">
                        {/* Quantity Adjustment */}
                        {existingItem ? (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleDecreaseQuantity}
                                    className="px-3 py-1 bg-gray-200 rounded-md"
                                >
                                    -
                                </button>
                                <span>{existingItem.quantity}</span>
                                <button
                                    onClick={handleIncreaseQuantity}
                                    className="px-3 py-1 bg-gray-200 rounded-md"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={handleAddToCart}
                                className="btn-primary px-6 space-x-1 flex items-center gap-1"
                            >
                                <FiShoppingCart />
                                <span>Add to Cart</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        coverImage: PropTypes.string,
        newPrice: PropTypes.number,
        oldPrice: PropTypes.number,
    }).isRequired,
};

export default ItemCard;
