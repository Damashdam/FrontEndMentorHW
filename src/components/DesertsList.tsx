import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the Product type
export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity?: number;
}

interface DesertsListProps {
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

function DesertsList({ cart, setCart }: DesertsListProps) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch the product data from the data.json file
        fetch('../db/data.json')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const addToCart = (product: Product) => {
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            updatedCart[productIndex].quantity = (updatedCart[productIndex].quantity ?? 0) + 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
    };

    return (
        <>
            <h1 className="text-4xl font-bold m-6">Desserts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg p-4"
                        initial={{
                            opacity: 0,
                            x: (index % 3 === 0 ? -100 : index % 3 === 1 ? 100 : 0),
                            y: (index % 3 === 2 ? 100 : 0),
                        }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <button
                            className="mt-4 w-60 text-xl bg-gray-100 hover:bg-orange-500 border text-black py-2 rounded-full relative bottom-6 left-4"
                            onClick={() => addToCart(product)}
                        >
                            🛒 Add to Cart
                        </button>
                        <h3 className="text-xl font-bold mt-2">{product.name}</h3>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default DesertsList;
