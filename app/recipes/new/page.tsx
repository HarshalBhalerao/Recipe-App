"use client";

import { Callout } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipeSchema } from "@/app/validationSchemas";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import "../../globals.css";

type RecipeForm = z.infer<typeof createRecipeSchema>;

const NewRecipePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<RecipeForm>({
    resolver: zodResolver(createRecipeSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/recipes", data);
      router.push("/recipes");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

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
          <Form.Control {...register("title")} asChild>
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
          <Form.Control {...register("imgUrl")} asChild>
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
          <Form.Control {...register("ingredients")} asChild>
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
          <Form.Control {...register("description")} asChild>
            <textarea className="Textarea" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button
            disabled={isSubmitting}
            className="Button"
            style={{ marginTop: 10 }}
          >
            Post Recipe {isSubmitting && <Spinner />}
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default NewRecipePage;
