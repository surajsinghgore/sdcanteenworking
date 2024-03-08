import React, {  useState } from "react";
import StyleFood from "../styles/AddFood.module.css";
import HeadTag from "../Components/Head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from "../Components/PathNavigate";
import AdminRightInnerHeader from "../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from "../pages/admin/VerifyAdminLogin";
import LoadingBar from "react-top-loading-bar";

function AddCategory({ category }) {
  const [progress, setProgress] = useState(0);
  const [itemCategory, setItemCategory] = useState("");
  const addCategory = async (e) => {
    e.preventDefault();

    // if food field is empty
    if (!itemCategory) {
      toast.warn(
        `Please Enter ${
          category == "FoodItem"
            ? "Food"
            : category == "CoffeeItem"
            ? "Coffee"
            : category == "DrinkItem"
            ? "Drink"
            : "Juice"
        } Category Name In The Field`,
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

    setProgress(40);
    const res = await fetch(
      `${HOST}/api/AddItemsCategory?category=${
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
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          itemCategory,
        }),
      }
    );
    let data = await res.json();

    setProgress(100);
    if (res.status == 401) {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(RedirectFunction, 1200);
      function RedirectFunction() {
        router.push("/admin/Login");
      }
    }
    if (data.status == "403") {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(RedirectFunction, 1200);
      function RedirectFunction() {
        router.push("/admin/Login");
      }
      return;
    }
    if (data.status == "501") {
      toast.error(`${data.message}`, {
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
    // empty or not check
    if (data.status == "402") {
      toast.warn(`${data.message}`, {
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
    // duplicate error message
    if (data.status == "400") {
      toast.warn(
        `${itemCategory} Is Already Exists In ${
          category == "FoodItem"
            ? "Food"
            : category == "CoffeeItem"
            ? "Coffee"
            : category == "DrinkItem"
            ? "Drink"
            : "Juice"
        } Category`,
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

    toast.success(
      `${itemCategory} ${
        category == "FoodItem"
          ? "Food"
          : category == "CoffeeItem"
          ? "Coffee"
          : category == "DrinkItem"
          ? "Drink"
          : "Juice"
      } Category Successfully Added`,
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
    setTimeout(RedirectFunction, 1200);
    function RedirectFunction() {
      category == "FoodItem"
        ? router.push("/admin/AllFoodCategories")
        : category == "CoffeeItem"
        ? router.push("/admin/AllCoffeeCategory")
        : category == "DrinkItem"
        ? router.push("/admin/AllDrinkCategory")
        : router.push("/admin/AllJuiceCategory");
    }

    setItemCategory("");
  };

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
          category == "FoodItem"
            ? "Add Food Category"
            : category == "CoffeeItem"
            ? "Add Coffee Category"
            : category == "DrinkItem"
            ? "Add Drink Category"
            : "Add Juice Category"
        }
      />
      <AdminLeftMenu />
      <VerifyAdminLogin />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader
          title={
            category == "FoodItem"
              ? "Add Food Categories"
              : category == "CoffeeItem"
              ? "Add Coffee Categories"
              : category == "JuiceItem"
              ? "Add Juice Categories"
              : "Add Drink Categories"
          }
        />
        {/* <AdminRightInnerHeader title="Add Food Categories" /> */}
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection={
            category == "FoodItem"
              ? "FOOD CATEGORY"
              : category == "CoffeeItem"
              ? "COFFEE CATEGORY"
              : category == "JuiceItem"
              ? "JUICE CATEGORY"
              : "DRINK CATEGORY"
          }
          subsectionURL={
            category == "FoodItem"
              ? "/admin/AllFoodCategories"
              : category == "CoffeeItem"
              ? "/admin/AllCoffeeCategories"
              : category == "JuiceItem"
              ? "/admin/AllJuiceCategories"
              : "/admin/AllDrinkCategories"
          }
          current={
            category == "FoodItem"
              ? "ADD FOOD CATEGORY"
              : category == "CoffeeItem"
              ? "ADD COFFEE CATEGORY"
              : category == "JuiceItem"
              ? "ADD JUICE CATEGORY"
              : "ADD DRINK CATEGORY"
          }
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <form onSubmit={addCategory}>
            <div className={StyleFood.heading}>
              <h1>
                Enter New Categories List For{" "}
                {category == "FoodItem"
                  ? "Food"
                  : category == "CoffeeItem"
                  ? "Coffee"
                  : category == "JuiceItem"
                  ? "Juice"
                  : "Drink"}{" "}
                Website
              </h1>
            </div>
            <div className={StyleFood.form_element}>
              <li style={{width:"100%"}}>
                <p>
                  Enter{" "}
                  {category == "FoodItem"
                    ? "Food"
                    : category == "CoffeeItem"
                    ? "Coffee"
                    : category == "JuiceItem"
                    ? "Juice"
                    : "Drink"}{" "}
                  Category Name <span>*</span>
                </p>
                <input
                  type="text"
                  name="foodName"
              
                  onChange={(e) => setItemCategory(e.target.value)}
                  value={itemCategory}
                />
              </li>

              <button
              
                onClick={addCategory}
              >
                {" "}
                ADD CATEGORY
              </button>
            </div>
          </form>
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

export default AddCategory;
