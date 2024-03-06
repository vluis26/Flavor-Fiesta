import { Schema, SchemaTypes, model } from "mongoose";

interface IImage{
    url: string,
    id: string,
}

interface IRecipe{
    title: string,
    cuisine: string,
    description: string,
    ingredients: string,
    image: IImage,
    user?: string;
}

const recipeSchema = new Schema<IRecipe>(
    {
        // referencing user to the created post they made.
      user: { type: SchemaTypes.ObjectId, ref: "User" },

      title: { type: String, required: true, index: true },
      cuisine: { type:String, required: true, index: true },
      description: { type: String, required: true, index: true },
      ingredients: { type: String, required: true, index: true },
      image: {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    },
    {
      timestamps: true,
      autoIndex: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
);

export const Recipe = model<IRecipe>("Recipe", recipeSchema);