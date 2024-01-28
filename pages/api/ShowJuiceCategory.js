import DbConnection from "./Middleware/DbConnection";
import JuiceCategorySchema from "./Schema/JuicesCategorySchema";

export default async function ShowJuiceCategory(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();

      let data = await JuiceCategorySchema.find().select("-createdAt -updatedAt");;
      res.status(201).json({ data, status: "201" });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
