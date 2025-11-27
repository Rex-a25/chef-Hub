import { useEffect, useState } from "react";

const Recipes = () => {
  const [meal, setMeal] = useState(null);

  const getMealRandomly = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    setMeal(data.meals[0]);
  };

  useEffect(() => {
    getMealRandomly(); // fetch on mount
  }, []);

  if (!meal) {
    return (
      <div className="text-[#FF5722] font-bold text-lg animate-pulse mt-10 text-center">
        Loading Recipe...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-2 text-[#FF5722] animate-fadeIn">
        Recipe of the Hour
      </h1>

      <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 animate-slideUp">
        {meal.strMeal}
      </h2>

      {/* Image */}
      <div className="flex justify-center mb-6">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-xl shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn"
        />
      </div>

      {/* Category + Origin */}
      <div className="text-center text-gray-700 mb-6 space-y-2 animate-slideUp">
        <p><b>Category:</b> {meal.strCategory}</p>
        <p><b>Origin:</b> {meal.strArea}</p>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl shadow-md p-5 md:p-7 leading-relaxed text-gray-800 animate-fadeIn">
        <h3 className="text-2xl font-bold mb-3 text-[#FF5722]">Instructions</h3>
        <p className="whitespace-pre-line">{meal.strInstructions}</p>
      </div>

      {/* New Meal Button */}
      <button
        onClick={getMealRandomly}
        className="mt-6 bg-[#FF5722] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#e64a19] transition duration-300 transform hover:-translate-y-1 animate-fadeIn"
      >
        Get New Meal
      </button>
    </div>
  );
};

export default Recipes;
