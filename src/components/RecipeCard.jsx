import React from 'react';

const RecipeCard = ({ recipe, onSelect }) => {
  return (
    <div
      className="recipe-card"
      onClick={() => onSelect(recipe)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(recipe)}
      role="button"
      tabIndex="0"
      aria-label={`View recipe for ${recipe.strMeal}`}
    >
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="recipe-info">
        <h3>{recipe.strMeal}</h3>
        <p>{recipe.strCategory} | {recipe.strArea}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
