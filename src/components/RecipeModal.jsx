import React from 'react';
import './RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="modal-img" />
        <p><strong>Category:</strong> {recipe.strCategory}</p>
        <p><strong>Area:</strong> {recipe.strArea}</p>

        <h3>Ingredients</h3>
        <ul>
          {getIngredients().map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>

        {recipe.strYoutube && (
          <p>
            <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
              ▶️ Watch Tutorial
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
