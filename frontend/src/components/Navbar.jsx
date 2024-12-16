import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

import avatarImg from "../assets/avatar.png";
import itemsData from "../assets/items.json"; // Import your items data for search

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filteredItems, setFilteredItems] = useState([]); // State for search suggestions
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const navigation = [
        { name: 'Profile', href: '/profile' },
        { name: 'Orders', href: '/orders' },
        { name: 'Settings', href: '/settings' }
    ];

    const handleLogOut = () => {
        logout();
    };

    // Update filtered items based on the search query
    useEffect(() => {
        if (searchQuery) {
            const results = itemsData.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredItems(results);
        } else {
            setFilteredItems([]);
        }
    }, [searchQuery]);

    // Handle item click from search suggestions
    const handleItemClick = (itemId) => {
        navigate(`/items/${itemId}`);
        setSearchQuery("");
        setFilteredItems([]);
    };

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* Left side: Search Input */}
                <div className="flex items-center gap-4">
                    {/* Search Input */}
                    <div className="relative sm:w-72 w-40 space-x-2">
                        <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search medicines..."
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                        {/* Dropdown for search suggestions */}
                        {filteredItems.length > 0 && (
                            <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-40 overflow-y-auto z-10">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item._id}
                                        onClick={() => handleItemClick(item._id)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Centered Logo */}
                <Link to="/" className="text-2xl font-bold">
                    <HiMiniBars3CenterLeft className="inline-block mr-2 size-6" />
                    CureLink
                </Link>

                {/* Right side: User, Wishlist, Cart */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img
                                        src={avatarImg}
                                        alt=""
                                        className={`size-7 rounded-full ${currentUser ? "ring-2 ring-blue-500" : ""}`}
                                    />
                                </button>
                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login" className="px-4 py-2 border rounded-md text-sm bg-blue-500 text-white">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Wishlist Icon */}
                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    {/* Cart */}
                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className="" />
                        {cartItems.length > 0 ? (
                            <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>
                        ) : (
                            <span className="text-sm font-semibold sm:ml-1">0</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
