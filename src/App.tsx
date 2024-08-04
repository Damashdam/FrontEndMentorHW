import { motion } from 'framer-motion';
import { useState } from 'react';
import DesertsList, { Product } from './components/DesertsList';
import CartComponent from './components/CartComponent';

function App() {
  // State to manage the cart items
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <motion.div
      className="App bg-gray-50 min-h-screen flex flex-col items-center py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="w-full max-w-5xl px-6 mb-12">
        {/* Header content */}
      </header>
      <main className="flex flex-col lg:flex-row w-full px-6 gap-12">
        <motion.div
          className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DesertsList cart={cart} setCart={setCart} />
        </motion.div>
        <motion.div
          className="w-full lg:w-96 bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CartComponent cart={cart} setCart={setCart} />
        </motion.div>
      </main>
    </motion.div>
  );
}

export default App;
