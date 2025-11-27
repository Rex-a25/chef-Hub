import React from 'react';
import './App.css';
import Nav from './Components/Nav.jsx';
import LandingPaje from './Pages/LandingPaje.jsx';
import { Routes, Route } from "react-router-dom";
import Recipes from './Pages/Recipes.jsx';
import RecipeDetail from './Components/RecipeDetail.jsx';
import CategoryDetails from './Components/CategoryDetails.jsx';

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPaje />} />
        <Route path='/recipes' element={<Recipes />} />
        {/* <Route path='' element={<LandingPaje />} /> */}
        <Route path = '/recipe/:mealId' element={<RecipeDetail/>}/>
        <Route path="/category/:catName" element={<CategoryDetails />} />

      </Routes>
    </div>
  )
}

export default App;
