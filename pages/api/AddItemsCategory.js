import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import DbConnection from "./Middleware/DbConnection";
import CoffeeCategorySchema from "./Schema/CoffeeCategorySchema";
import JuiceCategorySchema from "./Schema/JuicesCategorySchema";
import DrinkCategorySchema from "./Schema/DrinksCategorySchema";
import FoodCategory from "./Schema/FoodCategorySchema";

export default async function AddCoffeeCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let verify = await VerifyAdmin(req, res);
      console.log(req.body);
      if (verify == undefined) {
        return res
          .status(401)
          .json({ message: "Please login with admin credentails" });
      }

      const query = req.query;

      // check whether query is not empty
      if (query.category == undefined) {
        return res.status(400).json({ message: "Please Try Again" });
      }

      //   add coffee category
      if (query.category == "coffee") {
        let CoffeeCategoryName = req.body.itemCategory;
        if (!CoffeeCategoryName) {
          res.status(402).json({
            message: "Please Enter Coffee Category Name",
            status: "402",
          });
        }
        //   matching duplicate problem
        let match = await CoffeeCategorySchema.findOne({
          CoffeeCategoryName: CoffeeCategoryName,
        });
        if (match) {
          return res.status(400).json({
            message: "This Coffee Category Name Is Already Exits",
            status: "400",
          });
        }
        const data = new CoffeeCategorySchema({
          CoffeeCategoryName: CoffeeCategoryName,
        });
        // save data to database
        await data.save();
        return res
          .status(201)
          .json({ message: "successfully added", status: "201" });
      }
      // add food category
      else if (query.category == "food") {
        let foodName = req.body.itemCategory;
        if (!foodName) {
          res
            .status(402)
            .json({
              message: "Please Enter Food Category Name",
              status: "402",
            });
        }
        // matching duplicate problem
        let match = await FoodCategory.findOne({ FoodCategoryName: foodName });
        if (match) {
          return res.status(400).json({
            message: "This Food Category Name Is Already Exits",
            status: "400",
          });
        }
        const data = new FoodCategory({
          FoodCategoryName: foodName,
        });
        // save data to database
        await data.save();
        res.status(201).json({ message: "successfully added", status: "201" });
      }

      // add drink category
      else if (query.category == "drink") {
        let DrinkCategoryName = req.body.itemCategory;
        if (!DrinkCategoryName) {
          res
            .status(402)
            .json({
              message: "Please Enter Drink Category Name",
              status: "402",
            });
        }
        // matching duplicate problem
        let match = await DrinkCategorySchema.findOne({
          DrinkCategoryName: DrinkCategoryName,
        });
        if (match) {
          return res.status(400).json({
            message: "This Drink Category Name Is Already Exits",
            status: "400",
          });
        }
        const data = new DrinkCategorySchema({
          DrinkCategoryName: DrinkCategoryName,
        });
        // save data to database
        await data.save();
        res.status(201).json({ message: "successfully added", status: "201" });
      }
      // add juice category
      else {
        let JuiceCategoryName = req.body.itemCategory;
        if (!JuiceCategoryName) {
          res
            .status(402)
            .json({
              message: "Please Enter Juice Category Name",
              status: "402",
            });
        }
        // matching duplicate problem
        let match = await JuiceCategorySchema.findOne({
          JuiceCategoryName: JuiceCategoryName,
        });
        if (match) {
          return res.status(400).json({
            message: "This Juice Category Name Is Already Exits",
            status: "400",
          });
        }
        const data = new JuiceCategorySchema({
          JuiceCategoryName: JuiceCategoryName,
        });
        // save data to database
        await data.save();
        res.status(201).json({ message: "successfully added", status: "201" });
      }
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
