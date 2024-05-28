// import mongoose from "mongoose";

// const recipeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   ingredients: [{ type: String, required: true }],
//   avoidIngredients: [{ type: String, required: true }],
//   instructions: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   cookingTime: { type: Number, required: true },
//   userOwner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// export const Recipe = mongoose.model("Recipe", recipeSchema);

//  // avoidIngredients: { type: String },

import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  avoidIngredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
