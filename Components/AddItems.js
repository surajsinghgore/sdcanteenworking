import React, { useState, useEffect } from "react";
import StyleFood from "../styles/AddFood.module.css";
import HeadTag from "../Components/Head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from "../Components/PathNavigate";
import AdminRightInnerHeader from "../Components/AdminRightInnerHeader";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from "../pages/admin/VerifyAdminLogin";
import LoadingBar from "react-top-loading-bar";

import Switch from "react-switch";
export default function AddItems({ pageStatus }) {
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [normalPrice, setNormalPrice] = useState("");

  const [normalPriceName, setNormalPriceName] = useState("Normal Size Price");

  const [mediumPrice, setMediumPrice] = useState("");

  const [mediumPriceName, setMediumPriceName] = useState("Medium Size Price");
  const [smallPrice, setSmallPrice] = useState("");
  const [smallPriceName, setSmallPriceName] = useState(
    pageStatus == "FoodItem" ? "Half Size Price" : "Small Size Price"
  );

  const [largePrice, setLargePrice] = useState("");
  const [largePriceName, setLargePriceName] = useState("Large Size Price");
  const [Qtys, setQtys] = useState(1);
  const [Category, setCategory] = useState("");
  const [Images, setImages] = useState("");
  const [imgs, setImgs] = useState();
  const [showImage, setShowImage] = useState(true);
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");

  const handleChanges = () => {
    setChecked(!checked);
  };
  // images handle
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      var file = e.target.files[0];
      setFiles(file);
      let url = await URL.createObjectURL(file);
      setImgs(url);
      setImages(url);
      setShowImage(false);
    } else {
      setShowImage(true);
    }
  };

  const AddItemToDB = async (e) => {
    e.preventDefault();
    if (!itemName) {
      toast.warn(
        `Please Enter ${
          pageStatus == "FoodItem"
            ? "Food"
            : pageStatus == "CoffeeItem"
            ? "Coffee"
            : pageStatus == "DrinkItem"
            ? "Drink"
            : "Juice"
        } Name`,
        {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    if (!Category) {
      toast.warn("Please select Category Of Item", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!description) {
      toast.warn("Please Enter Description of Item", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!Images) {
      toast.warn(
        `Please Upload ${
          pageStatus == "FoodItem"
            ? "Food"
            : pageStatus == "CoffeeItem"
            ? "Coffee"
            : pageStatus == "DrinkItem"
            ? "Drink"
            : "Juice"
        } Image`,
        {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    if (smallPrice == "" && mediumPrice == "" && largePrice == "") {
      if (normalPrice == "") {
        toast.warn("Please Enter Atleast Normal Price Of Item", {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }

    if ((smallPrice != "" && mediumPrice != "") || largePrice != "") {
      if (normalPrice != "") {
        toast.warn("Please Enter Only Normal Price or Different Size Price", {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
    if (
      parseInt(smallPrice) <= 0 ||
      parseInt(mediumPrice) <= 0 ||
      parseInt(largePrice) <= 0 ||
      parseInt(normalPrice) <= 0
    ) {
      toast.warn("Price Not Be Zero Or Below Zero", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!files) {
      toast.warn(
        `Please Upload ${
          pageStatus == "FoodItem"
            ? "Food"
            : pageStatus == "CoffeeItem"
            ? "Coffee"
            : pageStatus == "DrinkItem"
            ? "Drink"
            : "Juice"
        } Image`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      return;
    }

    let active;
    if (checked == true) {
      active = "ON";
    } else {
      active = "OFF";
    }

    const data = new FormData();
    data.append(
      `${
        pageStatus == "FoodItem"
          ? "FoodName"
          : pageStatus == "CoffeeItem"
          ? "CoffeeName"
          : pageStatus == "DrinkItem"
          ? "DrinkName"
          : "JuiceName"
      }`,
      itemName
    );
    data.append("Qty", Qtys);
    data.append("Category", Category);
    data.append("Description", description);
    data.append("Image", files);
    data.append("Active", active);

    if (largePrice != "") {
      {
        pageStatus == "FoodItem"
          ? data.append("largePrice", largePrice)
          : data.append("largePriceName", largePrice);
      }
    }
    if (mediumPrice != "") {
      {
        pageStatus == "FoodItem"
          ? data.append("mediumPrice", mediumPrice)
          : data.append("mediumPriceName", mediumPrice);
      }
    }
    if (smallPrice != "") {
      {
        pageStatus == "FoodItem"
          ? data.append("halfPrice", smallPrice)
          : data.append("smallPriceName", smallPrice);
      }
    }

    if (normalPrice != "") {
      data.append("normalPriceName", normalPrice);
    }

    setProgress(40);

    // file size check
    let sizeInMb = files.size / (1024 * 1024);
    let size = parseFloat(sizeInMb.toFixed(2));
    if (size > 5) {
      toast.warn("Please Upload Image Less Than 5 Mb", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setProgress(100);
      return;
    }
    let res = await fetch(
      `${HOST}/api/${
        pageStatus == "FoodItem"
          ? "AddFoodItem"
          : pageStatus == "CoffeeItem"
          ? "AddCoffeeItem"
          : pageStatus == "DrinkItem"
          ? "AddDrinkItem"
          : "AddJuiceItem"
      }`,
      {
        method: "POST",
        body: data,
      }
    );

    setProgress(100);

    if (res.status === 500) {
      toast.error("Only JPG , PNG , JPEG Images are Allowed To Upload", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (res.status == 501) {
      toast.error(`Internal Server Error`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let datas = await res.json();

    // empty filed error message
    if (res.status == 400) {
      toast.warn(`${datas.message}`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (res.status == 201) {
      toast.success(`${itemName} is Successfully Added`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        {
          pageStatus == "FoodItem"
            ? router.push("/admin/ShowFoodItem")
            : pageStatus == "CoffeeItem"
            ? router.push("/admin/ShowCoffeeItem")
            : pageStatus == "DrinkItem"
            ? router.push("/admin/ShowDrinkItem")
            : router.push("/admin/ShowJuiceItem");
        }
      }
    }
  };

  // category data load
  useEffect(() => {
    setProgress(40);

    {
      pageStatus == "FoodItem"
        ? "Add Food Page"
        : pageStatus == "CoffeeItem"
        ? "Add Coffee Page"
        : pageStatus == "JuiceItem"
        ? "Add Juice Page"
        : "Add Drink Page";
    }

    async function dataFetch() {
      let ress = await fetch(
        `${HOST}/api/ShowCategory?category=${
          pageStatus == "FoodItem"
            ? "food"
            : pageStatus == "CoffeeItem"
            ? "coffee"
            : pageStatus == "DrinkItem"
            ? "drink"
            : "juice"
        }`
      );
      let datas = await ress.json();

      setProgress(100);

      await setData(datas.data);
    }
    dataFetch();
  }, []);

  return (
    <>
      <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />

      <HeadTag
        title={
          pageStatus == "FoodItem"
            ? "Add Food Item"
            : pageStatus == "CoffeeItem"
            ? "Add Coffee Item"
            : pageStatus == "JuiceItem"
            ? "Add Juice Item"
            : "Add Drink Item"
        }
      />
      {/* left panel bar */}
      <AdminLeftMenu />
      <VerifyAdminLogin />
      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader
          title={
            pageStatus == "FoodItem"
              ? "Add Food Page"
              : pageStatus == "CoffeeItem"
              ? "Add Coffee Page"
              : pageStatus == "JuiceItem"
              ? "Add Juice Page"
              : "Add Drink Page"
          }
        />

        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL={
            pageStatus == "FoodItem"
              ? "/admin/ShowFoodItem"
              : pageStatus == "CoffeeItem"
              ? "/admin/ShowCoffeeItem"
              : pageStatus == "JuiceItem"
              ? "/admin/ShowJuiceItem"
              : "/admin/ShowDrinkItem"
          }
          current={
            pageStatus == "FoodItem"
              ? "ADD FOOD ITEM"
              : pageStatus == "CoffeeItem"
              ? "ADD COFFEE ITEM"
              : pageStatus == "JuiceItem"
              ? "ADD JUICE ITEM"
              : "ADD DRINK ITEM"
          }
        />

        {/* form add food */}

        <div className={StyleFood.Form} style={{ marginTop: "0.5%" }}>
          <div className={StyleFood.heading}>
            <h1>
              Enter New{" "}
              {pageStatus == "FoodItem"
                ? "Food"
                : pageStatus == "CoffeeItem"
                ? "Coffee"
                : pageStatus == "JuiceItem"
                ? "Juice"
                : "Drink"}{" "}
              Item For Website
            </h1>
          </div>
          <div className={StyleFood.form_element}>
            <li>
              <p>
                Enter{" "}
                {pageStatus == "FoodItem"
                  ? "Food"
                  : pageStatus == "CoffeeItem"
                  ? "Coffee"
                  : pageStatus == "JuiceItem"
                  ? "Juice"
                  : "Drink"}{" "}
                Name <span>*</span>
              </p>
              <input
                type="text"
                name="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </li>

            <li>
              <p>
                Enter{" "}
                {pageStatus == "FoodItem"
                  ? "Food"
                  : pageStatus == "CoffeeItem"
                  ? "Coffee"
                  : pageStatus == "JuiceItem"
                  ? "Juice"
                  : "Drink"}{" "}
                Qty
              </p>
              <input
                type="text"
                name="itemQty"
                value={Qtys}
                readOnly={true}
                onChange={(e) => setQtys(e.target.value)}
              />
            </li>

            <li className={StyleFood.selects}>
              <p>
                Enter{" "}
                {pageStatus == "FoodItem"
                  ? "Food"
                  : pageStatus == "CoffeeItem"
                  ? "Coffee"
                  : pageStatus == "JuiceItem"
                  ? "Juice"
                  : "Drink"}{" "}
                Category <span>*</span>
              </p>
              <select
                name="itemCategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="no">Select Category</option>
                {data != undefined ? (
                  <>
                    {" "}
                    {data.map((item, index) => {
                      return (
                        <option
                          value={
                            pageStatus == "FoodItem"
                              ? item.FoodCategoryName
                              : pageStatus == "CoffeeItem"
                              ? item.CoffeeCategoryName
                              : pageStatus == "JuiceItem"
                              ? item.JuiceCategoryName
                              : item.DrinkCategoryName
                          }
                          key={item._id}
                        >
                          {pageStatus == "FoodItem"
                            ? item.FoodCategoryName
                            : pageStatus == "CoffeeItem"
                            ? item.CoffeeCategoryName
                            : pageStatus == "JuiceItem"
                            ? item.JuiceCategoryName
                            : item.DrinkCategoryName}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </select>
            </li>

            {/*  */}
            {pageStatus == "FoodItem" ? (
              <li className={StyleFood.Pricess}>
                <h6>
                  Enter Price <span>*</span>
                </h6>
                <p>
                  <input
                    type="text"
                    name="normalPriceName"
                    className={StyleFood.priceHeading}
                    value={normalPriceName}
                    onChange={(e) => setNormalPriceName(e.target.value)}
                    readOnly
                  />{" "}
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={normalPrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setNormalPrice(e.target.value)}
                  />{" "}
                </p>
                <h4>Or</h4>
                <p>
                  <input
                    type="text"
                    name="smallPriceName"
                    className={StyleFood.priceHeading}
                    value={smallPriceName}
                    onChange={(e) => setSmallPriceName(e.target.value)}
                    readOnly
                  />
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={smallPrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setSmallPrice(e.target.value)}
                  />{" "}
                </p>

                <p>
                  <input
                    type="text"
                    name="mediumPriceName"
                    className={StyleFood.priceHeading}
                    value={mediumPriceName}
                    onChange={(e) => setMediumPriceName(e.target.value)}
                    readOnly
                  />
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={mediumPrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setMediumPrice(e.target.value)}
                  />{" "}
                </p>

                <p>
                  <input
                    type="text"
                    name="largePriceName"
                    className={StyleFood.priceHeading}
                    value={largePriceName}
                    onChange={(e) => setLargePriceName(e.target.value)}
                    readOnly
                  />{" "}
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={largePrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setLargePrice(e.target.value)}
                  />{" "}
                </p>
              </li>
            ) : (
              <li className={StyleFood.Pricess}>
                <h6>
                  Enter Price <span>*</span>
                </h6>
                <p>
                  <input
                    type="text"
                    name="normalPriceName"
                    className={StyleFood.priceHeading}
                    value={normalPriceName}
                    onChange={(e) => setNormalPriceName(e.target.value)}
                    readOnly
                  />{" "}
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={normalPrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setNormalPrice(e.target.value)}
                  />{" "}
                </p>
                <h4>Or</h4>
                <p>
                  <input
                    type="text"
                    name="smallPriceName"
                    className={StyleFood.priceHeading}
                    value={smallPriceName}
                    onChange={(e) => setSmallPriceName(e.target.value)}
                    readOnly
                  />
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={smallPrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setSmallPrice(e.target.value)}
                  />{" "}
                </p>

                <p>
                  <input
                    type="text"
                    name="mediumPriceName"
                    className={StyleFood.priceHeading}
                    value={mediumPriceName}
                    onChange={(e) => setMediumPriceName(e.target.value)}
                    readOnly
                  />
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={mediumPrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setMediumPrice(e.target.value)}
                  />{" "}
                </p>

                <p>
                  <input
                    type="text"
                    name="largePriceName"
                    className={StyleFood.priceHeading}
                    value={largePriceName}
                    onChange={(e) => setLargePriceName(e.target.value)}
                    readOnly
                  />{" "}
                  <input
                    type="Number"
                    name="itemQty"
                    className={StyleFood.prices}
                    value={largePrice}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setLargePrice(e.target.value)}
                  />{" "}
                </p>
              </li>
            )}

            <li className={StyleFood.description}>
              <p>
                Enter Description Category<span>*</span>
              </p>
              <textarea
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </li>
            <li>
              <p>
                Upload{" "}
                {pageStatus == "FoodItem"
                  ? "Food"
                  : pageStatus == "CoffeeItem"
                  ? "Coffee"
                  : pageStatus == "JuiceItem"
                  ? "Juice"
                  : "Drink"}{" "}
                Photo <span>*</span>
              </p>
              <input
                type="file"
                name="photo"
                id="photoJuice"
                onChange={handleChange}
              />
            </li>
            <li>
              <p>Photo Realtime Preview</p>
              <div className={StyleFood.preview_photo}>
                {showImage ? (
                  <h1>please upload Image</h1>
                ) : (
                  <Image
                    src={imgs}
                    alt="item images"
                    id="output"
                    width={600}
                    height={600}
                  />
                )}
              </div>
            </li>

            <li className={StyleFood.btns}>
              <p>Product Visibility Status </p>
              <Switch
                onChange={handleChanges}
                checked={checked}
                className={StyleFood.react_switch1}
                offColor="#FF1E1E"
              />
            </li>
            <button onClick={AddItemToDB}>
              {" "}
              ADD{" "}
              {pageStatus == "FoodItem"
                ? "FOOD"
                : pageStatus == "CoffeeItem"
                ? "COFFEE"
                : pageStatus == "JuiceItem"
                ? "JUICE"
                : "DRINK"}{" "}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
