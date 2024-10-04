import React, { useState } from "react";
import Home from "./pages/Home";
import RecipeDetail from "./component/RecipeDetail";
import { Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
};

export default App;
