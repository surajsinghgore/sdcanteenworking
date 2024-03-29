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
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from './VerifyAdminLogin';
import LoadingBar from "react-top-loading-bar";

function UpdateCoffeeCategory() {
  const { filterAllFoodCategoriesData } = useContext(AllContext);

const [progress, setProgress] = useState(0);
  const [CoffeeCategoryName, setCoffeeCategoryName] = useState("");

  const updateFoodCategory = async () => {
    if (!CoffeeCategoryName) {
      toast.warn("Please Enter Somethig In Coffee Category Name Field", {
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
    let res = await fetch(`${HOST}/api/UpdateCoffeeCategory`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        _id: filterAllFoodCategoriesData,
        CoffeeCategoryName,
      }),
    });
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
      setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        router.push("/admin/Login");
      }
      }
    let dataRes = await res.json();

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
      router.push("/admin/AllCoffeeCategory");
    }
  };

  useEffect(() => {

function check(){
    if ((filterAllFoodCategoriesData[0]==undefined)||(filterAllFoodCategoriesData.length==0)) {
    router.push('/admin/UpdateCoffeeCategory')
    
    }
    
    
    else  {
      setCoffeeCategoryName(filterAllFoodCategoriesData[0].CoffeeCategoryName);
    }
}
   
setTimeout(check(),1200)


  }, [filterAllFoodCategoriesData]);

  return (
    <div className={Styles.admin}>     <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  


      <HeadTag title="Update Coffee Category" />
      
<VerifyAdminLogin />

      <AdminLeftMenu />
      
      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Food Categories" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Coffee Category"
          subsectionURL="/admin/AllCoffeeCategory"
          current="UPDATE COFFEE CATEGORY"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Update Categories Name For Coffee </h1>
          </div>
          <div className={StyleFood.form_element}>
            <li >
              <p>
                Enter Coffee Category Name <span>*</span>
              </p>
              <input
                type="text"
                name="foodName"
        
                onChange={(e) => setCoffeeCategoryName(e.target.value)}
                value={CoffeeCategoryName}
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

export default UpdateCoffeeCategory;
