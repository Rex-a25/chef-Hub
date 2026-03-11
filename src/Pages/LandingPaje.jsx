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

            {/* RESPONSIVE SEARCH BAR SECTION */}
            <div className='w-full max-w-lg px-4 mt-10'>
                <div className='flex flex-col sm:flex-row gap-2 items-center justify-center'>
                    <input 
                        className='w-full border-2 border-[#FF5722] p-3 rounded-xl bg-white shadow-sm focus:border-[#FF5722] outline-none transition-all text-sm'
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && foodapi()} 
                        type="text" 
                        placeholder='Search Jollof, Suya...' 
                    />
                    <button
                        onClick={foodapi}
                        className='w-full sm:w-auto bg-[#FF5722] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#bf4019] transition-all shadow-md text-sm whitespace-nowrap'
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* SEARCH RESULTS */}
            {arraySearch.length > 0 && (
                <div className='w-full mt-6 bg-white border-b-2 border-[#FF5722] shadow-xl p-4 md:p-6'>
                    <h2 className='text-center text-[#333] font-bold mb-4'>Search Results</h2>
                    <div className='flex flex-wrap justify-center gap-3'>
                        {arraySearch.map((meal) => (
                            <div
                                onClick={() => handleNav(meal)}
                                className='flex items-center gap-3 border border-gray-200 shadow-sm p-2 md:p-3 rounded-xl cursor-pointer hover:border-[#FF5722] transition-all bg-white w-full max-w-[280px]'
                                key={meal.idMeal}
                            >
                                <img className='w-12 h-12 rounded-lg object-cover' src={meal.strMealThumb} alt={meal.strMeal} />
                                <div className='flex flex-col overflow-hidden'>
                                    <h3 className='font-semibold text-[#333] text-sm truncate'>{meal.strMeal}</h3>
                                    {(meal.idMeal.startsWith('ng') || meal.idMeal.startsWith('af')) && (
                                        <span className='text-[8px] text-[#FF5722] font-black uppercase'>LOCAL</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <MiddleIntro />

            {/* NIGERIAN SECTION */}
            <section className='my-12 w-full px-4 md:px-8'>
                <div className='flex items-center gap-2 mb-7'>
                    <div className='h-6 w-1.5 bg-[#FF5722] rounded-full'></div>
                    <h2 className='text-xl md:text-3xl font-bold text-[#333]'>
                        Now Showing: <span className='text-[#FF5722]'>Nigerian Meals</span>
                    </h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8'>
                    {nigerianRecipes.map((meal) => (
                        <div
                            onClick={() => handleNav(meal)}
                            key={meal.idMeal}
                            className='group flex flex-col items-center bg-white rounded-2xl shadow-md p-3 md:p-4 cursor-pointer hover:shadow-2xl transition-all border border-transparent hover:border-[#FF5722]'
                        >
                            <div className='overflow-hidden rounded-xl w-full'>
                                <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500' />
                            </div>
                            <h3 className='mt-4 text-center font-bold text-[#333] text-sm md:text-base'>{meal.strMeal}</h3>
                            <p className='text-[#FF5722] text-xs font-medium mt-1'>{meal.strCategory}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* AFRICAN DISCOVERY */}
            <section className='my-12 w-full px-4 md:px-8 bg-white py-12 shadow-inner'>
                <h2 className='text-xl md:text-3xl font-bold mb-8 text-[#333] text-center'>
                    Explore <span className='text-[#FF5722]'>African Discovery</span>
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8'>
                    {africanRecipes.map((meal) => (
                        <div
                            onClick={() => handleNav(meal)}
                            key={meal.idMeal}
                            className='flex flex-col items-center bg-gray-50 rounded-2xl shadow-sm p-3 md:p-4 cursor-pointer hover:scale-105 transition-all'
                        >
                            <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full h-36 md:h-44 object-cover rounded-xl' />
                            <h3 className='mt-3 text-center font-bold text-[#333] text-sm md:text-base'>{meal.strMeal}</h3>
                            <span className='bg-[#FF5722] text-white text-[9px] px-2 py-0.5 rounded-full mt-2 font-bold uppercase'>{meal.strArea}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* GLOBAL TRENDING */}
            <section className='my-12 w-full px-4 md:px-8'>
                <h2 className='text-xl md:text-2xl font-bold mb-7 text-[#333] border-b-2 border-gray-100 pb-2'>Global Trending Recipes</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6'>
                    {recipes.map((meal) => (
                        <div
                            onClick={() => handleNav(meal)}
                            key={meal.idMeal}
                            className='flex flex-col items-center bg-white rounded-xl shadow p-2 md:p-3 hover:shadow-lg transition-all cursor-pointer'
                        >
                            <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full aspect-square object-cover rounded-lg' />
                            <h3 className='mt-2 text-center font-semibold text-xs md:text-sm line-clamp-1'>{meal.strMeal}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* CATEGORIES SCROLLER */}
            <section className='w-full px-4 md:px-8 mb-20'>
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#333]">
                    Popular <span className="text-[#FF5722]">Categories</span>
                </h2>
                <div className="w-full overflow-x-auto pb-6 scroll-smooth hide-scrollbar">
                    <div className="flex gap-4 md:gap-6">
                        {category.map((cat) => (
                            <div
                                key={cat.idCategory}
                                className="min-w-[220px] md:min-w-[280px] bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                            >
                                <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-full h-28 md:h-36 object-contain mb-4" />
                                <h2 className="font-bold text-[#333] text-lg">{cat.strCategory}</h2>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{cat.strCategoryDescription}</p>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/category/${cat.strCategory}`);
                                    }}
                                    className="mt-4 w-full py-2 rounded-lg border border-[#FF5722] text-[#FF5722] font-bold text-xs md:text-sm hover:bg-[#FF5722] hover:text-white transition-colors"
                                >
                                    View All
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