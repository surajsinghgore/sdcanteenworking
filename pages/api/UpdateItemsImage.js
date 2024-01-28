import DbConnection from "./Middleware/DbConnection";
import FoodItemSchema from "./Schema/FoodItemSchema";
import nextConnect from "next-connect";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";

const fs = require("fs");
const cloudinary = require("cloudinary").v2;
let CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
let CLOUDAPIKEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
let CLOUDAPISECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
// cloudnairy Configuration
cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDAPISECRET,
});

const handler = nextConnect();

import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG , PNG , JPEG Images are Allowed To Upload"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

handler.use(upload.single("Image"));
handler.post(async (req, res) => {
  let fileName = `./public/${req.file.filename}`;

  try {
    DbConnection();

    const query = req.query;

    // check whether query is not empty
    if (query.category == undefined) {
      fs.unlink(fileName, (err) => {});
      res.status(400).json({ message: "Please Try Again" });
    }

    let verify = await VerifyAdmin(req, res);
    if (verify == undefined) {
      fs.unlink(fileName, (err) => {});
      return res
        .status(401)
        .json({ message: "Please login with admin credentials" });
    }

    let _id = req.body._id;
    if (_id == undefined) {
      fs.unlink(fileName, (err) => {});
      return res.status(400).json({ message: "Please Provide Id" });
    }
    // food Items
    if (query.category == "food") {
      let find = await FoodItemSchema.findById(_id);
      if (find == null || find == undefined) {
        fs.unlink(fileName, (err) => {});
        return res.status(400).json({ message: "Item With This Id Not Found" });
      }
      const oldImage = find.ImageName;

      if (oldImage == undefined || oldImage == null) {
        fs.unlink(fileName, (err) => {});
        return res.status(400).json({ message: "Please Provide Old Image" });
      }

      const ressGetCloud = await cloudinary.uploader.upload(fileName, {
        public_id: oldImage,
      });
      let imageDbUrl = ressGetCloud.url;
      await FoodItemSchema.findByIdAndUpdate(_id, { Image: imageDbUrl });

      fs.unlink(fileName, (err) => {});

      return res
        .status(201)
        .json({ message: "Food Item Image Successfully Update" });
    }
    // coffee
    else if (query.category == "coffee") {
      let find = await CoffeeItemSchema.findById(_id);
      if (find == null || find == undefined) {
        fs.unlink(fileName, (err) => {});
        return res.status(400).json({ message: "Item With This Id Not Found" });
      }
      const oldImage = find.ImageName;

      if (oldImage == undefined || oldImage == null) {
        fs.unlink(fileName, (err) => {});
        return res.status(400).json({ message: "Please Provide Old Image" });
      }

      const ressGetCloud = await cloudinary.uploader.upload(fileName, {
        public_id: oldImage,
      });
      let imageDbUrl = ressGetCloud.url;
      await CoffeeItemSchema.findByIdAndUpdate(_id, { Image: imageDbUrl });

      fs.unlink(fileName, (err) => {});
      return res
        .status(201)
        .json({ message: "Coffee Item Image Successfully Update" });
    }
    // drink
    else if (query.category == "drink") {
      let find = await DrinkItemSchema.findById(_id);
      if (find == null || find == undefined) {
        fs.unlink(fileName, (err) => {});
        return res.status(400).json({ message: "Item With This Id Not Found" });
      }
      const oldImage = find.ImageName;

      if (oldImage == undefined || oldImage == null) {
        fs.unlink(fileName, (err) => {});
        return res.status(400).json({ message: "Please Provide Old Image" });
      }

      const ressGetCloud = await cloudinary.uploader.upload(fileName, {
        public_id: oldImage,
      });
      let imageDbUrl = ressGetCloud.url;
      await DrinkItemSchema.findByIdAndUpdate(_id, { Image: imageDbUrl });

      fs.unlink(fileName, (err) => {});
      return res
        .status(201)
        .json({ message: "Drink Item Successfully Update" });
    }
    // juice
    else if (query.category == "juice") {
      let find = await JuiceItemSchema.findById(_id);

      const oldImage = find.ImageName;
      if (oldImage == undefined || oldImage == null) {
        fs.unlink(fileName, (err) => {});
        return res.status(400).json({ message: "Please Provide Old Image" });
      }

      const ressGetCloud = await cloudinary.uploader.upload(fileName, {
        public_id: oldImage,
      });
      let imageDbUrl = ressGetCloud.url;
      await JuiceItemSchema.findByIdAndUpdate(_id, { Image: imageDbUrl });

      fs.unlink(fileName, (err) => {});
      return res
        .status(201)
        .json({ message: "Juice Item Successfully Update" });
    }
  } catch (e) {
    fs.unlink(fileName, (err) => {});
    console.log(e);
    res.status(501).json({ message: "Internal Server Error" });
  }
});

export default handler;
