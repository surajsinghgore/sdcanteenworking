import DbConnection from "./Middleware/DbConnection";
import CoffeeCategorySchema from "./Schema/CoffeeCategorySchema";
import DrinkCategorySchema from "./Schema/DrinksCategorySchema";
import FoodCategory from "./Schema/FoodCategorySchema";
import JuiceCategorySchema from "./Schema/JuicesCategorySchema";

export default async function ShowCategory(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();

      const query = req.query;

      if (query.category == "food") {
        let data = await FoodCategory.find().select("-createdAt -updatedAt");
        res.status(201).json({ data, status: "201" });
      } else if (query.category == "coffee") {
        let data = await CoffeeCategorySchema.find().select(
          "-createdAt -updatedAt"
        );
        res.status(201).json({ data, status: "201" });
      } else if (query.category == "drink") {
        let data = await DrinkCategorySchema.find().select(
          "-createdAt -updatedAt"
        );
        res.status(201).json({ data, status: "201" });
      } else {
        let data = await JuiceCategorySchema.find().select(
          "-createdAt -updatedAt"
        );
        res.status(201).json({ data, status: "201" });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
