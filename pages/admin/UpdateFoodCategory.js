import React, { useEffect, useState, useContext } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { AllContext } from "../../context/AllContext";
import VerifyAdminLogin from './VerifyAdminLogin';
import LoadingBar from "react-top-loading-bar";
let HOST = process.env.NEXT_PUBLIC_API_URL;
function UpdateFoodCategory() {const [progress, setProgress] = useState(0);
  const { filterAllFoodCategoriesData } = useContext(AllContext);

  const [FoodCategoryName, setFoodCategoryName] = useState("");

  const updateFoodCategory = async () => {
    if (!FoodCategoryName) {
      toast.warn("Please Enter Somethig In Food Category Name Field", {
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
    let res = await fetch(`${HOST}/api/UpdateFoodCategory`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
       
      },
      body: JSON.stringify({
        _id: filterAllFoodCategoriesData,
        FoodCategoryName,
      }),
    });

    let dataRes = await res.json();setProgress(100)
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
      setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        router.push("/admin/Login");
      }
      }
    if (dataRes.status == "403") {
      toast.error("Please Login With Admin Credentials", {
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
    if (dataRes.status == "400") {
      toast.warn(`${dataRes.message}`, {
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

    if (dataRes.status == "501") {
      toast.error(`${dataRes.message}`, {
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

    toast.success(`${dataRes.message}`, {
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
      router.push("/admin/AllFoodCategories");
    }
  };

  useEffect(() => {


function check(){
    if ((filterAllFoodCategoriesData[0]==undefined)||(filterAllFoodCategoriesData.length==0)) {
   router.push('/admin/UpdateFoodCategory')
    
    }
    
    
    else  {
      setFoodCategoryName(filterAllFoodCategoriesData[0].FoodCategoryName);
    }
}
   
setTimeout(check(),1200)
  }, [filterAllFoodCategoriesData]);

  return (
    <div className={Styles.admin}> <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  


      <HeadTag title="Update Food Category" />
<VerifyAdminLogin />
      <AdminLeftMenu />
      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Food Categories" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Food Category"
          subsectionURL="/admin/AllFoodCategories"
          current="UPDATE FOOD CATEGORY"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Update Categories Name For Food</h1>
          </div>
          <div className={StyleFood.form_element}>
            <li>
              <p>
                Enter Food Category Name <span>*</span>
              </p>
              <input
                type="text"
                name="foodName"
      
                onChange={(e) => setFoodCategoryName(e.target.value)}
                value={FoodCategoryName}
              />
            </li>

            <button
     
              onClick={updateFoodCategory}
            >
              {" "}
              UPDATE CATEGORY
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

export default UpdateFoodCategory;
