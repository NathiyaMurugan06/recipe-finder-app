import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onSelect }) => {
  if (!recipes.length) {
    return <p className="no-results">No recipes found. Try something else!</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default RecipeList;
