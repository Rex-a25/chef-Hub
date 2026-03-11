import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MiddleIntro from '../Components/MidleIntro';
import { nigerianRecipes } from '../data/nigerianRecipes';
import { africanRecipes } from '../data/africanRecipes';

const LandingPaje = () => {
    const [search, setSearch] = useState('');
    const [arraySearch, setarraySearch] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    const handleNav = (meal) => {
        navigate(`/recipe/${meal.idMeal}`);
    };

    const foodapi = async () => {
        if (!search.trim()) return;
        const query = search.toLowerCase();

        const allLocal = [...nigerianRecipes, ...africanRecipes];
        
        const localMatches = allLocal.filter(recipe => 
            recipe.strMeal.toLowerCase().includes(query) || 
            recipe.strCategory.toLowerCase().includes(query)
        );

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            const data = await response.json();
            const apiMatches = data.meals || [];

            setarraySearch([...localMatches, ...apiMatches]);
        } catch (error) {
            setarraySearch(localMatches);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const CategoryData = await res.json();
                setCategory(CategoryData.categories || []);
            } catch (error) {
                console.error(error);
            }
        };

        const getRandomMeals = async () => {
            try {
                const fetchPromises = Array.from({ length: 10 }, () =>
                    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
                );
                const results = await Promise.all(fetchPromises);
                const meals = results
                    .map(data => data.meals ? data.meals[0] : null)
                    .filter(meal => meal !== null);
                setRecipes(meals);
            } catch (error) {
                console.error(error);
            }
        };

        getRandomMeals();
        fetchCategories();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center bg-gray-50 min-h-screen'>

            <div className='w-full max-w-4xl px-4 mt-10 flex gap-3 items-center justify-center'>
                <input 
                    className='flex-1 border-2 border-[#FF5722] p-3 rounded-2xl bg-white shadow-sm focus:border-[#FF5722] outline-none transition-all'
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && foodapi()} 
                    type="text" 
                    placeholder='Search Jollof, Suya, or Pasta...' 
                />
                <button
                    onClick={foodapi}
                    className='bg-[#FF5722] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#bf4019] transition-all duration-200 transform hover:-translate-y-1 shadow-md'
                >
                    Search
                </button>
            </div>

            {arraySearch.length > 0 && (
                <div className='w-full mt-6 bg-white border-b-2 border-[#FF5722] shadow-xl p-6'>
                    <h2 className='text-center text-[#333] font-bold mb-4'>Search Results</h2>
                    <div className='flex flex-wrap justify-center gap-4'>
                        {arraySearch.map((meal) => (
                            <div
                                onClick={() => handleNav(meal)}
                                className='flex items-center gap-4 border border-gray-200 shadow-sm p-3 rounded-xl cursor-pointer hover:border-[#FF5722] hover:scale-105 transition-all bg-white'
                                key={meal.idMeal}
                            >
                                <img className='w-16 h-16 rounded-lg object-cover' src={meal.strMealThumb} alt={meal.strMeal} />
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold text-[#333]'>{meal.strMeal}</h3>
                                    {(meal.idMeal.startsWith('ng') || meal.idMeal.startsWith('af')) && (
                                        <span className='text-[10px] text-[#FF5722] font-bold'>LOCAL FAVORITE</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <MiddleIntro />

            <section className='my-12 w-full px-8'>
                <div className='flex items-center gap-2 mb-7'>
                    <div className='h-8 w-2 bg-[#FF5722] rounded-full'></div>
                    <h2 className='text-3xl font-bold text-[#333]'>
                        Now Showing: <span className='text-[#FF5722]'>Nigerian Meals</span>
                    </h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
                    {nigerianRecipes.map((meal) => (
                        <div
                            onClick={() => handleNav(meal)}
                            key={meal.idMeal}
                            className='group flex flex-col items-center bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#FF5722]'
                        >
                            <div className='overflow-hidden rounded-xl w-full'>
                                <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500' />
                            </div>
                            <h3 className='mt-4 text-center font-bold text-[#333]'>{meal.strMeal}</h3>
                            <p className='text-[#FF5722] text-sm font-medium mt-1'>{meal.strCategory}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className='my-12 w-full px-8 bg-white py-12 shadow-inner'>
                <h2 className='text-3xl font-bold mb-8 text-[#333] text-center'>
                    Explore <span className='text-[#FF5722]'>African Discovery</span>
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
                    {africanRecipes.map((meal) => (
                        <div
                            onClick={() => handleNav(meal)}
                            key={meal.idMeal}
                            className='flex flex-col items-center bg-gray-50 rounded-2xl shadow-sm p-4 cursor-pointer hover:scale-105 transition-all'
                        >
                            <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full h-44 object-cover rounded-xl' />
                            <h3 className='mt-3 text-center font-bold text-[#333]'>{meal.strMeal}</h3>
                            <span className='bg-[#FF5722] text-white text-[10px] px-2 py-1 rounded-full mt-2 font-bold uppercase'>{meal.strArea}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className='my-12 w-full px-8'>
                <h2 className='text-2xl font-bold mb-7 text-[#333] border-b-2 border-gray-100 pb-2'>Global Trending Recipes</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                    {recipes.map((meal) => (
                        <div
                            onClick={() => handleNav(meal)}
                            key={meal.idMeal}
                            className='flex flex-col items-center bg-white rounded-xl shadow p-3 hover:shadow-orange-100 hover:shadow-lg transition-all cursor-pointer'
                        >
                            <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full aspect-square object-cover rounded-lg' />
                            <h3 className='mt-2 text-center font-semibold text-sm line-clamp-1'>{meal.strMeal}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className='w-full px-8 mb-20'>
                <h2 className="text-2xl font-bold mb-6 text-[#333]">
                    Popular <span className="text-[#FF5722]">Categories</span>
                </h2>
                <div className="w-full overflow-x-auto pb-6 scroll-smooth">
                    <div className="flex gap-6">
                        {category.map((cat) => (
                            <div
                                key={cat.idCategory}
                                className="min-w-[280px] bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                            >
                                <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-full h-36 object-contain mb-4" />
                                <h2 className="font-bold text-[#333] text-xl">{cat.strCategory}</h2>
                                <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{cat.strCategoryDescription}</p>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/category/${cat.strCategory}`);
                                    }}
                                    className="mt-5 w-full py-2 rounded-lg border border-[#FF5722] text-[#FF5722] font-bold hover:bg-[#FF5722] hover:text-white transition-colors"
                                >
                                    View All {cat.strCategory}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPaje;