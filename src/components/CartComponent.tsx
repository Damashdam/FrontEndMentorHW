import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from './DesertsList'; // Assuming Product type is exported from DesertsList

interface CartComponentProps {
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

function CartComponent({ cart, setCart }: CartComponentProps) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const removeItem = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId: number) => {
        setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity! + 1 } : item));
    };

    const decreaseQuantity = (productId: number) => {
        setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity! - 1 } : item)
            .filter(item => item.quantity! > 0));
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity!, 0);

    const handleConfirmOrder = () => {
        setSuccessMessage("🎉 Order Confirmed! Thank you for your purchase. 🎉");
        setCart([]); // Clear the cart
        setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
    };

    const getItemAnimation = (index: number) => {
        const fromLeft = { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 } };
        const fromRight = { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 30 } };
        return index % 2 === 0 ? fromLeft : fromRight;
    };

    return (
        <div className="relative bg-gray-100 shadow-lg rounded-lg p-6 max-w-md w-full ml-auto">
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Confirmation</h2>
                            <ul className="divide-y divide-gray-300 mb-6">
                                {cart.map(item => (
                                    <li key={item.id} className="py-2 flex justify-between text-gray-700">
                                        <span>{item.name}</span>
                                        <span>${item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <label className="flex items-center justify-center mb-6">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-gray-700">Confirm your order</span>
                            </label>
                            <button
                                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                onClick={() => {
                                    handleConfirmOrder();
                                    setShowConfirmation(false);
                                }}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white text-green-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                            <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>
                            <p className="text-lg">{successMessage}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">🛒 Your Cart ({cart.length})</h2>
            <motion.ul
                className="divide-y divide-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {cart.map((item, index) => {
                    const { initial, animate, exit } = getItemAnimation(index);
                    return (
                        <motion.li
                            key={item.id}
                            className="py-4 px-4 flex items-center justify-between bg-white shadow-sm rounded-md mb-2"
                            initial={initial}
                            animate={animate}
                            exit={exit}
                            transition={{ duration: 0.3 }}
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">-</button>
                                <span className="mx-3 text-gray-800">{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">+</button>
                                <button onClick={() => removeItem(item.id)} className="ml-4 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400">✕</button>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>
            <div className="mt-6 border-t border-gray-300 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-800">💵 Order Total</span>
                    <span className="text-xl font-semibold text-gray-800">${totalAmount.toFixed(2)}</span>
                </div>
                <button
                    className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onClick={() => setShowConfirmation(true)}
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
}

export default CartComponent;
