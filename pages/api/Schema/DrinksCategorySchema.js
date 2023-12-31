import mongoose from "mongoose";

const AddDrinkCategorySchema = new mongoose.Schema(
  {
    DrinkCategoryName: {
      type: String, trim:true,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};

const DrinkCategorySchema =
  mongoose.models.DrinkCategory ||
  mongoose.model("DrinkCategory", AddDrinkCategorySchema);
export default DrinkCategorySchema;
