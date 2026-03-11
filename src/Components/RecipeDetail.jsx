import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Import BOTH local datasets
import { nigerianRecipes } from '../data/nigerianRecipes'; 
import { africanRecipes } from '../data/africanRecipes';

/**
 * HELPER FUNCTION: mapIngredients
 * Extracts ingredients and measures from the API/Local object.
 */
const mapIngredients = (meal) => {
    const ingredientsArray = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "" && ingredient.trim() !== "null") {
            ingredientsArray.push({
                measure: measure ? measure.trim() : "",
                ingredient: ingredient.trim()
            });
        }
    }
    return ingredientsArray;
};

const RecipeDetail = () => {
    const { mealId } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ingredientsList, setIngredientsList] = useState([]);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            if (!mealId) return;
            setLoading(true);

            // --- STRATEGY: CHECK LOCAL DATA FIRST ---
            // Combine local arrays to check for a match
            const allLocal = [...nigerianRecipes, ...africanRecipes];
            const localRecipe = allLocal.find(m => m.idMeal === mealId);

            if (localRecipe) {
                setRecipe(localRecipe);
                setIngredientsList(mapIngredients(localRecipe));
                setLoading(false);
                return; 
            }

            // --- FALLBACK: FETCH FROM EXTERNAL API ---
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                const data = await response.json();
                const fetchedRecipe = data.meals ? data.meals[0] : null;

                if (fetchedRecipe) {
                    setRecipe(fetchedRecipe);
                    setIngredientsList(mapIngredients(fetchedRecipe));
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetail();
    }, [mealId]);

    if (loading) {
        return (
            <div className='p-8 flex flex-col justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-14 w-14 border-4 border-t-4 border-t-[#FF5722] border-gray-200'></div>
                <div className='mt-4 text-lg font-medium text-gray-600'>Fetching deliciousness...</div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className='p-8 text-center h-screen flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-bold text-gray-300 mb-4'>404</h1>
                <p className='text-xl font-bold text-[#FF5722]'>Oops! Recipe not found.</p>
                <button onClick={() => window.history.back()} className="mt-6 text-gray-600 underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className='p-4 sm:p-8 max-w-6xl mx-auto animate-fadeIn'> 
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                
                {/* Image Section */}
                <div className='order-1'>
                    <div className="relative group">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full max-h-[500px] object-cover rounded-2xl shadow-2xl transition duration-500' />
                        {/* Dynamic Badge for Local Recipes */}
                        {(recipe.idMeal.startsWith('ng') || recipe.idMeal.startsWith('af')) && (
                            <div className="absolute top-4 left-4 bg-[#FF5722] text-white px-4 py-1 rounded-full font-bold shadow-lg">
                                Local Favorite 🌍
                            </div>
                        )}
                    </div>
                    
                    <div className='mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm'>
                        <p className='text-xs font-bold text-[#FF5722] uppercase tracking-widest mb-2'>Meal Information</p>
                        <p className='text-lg font-bold text-[#333]'>Category: <span className='font-normal text-gray-600'>{recipe.strCategory}</span></p>
                        <p className='text-lg font-bold text-[#333]'>Origin: <span className='font-normal text-gray-600'>{recipe.strArea}</span></p>
                    </div>
                </div>

                {/* Text Section */}
                <div className='order-2'>
                    <h1 className='text-4xl sm:text-5xl font-extrabold text-[#333] mb-6 leading-tight'>{recipe.strMeal}</h1>
                    <div className="flex items-center gap-2 mb-4">
                         <div className="h-1 w-12 bg-[#FF5722]"></div>
                         <h2 className='text-2xl font-bold text-[#333] uppercase tracking-tight'>Ingredients</h2>
                    </div>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 p-2'>
                        {ingredientsList.map((item, index) => (
                            <li key={index} className='flex items-center gap-3 text-gray-700 p-3 bg-white border border-gray-100 rounded-xl shadow-sm transition hover:border-[#FF5722] group'>
                                <span className='h-2 w-2 rounded-full bg-[#FF5722]'></span>
                                <p><span className='font-bold text-[#333]'>{item.measure}</span> {item.ingredient}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Instructions Section */}
            <div className='mt-12 pt-8 border-t border-gray-200'>
                <h2 className='text-3xl font-bold mb-6 text-[#333]'>Cooking Instructions</h2>
                <div className='bg-white p-6 sm:p-10 rounded-3xl shadow-inner border border-gray-50'>
                    <p className='whitespace-pre-wrap text-gray-700 leading-relaxed text-lg italic'>{recipe.strInstructions}</p>
                </div>
            </div>

            <div className="mt-12 text-center">
                <button onClick={() => window.history.back()} className="bg-[#333] text-white px-8 py-3 rounded-full hover:bg-[#FF5722] transition-colors font-bold shadow-lg">
                    ← Back to Discovery
                </button>
            </div>
        </div>
    );
};

export default RecipeDetail;