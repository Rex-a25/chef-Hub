import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MiddleIntro = () => {

     const navigate = useNavigate()

    const handleNavigate = () => {
      navigate('/recipe');
    }

  return (
    <section className="max-w-4xl mx-auto py-20 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-900"
      >
        Your Next Favourite Recipe Starts Here
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 text-gray-600 leading-relaxed max-w-2xl mx-auto"
      >
        Explore thousands of hand-picked meals, discover new categories, and enjoy a
        clean cooking experience built for speed, simplicity, and creativity.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-10 flex justify-center gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="bg-[#FF5722] text-white px-6 py-3 rounded-lg shadow-md transition"
          onClick={()=>handleNavigate()}
        >
          Browse Recipes
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition"
        >
          View Categories
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        <div className="p-6 border rounded-xl hover:shadow-lg transition">
          <h3 className="text-lg font-semibold">Fast Loading</h3>
          <p className="text-gray-500 text-sm mt-2">
            Optimized UI designed to get you cooking without waiting.
          </p>
        </div>

        <div className="p-6 border rounded-xl hover:shadow-lg transition">
          <h3 className="text-lg font-semibold">Smart Search</h3>
          <p className="text-gray-500 text-sm mt-2">
            Search by category, ingredient, or recipe name with precision.
          </p>
        </div>

        <div className="p-6 border rounded-xl hover:shadow-lg transition">
          <h3 className="text-lg font-semibold">Clean UI</h3>
          <p className="text-gray-500 text-sm mt-2">
            A modern interface designed for clarity, focus, and ease.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default MiddleIntro;

