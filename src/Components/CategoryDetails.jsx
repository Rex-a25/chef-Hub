import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryDetails = () => {
  const { catName } = useParams();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMeals = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
      );
      const data = await res.json();
      setMeals(data.meals);
    };

    getMeals();
  }, [catName]);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-[#FF5722]">{catName} Meals</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
            className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-md mb-3" />
            <h2 className="font-semibold">{meal.strMeal}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
