import React, { useEffect, useState } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from './VerifyAdminLogin';
import LoadingBar from "react-top-loading-bar";

function AddFoodCategory() {

const [progress, setProgress] = useState(0);
  const [FoodCategoryName, setFoodCategoryName] = useState("");
  const addCategory = async (e) => {
    // if food field is empty
    if (!FoodCategoryName) {
      toast.warn("Please Enter Food Category Name In The Field", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }

 setProgress(40)
    const res = await fetch(`${HOST}/api/AddFoodCategory`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        FoodCategoryName,
      }),
    });
    let data = await res.json();

 setProgress(100)
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
      return ;
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
      return ;
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
      return ;
    }
    // dublicate error message
    if (data.status == "400") {
      toast.warn(`${FoodCategoryName} Is Already Exists In Food Category`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }

    toast.success(`${FoodCategoryName} Food Category Successfully Added`, {
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
      router.push("/admin/AllFoodCategories");
    }

    setFoodCategoryName("");
  };

  return (
    <div className={Styles.admin}>
      <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
      <HeadTag title="Add Food Category" />
      <AdminLeftMenu />
      <VerifyAdminLogin />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Food Categories" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Food Category"
          subsectionURL="/admin/AllFoodCategories"
          current="ADD FOOD CATEGORY"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Categories List For Food Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <li style={{ width: "90%" }}>
              <p>
                Enter Food Category Name <span>*</span>
              </p>
              <input
                type="text"
                name="foodName"
                style={{ width: "95%" }}
                onChange={(e) => setFoodCategoryName(e.target.value)}
                value={FoodCategoryName}
              />
            </li>

            <button
              style={{ marginTop: "4%", marginLeft: "6%" }}
              onClick={addCategory}
            >
              {" "}
              ADD CATEGORY
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
    </div>
  );
}

export default AddFoodCategory;
