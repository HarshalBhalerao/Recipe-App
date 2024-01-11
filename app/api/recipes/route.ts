import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createRecipeSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createRecipeSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newRecipe = await prisma.recipe.create({
      data: {
        title: body.title,
        imgUrl: body.imgUrl,
        ingredients: body.ingredients,
        description: body.description,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error(error);
  }
}

export async function GET(request: NextRequest) {
  let id: number = +(request.nextUrl.searchParams.get("id") as string);
  if (id) {
    try {
      const getRecipes = await prisma.recipe.findUnique({
        where: {
          id: id,
        },
      });
      return NextResponse.json(getRecipes, { status: 200 });
    } catch (error) {
      console.error(error);
    }
  } else {
    const getRecipes = await prisma.recipe.findMany();
    return NextResponse.json(getRecipes, { status: 200 });
  }
}

export async function PATCH(request: NextRequest) {
  let id: number = +(request.nextUrl.searchParams.get("id") as string);
  try {
    const body = await request.json();
    const validation = createRecipeSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newRecipe = await prisma.recipe.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        imgUrl: body.imgUrl,
        ingredients: body.ingredients,
        description: body.description,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(request: NextRequest) {
  let id: number = +(request.nextUrl.searchParams.get("id") as string);
  try {
    const getRecipes = await prisma.recipe.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(getRecipes, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
