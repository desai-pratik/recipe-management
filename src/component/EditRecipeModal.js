import React, { useState, useEffect } from "react";
import axios from "axios";

const EditRecipeModal = ({ isOpen, onClose, recipe, onRecipeUpdated }) => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instruction: "",
    cuisine: "",
    cookingTime: "",
    image: "",
    rating: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setNewRecipe({
      title: recipe.title || "",
      ingredients: recipe.ingredients || "",
      instruction: recipe.instruction || "",
      cuisine: recipe.cuisine || "",
      cookingTime: recipe.cookingTime || "",
      image: recipe.image || "",
      rating: recipe.rating || "",
    });
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({
      ...newRecipe,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.put(`http://localhost:3004/Recipe/${recipe.id}`, newRecipe);
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const updatedRecipes = storedRecipes.map((r) =>
        r.id === recipe.id ? { ...newRecipe, id: recipe.id } : r
      );
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      onRecipeUpdated();
      onClose();
    } catch (err) {
      setError("Error updating the recipe");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center overflow-auto justify-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-lg font-bold mb-4">Edit Recipe</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newRecipe.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            name="cuisine"
            value={newRecipe.cuisine}
            onChange={handleChange}
            placeholder="Cuisine"
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            name="cookingTime"
            value={newRecipe.cookingTime}
            onChange={handleChange}
            placeholder="Cooking Time (minutes)"
            className="border p-2 w-full mb-4"
            required
          />
          <textarea
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma separated)"
            className="border p-2 w-full mb-4"
            required
          />
          <textarea
            name="instruction"
            value={newRecipe.instruction}
            onChange={handleChange}
            placeholder="Instructions"
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            name="image"
            value={newRecipe.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="number"
            name="rating"
            value={newRecipe.rating}
            onChange={handleChange}
            placeholder="Rating (0-5)"
            className="border p-2 w-full mb-4"
            required
            min="1"
            max="5"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeModal;
