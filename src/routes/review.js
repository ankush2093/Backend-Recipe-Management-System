import express from "express";
import { Recipe } from "../models/Recipes.js";
import { Review } from "../models/Reviews.js";
import { User } from "../models/Users.js";

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const { rating, reviewText, userId, recipeId } = req.body;

  console.log(rating, reviewText, userId, recipeId)

  try {
    const user = await User.findById(userId);
    const recipe = await Recipe.findById(recipeId);

    if (!user || !recipe) {
      return res.status(404).json({ message: "User or Recipe not found" });
    }

    const newReview = new Review({
      rating,
      reviewText,
      user: userId,
      recipe: recipeId,
    });

    await newReview.save();

    recipe.reviews.push(newReview);
    const totalReviews = recipe.reviews.length;
    recipe.averageRating =
      (recipe.averageRating * (totalReviews - 1) + rating) / totalReviews;

    await recipe.save();

    res.json({ message: "Review added successfully!", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

router.get("/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId).populate({
      path: 'reviews',
      populate: { path: 'user', select: 'username' },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe.reviews);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

export { router as reviewsRouter };
