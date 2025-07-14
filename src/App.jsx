import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchCategories = async () => {
    const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setCategories(res.data.meals.map(m => m.strCategory));
  };

  const fetchAreas = async () => {
    const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    setAreas(res.data.meals.map(m => m.strArea));
  };

  const fetchRecipes = async () => {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    if (selectedCategory) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    } else if (selectedArea) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    }
    const res = await axios.get(url);
    setRecipes(res.data.meals || []);
  };

  const fetchRecipeDetails = async (id) => {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (res.data.meals) {
      setSelectedRecipe(res.data.meals[0]);
    } else {
      setSelectedRecipe(null);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAreas();
    fetchRecipes();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, selectedCategory, selectedArea]);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1>🍳 Recipe Finder</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-theme">
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </header>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        areas={areas}
        onReset={() => {
          setSearchTerm('');
          setSelectedCategory('');
          setSelectedArea('');
        }}
      />

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onSelect={() => fetchRecipeDetails(recipe.idMeal)}
          />
        ))}
      </div>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}

export default App;
