import React, { useContext,useState, useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import VerifyAdminLogin from './VerifyAdminLogin';
import LoadingBar from "react-top-loading-bar";
import Switch from "react-switch";

import { AllContext } from "../../context/AllContext";
import Link from "next/link";
import UpdateItemsForm from "../../Components/UpdateItemsForm";
let HOST = process.env.NEXT_PUBLIC_API_URL;


 function UpdateFoodItemForm() {const [progress, setProgress] = useState(0);
  const { filterFoodItemsData ,updateFoodItem} = useContext(AllContext);
 const [checked, setChecked] = useState(true);
   const [normalPrice, setNormalPrice] = useState(0);
const [normalPriceName,setNormalPriceName]=useState("Normal Price")
  const [mediumPrice, setMediumPrice] = useState(0);
  const [mediumPriceName, setMediumPriceName] = useState("Medium Price");
  const [smallPrice, setSmallPrice] = useState(0);
  const [smallPriceName, setSmallPriceName] = useState("Half Price");
  const [largePrice, setLargePrice] = useState(0);
  const [largePriceName, setLargePriceName] = useState("Large Price");
  const [data, setData] = useState([]);
  const [FoodName, setFoodName] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();
  const [description, setDescription] = useState("");
  
  const send=()=>{

   if (filterFoodItemsData.datas!=undefined||filterFoodItemsData.datas!=null) {  
      setFoodName(filterFoodItemsData.datas.FoodName);
      setQtys(filterFoodItemsData.datas.Qty);
      setCategory(filterFoodItemsData.datas.Category);
               setDescription(filterFoodItemsData.datas.Description)
if(filterFoodItemsData.datas.Active=="ON"){
setChecked(true)
}
else{
setChecked(false)
}

if(filterFoodItemsData.normal!=null){setNormalPrice(parseInt(filterFoodItemsData.normal))}else{setNormalPrice("")}
if(filterFoodItemsData.medium!=null){setMediumPrice(parseInt(filterFoodItemsData.medium))}else{
setMediumPrice("")
}
if(filterFoodItemsData.large!=null){setLargePrice(parseInt(filterFoodItemsData.large))}else{
setLargePrice("")
}
if(filterFoodItemsData.small!=null){setSmallPrice(parseInt(filterFoodItemsData.small))}else{
setSmallPrice("")
}
   }
    // else{
    //   router.push('/admin/UpdateFoodItem')
    //     return;
    
    // }
  }
  useEffect(() => {
 
send();
   setProgress(40)
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowFoodCategory`);
      let datas = await ress.json();
      await setData(datas.data); setProgress(100)
    }
    dataFetch();
 },[filterFoodItemsData]);




  const handleChanges=()=>{
  setChecked(!checked)
  }

  
  const updateItems = async () => {
  
     if (!FoodName) {
      toast.warn("Please Enter Food Name", {
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
      return ;
    }
 if (!Category) {
      toast.warn("Please Enter Category of Item", {
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
 if (Category=="no") {
      toast.warn("Please Select Category of Item", {
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
// normal Prize Get
if((smallPrice=="")&&(mediumPrice=="")&&(largePrice=="")){
if(normalPrice==""){
   toast.warn("Please Enter Atleast Normal Price Of Item", {
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
}


if((smallPrice!="")||(mediumPrice!="")||(largePrice!="")){
if(normalPrice!=""){
   toast.warn("Please Enter Only Normal Price or Different Size Price", {
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
}
if(parseInt(smallPrice)<=0 || parseInt(mediumPrice)<=0 || parseInt(largePrice)<=0 || parseInt(normalPrice)<=0){
toast.warn("Price Not Be Zero Or Below Zero", {
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

let active;
if(checked==true){
active="ON"
}
else{
active="OFF"
}

 setProgress(40)
    let response = await fetch(`${HOST}/api/UpdateFoodItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        
      },
      body: JSON.stringify({
        _id: filterFoodItemsData.datas._id,
        FoodName: FoodName,
        Qty: Qtys,
        Category: Category,
          Description:description ,largesize:largePrice,mediumsize:mediumPrice,
          Active:active,normalsize:normalPrice,halfsize:smallPrice,
      }),
    });
  
  let datas=await response.json(); setProgress(100)
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
  
    if (response.status == 204) {
      toast.error(`${datas.message}`, {
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
    if (response.status == 409) {
      toast.warn(`${datas.message}`, {
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
      return ;
    }
   if (response.status == 404) {
      toast.warn(`${datas.message}`, {
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
    if (response.status == 201) {
      toast.success(`${FoodName} is Successfully Added`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      updateFoodItem(filterFoodItemsData.datas._id)
        setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        router.push("/admin/UpdateFoodItem");
      }
    }
  };

  return (
    <div className={Styles.admin}> 
    <UpdateItemsForm category={"FoodItem"}/>
    </div>
  );
}


export default  UpdateFoodItemForm;