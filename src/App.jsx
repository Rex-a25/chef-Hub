import React from 'react';
import './App.css';
import Nav from './Components/Nav.jsx';
import LandingPaje from './Pages/LandingPaje.jsx';
import { Routes, Route } from "react-router-dom";
import Recipes from './Pages/Recipes.jsx';
import RecipeDetail from './Components/RecipeDetail.jsx';

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPaje />} />
        <Route path='/recipe' element={<Recipes />} />
        {/* <Route path='' element={<LandingPaje />} /> */}
        <Route path = '/recipe/:mealId' element={<RecipeDetail/>}/>
      </Routes>
    </div>
  )
}

export default App;
