import React, { useEffect, useState } from "react";
import RecipeList from "../component/RecipeList";
import axios from "axios";
import RecipeForm from "../component/RecipeForm";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRecipes = async () => {
    try {
      // const response = await axios.get("http://localhost:3004/Recipe");
      // setRecipes(response.data);
      // setFilteredRecipes(response.data);

      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      setRecipes(storedRecipes);
      setFilteredRecipes(storedRecipes);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to load recipes");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    if (query === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(query.toLowerCase()) ||
          recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredRecipes(filtered);
    }
  }; 

  const handleAddRecipe = async (newRecipe) => {
    // const response = await axios.post("http://localhost:3004/Recipe", newRecipe);
    // fetchRecipes();
    // setFilteredRecipes([...filteredRecipes, response]);
    const recipeWithId = { ...newRecipe, id: Date.now() };
    const updatedRecipes = [...recipes, recipeWithId];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    fetchRecipes();
  };

  if (loading) return <img src="/assets/spinner-light-bg.webp" className="w-37" alt="" />;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold pt-4">Recipe Manager</h1>
      <RecipeList recipes={filteredRecipes} onSearch={handleSearch} setIsModalOpen={setIsModalOpen} />

      <RecipeForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddRecipe={handleAddRecipe} />
    </div>
  );
};

export default Home;
