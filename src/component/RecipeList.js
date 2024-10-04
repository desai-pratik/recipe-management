import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { renderStars } from "../hooks/Rating";

const RecipeList = ({ recipes, onSearch, setIsModalOpen }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };


  const handleSelectRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search by ingredients or cuisine..."
          value={search}
          onChange={handleSearch}
          className="border rounded-md p-2 mb-4 w-96"
        />
        <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white rounded-md px-4 py-2 mb-4">
          Add New Recipe
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border rounded-lg p-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectRecipe(recipe.id)}>
            {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
            <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
            <p className="text-sm text-gray-600">Cuisine: {recipe.cuisine}</p>
            <p className="text-sm text-gray-600">Cooking Time: {recipe.cookingTime} mins</p>
            <p className="mt-2">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <div className="mt-2">
              <strong>Rating:</strong> {renderStars(recipe.rating)} ({recipe.rating})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
