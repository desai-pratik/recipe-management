import React, { useState } from "react";

const RecipeForm = ({ isOpen, onClose, onAddRecipe }) => {

    const [formData, setFormData] = useState({
      title: '',
      cuisine: '',
      cookingTime: '',
      ingredients: '',
      image: '',
      instruction: '',
      rating: '',
    })
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const ingredientsArray = formData.ingredients.split(',').map(ing => ing.trim());
      const newRecipe = { ...formData, ingredients: ingredientsArray};
      onAddRecipe(newRecipe);
      onClose();
      setFormData({
        title: '',
        cuisine: '',
        cookingTime: '',
        ingredients: '',
        image: '',
        instruction: '',
        rating: '',
      }); 
    };

    if (!isOpen) return null;


  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Cuisine */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="cuisine">Cuisine</label>
            <input
              type="text"
              name="cuisine"
              id="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Cooking Time */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="cookingTime">Cooking Time (mins)</label>
            <input
              type="number"
              name="cookingTime"
              id="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="ingredients">Ingredients (comma-separated)</label>
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="image">Image URL</label>
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="instruction">Instructions</label>
            <textarea
              name="instruction"
              id="instruction"
              value={formData.instruction}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="rating">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              min="1"
              max="5"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Add Recipe
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 border border-gray-300 rounded-md px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
