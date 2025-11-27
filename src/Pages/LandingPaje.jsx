
import { useState, useEffect } from 'react'
import MiddleIntro from '../Components/MidleIntro';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const LandingPaje = () => {
    const [search, setSearch] = useState('');
    const [arraySearch, setarraySearch] = useState([])
    const [recipes, setRecipes] = useState([]);
    const [category,setCategory]= useState ([])
   const navigate = useNavigate();

   const handleNav =(meal) =>{
    navigate(`/recipe/${meal.idMeal}`)
   }
    

    const foodapi= async()=>{
        const response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)

        const data = await response.json()
        console.log(data)
        if(!data.meals){
            setarraySearch ([])
            return
        }
        setarraySearch(data.meals )
     
    }
    
    useEffect(() => {
      const fetchCategories = async()=>{
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const CategoryData = await res.json();
        console.log(CategoryData)
        setCategory(CategoryData.categories);
      }

          const getRandomMeals = async () => {
          const meals = [];
          for (let i = 0; i < 10; i++) {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await res.json();
          console.log(data)
            if (data.meals) meals.push(data.meals[0]);
          }
          setRecipes(meals);
        };
       
        getRandomMeals();
        fetchCategories();
}, []);


    
  return (
    <div className='flex flex-col items-center justify-center ' >

      {/* search part */}
        <div className='w-90 text-[#333] font-bold placeholder:text-[#333] placeholder:font-bold flex gap-3 items-center justify-center '>
                <input className='border-2 border-[#FF5722]   p-2 rounded-2xl bg-[#f2f1f1] focus:border-[#FF5722] outline-none  w-96  '
                onChange={(e)=> setSearch(e.target.value)}
        
            type="text" placeholder='Search for a recipe...' />
            <button
            onClick={foodapi}
            className='bg-[#FF5722] text-white w-30 h-8 rounded-lg hover:bg-[#bf4019] hover:transition-all hover:duration-200 hover:transform hover:-translate-y-1'>Search </button>
        </div>

    <div className='border-b-[#FF5722] border-b-2 w-full mt-6 shadow-2xl p-4'>

        <ol className='flex flex-wrap'>
              {arraySearch.length === 0 && (
                        <li className="text-gray-600 mt-4">No results found</li>)}
                        
            {arraySearch.map((meals)=>(

                <li
                onClick={()=>handleNav(meals)}
                 className='flex  items-center justify-center gap-6  border border-[#FF5722] shadow-lg m-4 p-2 rounded-lg hover:scale-105 hover:transition-all hover:duration-200'
                key={meals.idMeal}>
                        <h2>{meals.strMeal}</h2>
                        <img className='w-15 h-15 rounded-md' src={`${meals.strMealThumb}`} alt="" />
                </li>
            ))}
        </ol>
    </div>
    {/* info about my website  */}
    <MiddleIntro/>

    {/* trending recipes  */}
   <div className='my-12 w-full px-8'>
        <h2 className='text-2xl font-bold mb-7 text-[#FF5722]'>Trending Recipes</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          <link to = "#categories"></link>
            {Array.isArray(recipes) && recipes.map((meal) => (
            <div
            onClick={()=>handleNav(meal)} 
            key={meal.idMeal}
            className='flex flex-col items-center bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-all duration-200'>
                <img src={meal.strMealThumb} alt={meal.strMeal} className='w-20 h-20 rounded-md' />
                <h3 className='mt-2 text-center font-semibold'>{meal.strMeal}</h3>
      </div>
              ))}
            </div>
          </div>

          {/* popular categories section */}

        <h1 className="text-[#FF5722] text-2xl font-bold mb-4">
         
  <span className="text-[#333]">Popular</span> Categories
</h1>

<div className="w-full overflow-x-auto hide-scrollbar">
  <div className="flex gap-1 snap-x snap-mandatory pb-4">
    {category.map((cat) => (
      <div
      // onClick={()=>handleNav(cat)}
        key={cat.idCategory}
        className="min-w-[250px] max-w-[250px] bg-white rounded-xl p-4 
                 border border-gray-200 shadow-sm snap-center
                 hover:shadow-lg hover:scale-[1.05] transition-all cursor-pointer"
      >
        <img
          src={cat.strCategoryThumb}
          alt={cat.strCategory}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />

        <h2 className="font-semibold text-[#333] text-lg">
          {cat.strCategory}
        </h2>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {cat.strCategoryDescription}
        </p>
        <p 
         onClick={() => navigate(`/category/${cat.strCategory}`)}
        className="mt-4 text-[#FF5722] font-medium text-sm hover:underline">View Category→</p>
      </div>
    ))}
  </div>
</div>



</div>


         


         
   
  )
}

export default LandingPaje
