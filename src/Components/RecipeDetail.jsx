import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mapIngredients = (meal) => {
    const ingredientsArray = [];

    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        
        const ingredient = meal[ingredientKey];
        const measure = meal[measureKey];

        if (
            ingredient && 
            ingredient.trim() !== "" && 
            ingredient.trim() !== "null"
        ) {
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

            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            const data = await response.json();
            
            const fetchedRecipe = data.meals ? data.meals[0] : null;

            setRecipe(fetchedRecipe);
            
            if (fetchedRecipe) {
                const mapped = mapIngredients(fetchedRecipe);
                setIngredientsList(mapped);
            } else {
                setIngredientsList([]);
            }

            setLoading(false);
        };

        fetchRecipeDetail();
    }, [mealId]);

    if (loading) {
        return (
            <div className='p-8 flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-t-[#FF5722] border-gray-200'></div>
                <div className='ml-4 text-lg'>Loading recipe details...</div>
            </div>
        );
    }

    if (!recipe) {
        return <div className='p-8 text-center text-xl font-bold text-[#FF5722]'>Recipe not found!</div>;
    }


    return (
        <div className='p-4 sm:p-8 max-w-6xl mx-auto animate-fadeIn'> 
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                
                <div className='order-1'>
                    <img 
                        src={recipe.strMealThumb} 
                        alt={recipe.strMeal} 
                        className='w-full max-h-96 object-cover rounded-xl shadow-2xl transform hover:scale-[1.02] transition duration-500 ease-in-out' 
                    />
                    
                    <div className='mt-6 p-4 bg-gray-100 rounded-lg shadow-inner'>
                        <p className='text-sm font-semibold text-[#FF5722] uppercase'>Details</p>
                        <p className='text-lg font-bold text-[#333] mt-1'>
                            Category: <span className='font-normal'>{recipe.strCategory}</span>
                        </p>
                        <p className='text-lg font-bold text-[#333]'>
                            Area: <span className='font-normal'>{recipe.strArea}</span>
                        </p>
                    </div>
                </div>

                <div className='order-2'>
                    <h1 className='text-4xl sm:text-5xl font-extrabold text-[#FF5722] mb-6 leading-tight'>
                        {recipe.strMeal}
                    </h1>
                    
                    <h2 className='text-2xl font-bold mb-3 text-[#333] border-b-2 border-[#FF5722] pb-1'>
                        Ingredients
                    </h2>
                    
                    <ul className='list-disc list-inside mb-8 p-4 bg-gray-50 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                        {ingredientsList.map((item, index) => (
                            <li 
                                key={index} 
                                className='text-gray-700 py-1 transition duration-300 hover:text-[#FF5722] transform hover:translate-x-1'
                            >
                                <span className='font-semibold text-[#333]'>{item.measure}</span> {item.ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='mt-8 pt-6 border-t border-gray-300'>
                <h2 className='text-2xl font-bold mb-4 text-[#333]'>
                    Instructions
                </h2>
                <p className='whitespace-pre-wrap text-gray-700 leading-relaxed text-base sm:text-lg bg-white p-4 rounded-lg shadow-inner'>
                    {recipe.strInstructions}
                </p>
            </div>
            
        </div>
    );
};

export default RecipeDetail;