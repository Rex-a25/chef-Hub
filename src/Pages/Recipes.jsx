import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nigerianRecipes } from "../data/nigerianRecipes";
import { africanRecipes } from "../data/africanRecipes";

const Recipes = () => {
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate();

  // Combine both datasets for the full library view
  const allLocalRecipes = [...nigerianRecipes, ...africanRecipes];

  const getMealRandomly = async () => {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();
      setMeal(data.meals[0]);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  useEffect(() => {
    getMealRandomly();
  }, []);

  if (!meal) {
    return (
      <div className="text-[#FF5722] font-bold text-lg animate-pulse mt-10 text-center">
        Loading Chef's Selection...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 pb-20">
      
      {/* SECTION 1: FEATURED RECIPE OF THE HOUR */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#FF5722]">
          Recipe of the <span className="text-[#333]">Hour</span>
        </h1>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row items-center">
          {/* Featured Image */}
          <div className="w-full md:w-1/2 h-64 md:h-[400px]">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Featured Content */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <span className="text-[#FF5722] font-bold text-sm tracking-widest uppercase mb-2">
              Featured Selection
            </span>
            <h2 className="text-3xl font-extrabold text-[#333] mb-4">
              {meal.strMeal}
            </h2>
            <div className="flex gap-4 mb-6 text-sm text-gray-500">
              <p><b>Category:</b> {meal.strCategory}</p>
              <p><b>Origin:</b> {meal.strArea}</p>
            </div>
            
            <div className="flex gap-4">
                <button
                    onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                    className="bg-[#333] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF5722] transition-all"
                >
                    View Recipe
                </button>
                <button
                    onClick={getMealRandomly}
                    className="border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                    Try Another
                </button>
            </div>
          </div>
        </div>
      </section>

      <hr className="mb-16 border-gray-200" />

      {/* SECTION 2: THE FULL AFRICAN LIBRARY */}
      <section>
        <div className="flex items-center justify-between mb-10">
            <div>
                <h2 className="text-3xl font-bold text-[#333]">
                    The <span className="text-[#FF5722]">Full Library</span>
                </h2>
                <p className="text-gray-500 mt-2">Explore our growing collection of authentic African dishes.</p>
            </div>
            <div className="hidden md:block bg-gray-100 px-4 py-2 rounded-full text-sm font-bold text-gray-600">
                {allLocalRecipes.length} Recipes Found
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allLocalRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#FF5722] shadow-sm">
                  {recipe.strArea.toUpperCase()}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {recipe.strCategory}
                </p>
                <h3 className="text-lg font-bold text-[#333] group-hover:text-[#FF5722] transition-colors line-clamp-1">
                  {recipe.strMeal}
                </h3>
                <div className="mt-4 flex items-center text-[#FF5722] text-sm font-bold">
                    Learn to cook →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Recipes;