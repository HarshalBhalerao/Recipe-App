"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  description: string;
  imgUrl: string;
}

const RecipesPage = () => {
  const [recipeExist, setRecipeExist] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  // Default image used when image does not exist or query results in 404 status code
  const defaultImageUrl =
    "https://images.pexels.com/photos/4105287/pexels-photo-4105287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

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

  /**
   * displayImage function
   * @description Returns imgUrl string, if it does not exist then returns defaultImage
   * @param imgUrl
   * @returns string
   */
  const displayImage = (imgUrl: string) => {
    if (imgUrl) {
      return imgUrl;
    } else {
      return defaultImageUrl;
    }
  };

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
              ?.sort((a, b) => a.title.localeCompare(b.title))
              ?.map(
                (
                  item, index // Sort alphabetically
                ) => (
                  <Grid key={index} item xs={6}>
                    <Card sx={{ maxWidth: 345, borderRadius: 6 }}>
                      <Link
                        href={{
                          pathname: "/recipes/[id]",
                          query: { id: item?.id },
                        }}
                        as={`recipes/${item?.id}`}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={displayImage(item.imgUrl)}
                            alt={item.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className="flex justify-center items-center m-auto"
                            >
                              {item.title}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  </Grid>
                )
              )}
        </Grid>
      </Box>
    </div>
  );
};

export default RecipesPage;
