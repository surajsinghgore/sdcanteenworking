import React, { useContext, useState, useEffect } from "react";
import StyleFood from "../styles/AddFood.module.css";
import HeadTag from "../Components/Head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from "../Components/PathNavigate";
import AdminRightInnerHeader from "../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from "../pages/admin/VerifyAdminLogin";

import router from "next/router";
import { AllContext } from "../context/AllContext";

import Image from "next/image";
import LoadingBar from "react-top-loading-bar";
export default function UpdateItemsImage({ category }) {
  const [progress, setProgress] = useState(0);
  const {
    filterFoodItemsData,
    filterCoffeeItemsData,

    filterDrinkItemsData,

    filterJuiceItemsData,
  } = useContext(AllContext);
  const [imgs, setImgs] = useState();
  const [files, setFiles] = useState("");

  useEffect(() => {
    // load data of food
    if (filterFoodItemsData.datas != undefined && category == "FoodItem") {
      setImgs(filterFoodItemsData.datas.Image);
    }
    // load data of coffee
    else if (
      filterCoffeeItemsData.datas != undefined &&
      category == "CoffeeItem"
    ) {
      setImgs(filterCoffeeItemsData.datas.Image);
    }
    // load data of juice
    else if (
      filterJuiceItemsData.datas != undefined &&
      category == "JuiceItem"
    ) {
      setImgs(filterJuiceItemsData.datas.Image);
    }
    // load data of drink
    else if (
      filterDrinkItemsData.datas != undefined &&
      category == "DrinkItem"
    ) {
      setImgs(filterDrinkItemsData.datas.Image);
    } else {
      router.back();
    }
  }, [
    filterFoodItemsData,
    filterJuiceItemsData,
    filterDrinkItemsData,
    filterCoffeeItemsData,
  ]);
  // images handle
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      var file = e.target.files[0];
      setFiles(file);
      let url = await URL.createObjectURL(file);
      setImgs(url);
    }
  };

  const updateImage = async (e) => {
    e.preventDefault();

    const dataImage = new FormData();

    // load data of food
    if (category == "FoodItem" && filterFoodItemsData.datas != undefined) {
      dataImage.append("_id", filterFoodItemsData.datas._id);
    }
    // load data of coffee
    else if (
      category == "CoffeeItem" &&
      filterCoffeeItemsData.datas != undefined
    ) {
      dataImage.append("_id", filterCoffeeItemsData.datas._id);
    }
    // load data of juice
    else if (
      category == "JuiceItem" &&
      filterJuiceItemsData.datas != undefined
    ) {
      dataImage.append("_id", filterJuiceItemsData.datas._id);
    }
    // load data of drink
    else if (
      category == "DrinkItem" &&
      filterDrinkItemsData.datas != undefined
    ) {
      dataImage.append("_id", filterDrinkItemsData.datas._id);
    }

    dataImage.append("Image", files);

    if (!files) {
      toast.warn("Please Upload New Photo To Change", {
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

    let response = await fetch(
      `${HOST}/api/UpdateItemsImage?category=${
        category == "FoodItem"
          ? "food"
          : category == "CoffeeItem"
          ? "coffee"
          : category == "DrinkItem"
          ? "drink"
          : "juice"
      }`,
      {
        method: "POST",
        body: dataImage,
      }
    );
    setProgress(100);
    if (response.status == 401) {
      toast.error("Please Login With Admin Credentials", {
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
        router.push("/admin/Login");
      }
    }
    if (response.status === 500) {
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
    let datas = await response.json();
    if (response.status == 501) {
      toast.error(`${datas.message}`, {
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
    if (response.status == 400) {
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

    if (response.status == 201) {
      toast.success(`Image Successfully Updated`, {
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
        category == "FoodItem"
          ? router.push("/admin/UpdateFoodItem")
          : category == "CoffeeItem"
          ? router.push("/admin/UpdateCoffeeItem")
          : category == "DrinkItem"
          ? router.push("/admin/UpdateDrinkItem")
          : router.push("/admin/UpdateJuiceItem");
      }
    }
  };

  return (
    <>
      {" "}
      <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />
      <HeadTag
        title={
          category == "FoodItem"
            ? "Update Food Item Image"
            : category == "CoffeeItem"
            ? "Update Coffee Item Image"
            : category == "DrinkItem"
            ? "Update Drink Item Image"
            : "Update Juice Item Image"
        }
      />
      <VerifyAdminLogin />
      {/* left panel bar */}
      <AdminLeftMenu />
      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader
          title={
            category == "FoodItem"
              ? "Update Food Item Image"
              : category == "CoffeeItem"
              ? "Update Coffee Item Image"
              : category == "JuiceItem"
              ? "Update Juice Item Image"
              : "Update Drink Item Image"
          }
        />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection={
            category == "FoodItem"
              ? "Update Food Item"
              : category == "CoffeeItem"
              ? "Update Coffee Item"
              : category == "JuiceItem"
              ? "Update Juice Item"
              : "Update Drink Item"
          }
          subsectionURL={
            category == "FoodItem"
              ? "/admin/UpdateFoodItem"
              : category == "CoffeeItem"
              ? "/admin/UpdateCoffeeItem"
              : category == "JuiceItem"
              ? "/admin/UpdateJuiceItem"
              : "/admin/UpdateDrinkItem"
          }
          current={
            category == "FoodItem"
              ? "UPDATE FOOD ITEM IMAGE"
              : category == "CoffeeItem"
              ? "UPDATE COFFEE ITEM IMAGE"
              : category == "JuiceItem"
              ? "UPDATE JUICE ITEM IMAGE"
              : "UPDATE DRINK ITEM IMAGE"
          }
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>
              Enter New{" "}
              {category == "FoodItem"
                ? "Food"
                : category == "CoffeeItem"
                ? "Coffee"
                : category == "JuiceItem"
                ? "Juice"
                : "Drink"}{" "}
              Image For Website
            </h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <span
                  onClick={() => router.back()}
                  style={{ cursor: "pointer" }}
                >
                  <a>
                    Click Here To Change{" "}
                    {category == "FoodItem"
                      ? "Food"
                      : category == "CoffeeItem"
                      ? "Coffee"
                      : category == "JuiceItem"
                      ? "Juice"
                      : "Drink"}{" "}
                    General Details
                  </a>
                </span>
              </h3>
            </div>
            <li>
              <p>
                Upload Food Photo <span>*</span>
              </p>
              <input
                type="file"
                name="photo"
                id="photoFood"
                onChange={handleChange}
              />
            </li>
            <li>
              <p>Photo Realtime Preview</p>
              <div className={StyleFood.preview_photo}>
                <div className={StyleFood.uploadImage}>
                  <Image
                    src={imgs}
                    alt="item images"
                    id="output"
                    layout="fill"
                  />
                </div>
              </div>
            </li>
            <button onClick={updateImage}> UPDATE IMAGE</button>
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
