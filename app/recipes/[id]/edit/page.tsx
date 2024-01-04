"use client";

import { Callout } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipeSchema } from "@/app/validationSchemas";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import "../../../globals.css";
import { Button } from "@mui/material";

type RecipeForm = z.infer<typeof createRecipeSchema>;

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  description: string;
  imgUrl: string;
}

const EditRecipePage = ({ params }: { params: any }) => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<RecipeForm>({
    resolver: zodResolver(createRecipeSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const [recipeExist, setRecipeExist] = useState(false);
  const [recipes, setRecipes] = useState<Recipe>();

  const onSubmit = handleSubmit(async (data) => {
    if (
      data.title == "" &&
      data.description == undefined &&
      data.ingredients == undefined
    ) {
      data = {
        title: recipes!.title,
        description: recipes!.description,
        ingredients: recipes!.ingredients,
      };
    } else if (data.title == "") {
      data = {
        title: recipes!.title,
        description: data.description,
        ingredients: data.ingredients,
      };
    } else if (data.description == undefined) {
      data = {
        title: data.title,
        description: recipes!.description,
        ingredients: data.ingredients,
      };
    } else if (data.ingredients == undefined) {
      data = {
        title: data.title,
        description: data.description,
        ingredients: recipes!.ingredients,
      };
    }
    try {
      setSubmitting(true);
      await axios.patch("/api/recipes", data, { params: { id: params.id } });
      router.push("/recipes");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

  useEffect(() => {
    axios
      .get(`/api/recipes`, { params: { id: params.id } })
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

  return (
    <div className="max-w-screen-2xl m-auto p-10">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Form.Root className="FormRoot m-auto" onSubmit={onSubmit}>
        <Form.Field className="FormField" name="title">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Recipe Name</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your Recipe Name
            </Form.Message>
          </div>
          <Form.Control
            defaultValue={recipes?.title}
            {...register("title")}
            asChild
          >
            <input className="Input" type="text" required />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="imgUrl">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">
              Recipe Image (optional)
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your Recipe Image
            </Form.Message>
          </div>
          <Form.Control
            defaultValue={recipes?.imgUrl}
            {...register("imgUrl")}
            asChild
          >
            <input className="Input" type="url" />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="ingredients">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Ingredients</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter the Recipe Ingredients
            </Form.Message>
          </div>
          <Form.Control
            defaultValue={recipes?.ingredients}
            {...register("ingredients")}
            asChild
          >
            <textarea className="Textarea" required />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="description">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Description</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter the Recipe Description
            </Form.Message>
          </div>
          <Form.Control
            defaultValue={recipes?.description}
            {...register("description")}
            asChild
          >
            <textarea className="Textarea" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button
            disabled={isSubmitting}
            className="Button"
            style={{ marginTop: 10 }}
          >
            Update Recipe {isSubmitting && <Spinner />}
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default EditRecipePage;
