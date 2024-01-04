import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  imgUrl: z.string().optional(),
  ingredients: z.string().min(1, "Ingredients are required."),
  description: z.string().min(1, "Description is required."),
});

export const editRecipeSchema = z.object({
  title: z.string().optional(),
  imgUrl: z.string().optional(),
  ingredients: z.string().optional(),
  description: z.string().optional(),
});
