"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import CardItem from "../components/CardItem";

type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  description: string;
  imgUrl: string;
};

const RecipesPage = () => {
  const [recipeExist, setRecipeExist] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Axios get function calling GET ALL (findAll) prisma function
    axios.get("/api/recipes").then((response) => {
      try {
        if (response.data !== null) {
          setRecipeExist(true);
          setRecipes(response.data);
        } else {
          setRecipeExist(false);
        }
      } catch (error) {
        setRecipeExist(false);
        console.error(error);
      }
    });
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, sm: 12, md: 24 }}
        >
          {recipeExist &&
            recipes
              ?.sort((a, b) => a.title.localeCompare(b.title)) // Sort alphabetically
              ?.map(
                (
                  item,
                  index 
                ) => (
                  <Grid key={index} item xs={6}>
                    <CardItem item={item} />
                  </Grid>
                )
              )}
        </Grid>
      </Box>
    </div>
  );
};

export default RecipesPage;
