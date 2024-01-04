"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { editRecipeSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Grid, Typography } from "@mui/material";

type RecipeForm = z.infer<typeof editRecipeSchema>;

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  description: string;
  imgUrl: string;
}

const InfoRecipePage = ({ params }: { params: any }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeForm>({
    resolver: zodResolver(editRecipeSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  // Default image used when image does not exist or query results in 404 status code
  const defaultImageUrl =
    "https://images.pexels.com/photos/4105287/pexels-photo-4105287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const [RecipeExist, setRecipeExist] = useState(false);
  const [Recipes, setRecipes] = useState<Recipe>();
  const [descriptionArray, setDescriptionArray] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`/api/recipes/`, { params: { id: params.id } })
      .then((response) => {
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
  const displayImage = (imgUrl: string | undefined) => {
    if (imgUrl) {
      return imgUrl;
    } else {
      return defaultImageUrl;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your Recipe</h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg flex items-center">
          <div className="flex-1">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                  {Recipes?.title}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <img
                  src={displayImage(Recipes?.imgUrl)}
                  alt="Description Image"
                  className="relative top-0 right-0 w-44 h-44 rounded-full ml-4 flex justify-end"
                />
              </Grid>
            </Grid>
            <p className="font-bold">Ingredients:</p>
            {Recipes?.ingredients?.split("\n").map((line, index) => (
              <p key={index} className="text-base">
                {line}
              </p>
            ))}
            <p className="mt-4 font-bold">Description:</p>
            {Recipes?.description?.split("\n").map((line, index) => (
              <p key={index} className="text-base">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoRecipePage;
