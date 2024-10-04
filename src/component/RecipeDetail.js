import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditRecipeModal from "./EditRecipeModal";
import { renderStars } from "../hooks/Rating";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchRecipe = async () => {
    try {
      // const response = await axios.get(`http://localhost:3004/Recipe?id=${id}`);
      // setRecipe(response.data[0]);
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const foundRecipe = storedRecipes.find((r) => r.id === parseInt(id));
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setError("Recipe not found");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDelete = async () => {
    try {
      // await axios.delete(`http://localhost:3004/Recipe/${id}`);

      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const updatedRecipes = storedRecipes.filter((r) => r.id !== parseInt(id));
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      
      alert("Recipe deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting the recipe:", err);
      setError("Error deleting the recipe");
    }
  };

  const handleRecipeUpdated = () => {
    fetchRecipe();
  };
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 text-7xl font-normal">{recipe.title}</h1>
          <p className="text-xl text-gray-600 ">
            <strong className="font-semibold">Cuisine:</strong> {recipe.cuisine}
          </p>
          <p className="text-xl text-gray-600">
            <strong className="font-semibold">Cooking Time:</strong> {recipe.cookingTime} mins
          </p>
          <p className="text-xl text-gray-600">
            <strong className="font-semibold">Ingredients:</strong> {recipe.ingredients.join(", ")}
          </p>
          <p className="text-2xl text-gray-600">
            <strong>Rating:</strong> {renderStars(recipe.rating)} ({recipe.rating})
          </p>

          <button onClick={handleDelete} className="mt-4 px-6 py-2 bg-red-600 text-white me-2 rounded-md hover:bg-red-700 transition duration-300">
            Delete Recipe
          </button>
          <button onClick={() => setIsEditModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Edit Recipe
          </button>
        </div>
        <img src={recipe.image} alt={recipe.title} className="w-full md:w-1/2 object-cover rounded-md shadow-lg" />
      </div>
      <p className="text-lg text-gray-600">
        <strong className="font-semibold">Instructions:</strong> {recipe.instruction}
      </p>

      <EditRecipeModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} recipe={recipe} onRecipeUpdated={handleRecipeUpdated} />
    </div>
  );
};

export default RecipeDetail;
