import React, { useContext, useState, useEffect } from "react";
import StyleFood from "../styles/AddFood.module.css";
import HeadTag from "./Head";
import AdminLeftMenu from "./AdminLeftMenu";
import PathNavigate from "./PathNavigate";
import AdminRightInnerHeader from "./AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import VerifyAdminLogin from "../pages/admin/VerifyAdminLogin";
import LoadingBar from "react-top-loading-bar";
import Switch from "react-switch";

import { AllContext } from "../context/AllContext";
import Link from "next/link";
let HOST = process.env.NEXT_PUBLIC_API_URL;

function UpdateItemsForm({ category }) {
  const [progress, setProgress] = useState(0);
  const {
    filterCoffeeItemsData,
    updateCoffeeItem,
    filterFoodItemsData,
    updateFoodItem,filterDrinkItemsData,updateDrinkItem,
    filterJuiceItemsData,
    updateJuiceItem,
  } = useContext(AllContext);
  const [checked, setChecked] = useState(true);
  const [normalPrice, setNormalPrice] = useState(0);
  const [normalPriceName, setNormalPriceName] = useState("Normal Size Price");
  const [mediumPrice, setMediumPrice] = useState(0);
  const [mediumPriceName, setMediumPriceName] = useState("Medium Size Price");
  const [smallPrice, setSmallPrice] = useState(0);
  const [smallPriceName, setSmallPriceName] = useState(
    category == "FoodItem" ? "Half Size Price" : "Small Size Price"
  );
  const [largePrice, setLargePrice] = useState(0);
  const [largePriceName, setLargePriceName] = useState("Large Size Price");
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();
  const [description, setDescription] = useState("");

  const send = () => {
    // food Items Load
    if(category=="FoodItem"){
    if (filterFoodItemsData.datas != undefined ||
      filterFoodItemsData.datas != null) {
      
        
           setItemName(filterFoodItemsData.datas.FoodName)
        
      setQtys(filterFoodItemsData.datas.Qty);
      setCategory(filterFoodItemsData.datas.Category);
      setDescription(filterFoodItemsData.datas.Description);
      if (filterFoodItemsData.datas.Active == "ON") {
        setChecked(true);
      } else {
        setChecked(false);
      }

      if (filterFoodItemsData.normal != null) {
        setNormalPrice(parseInt(filterFoodItemsData.normal));
      } else {
        setNormalPrice("");
      }
      if (filterFoodItemsData.medium != null) {
        setMediumPrice(parseInt(filterFoodItemsData.medium));
      } else {
        setMediumPrice("");
      }
      if (filterFoodItemsData.large != null) {
        setLargePrice(parseInt(filterFoodItemsData.large));
      } else {
        setLargePrice("");
      }
      if (filterFoodItemsData.half != null) {
        setSmallPrice(parseInt(filterFoodItemsData.half));
      } else {
        setSmallPrice("");
      }
    } }
    // juice item
    else if(category=="JuiceItem"){
      if (filterJuiceItemsData.datas != undefined ||
        filterJuiceItemsData.datas != null) {
        
          
             setItemName(filterJuiceItemsData.datas.JuiceName)
          
        setQtys(filterJuiceItemsData.datas.Qty);
        setCategory(filterJuiceItemsData.datas.Category);
        setDescription(filterJuiceItemsData.datas.Description);
        if (filterJuiceItemsData.datas.Active == "ON") {
          setChecked(true);
        } else {
          setChecked(false);
        }
  
        if (filterJuiceItemsData.normal != null) {
          setNormalPrice(parseInt(filterJuiceItemsData.normal));
        } else {
          setNormalPrice("");
        }
        if (filterJuiceItemsData.medium != null) {
          setMediumPrice(parseInt(filterJuiceItemsData.medium));
        } else {
          setMediumPrice("");
        }
        if (filterJuiceItemsData.large != null) {
          setLargePrice(parseInt(filterJuiceItemsData.large));
        } else {
          setLargePrice("");
        }
        if (filterJuiceItemsData.small != null) {
          setSmallPrice(parseInt(filterJuiceItemsData.small));
        } else {
          setSmallPrice("");
        }
      }
      
    }
    // coffee item
    else if(category=="CoffeeItem"){ 
      if (filterCoffeeItemsData.datas != undefined ||
      filterCoffeeItemsData.datas != null) {
      
        
           setItemName(filterCoffeeItemsData.datas.CoffeeName)
        
      setQtys(filterCoffeeItemsData.datas.Qty);
      setCategory(filterCoffeeItemsData.datas.Category);
      setDescription(filterCoffeeItemsData.datas.Description);
      if (filterCoffeeItemsData.datas.Active == "ON") {
        setChecked(true);
      } else {
        setChecked(false);
      }

      if (filterCoffeeItemsData.normal != null) {
        setNormalPrice(parseInt(filterCoffeeItemsData.normal));
      } else {
        setNormalPrice("");
      }
      if (filterCoffeeItemsData.medium != null) {
        setMediumPrice(parseInt(filterCoffeeItemsData.medium));
      } else {
        setMediumPrice("");
      }
      if (filterCoffeeItemsData.large != null) {
        setLargePrice(parseInt(filterCoffeeItemsData.large));
      } else {
        setLargePrice("");
      }
      if (filterCoffeeItemsData.small != null) {
        setSmallPrice(parseInt(filterCoffeeItemsData.small));
      } else {
        setSmallPrice("");
      }
    }}
    // drink item
    else if(category=="DrinkItem"){
      if (filterDrinkItemsData.datas != undefined ||
        filterDrinkItemsData.datas != null) {
        
          
             setItemName(filterDrinkItemsData.datas.DrinkName)
          
        setQtys(filterDrinkItemsData.datas.Qty);
        setCategory(filterDrinkItemsData.datas.Category);
        setDescription(filterDrinkItemsData.datas.Description);
        if (filterDrinkItemsData.datas.Active == "ON") {
          setChecked(true);
        } else {
          setChecked(false);
        }
  
        if (filterDrinkItemsData.normal != null) {
          setNormalPrice(parseInt(filterDrinkItemsData.normal));
        } else {
          setNormalPrice("");
        }
        if (filterDrinkItemsData.medium != null) {
          setMediumPrice(parseInt(filterDrinkItemsData.medium));
        } else {
          setMediumPrice("");
        }
        if (filterDrinkItemsData.large != null) {
          setLargePrice(parseInt(filterDrinkItemsData.large));
        } else {
          setLargePrice("");
        }
        if (filterDrinkItemsData.small != null) {
          setSmallPrice(parseInt(filterDrinkItemsData.small));
        } else {
          setSmallPrice("");
        }
      }

    }
  };
  useEffect(() => {
    send();
    setProgress(40);
    async function dataFetch() {
      let ress = await fetch(
        `${HOST}/api/ShowCategory?category=${
          category == "FoodItem"
            ? "food"
            : category == "CoffeeItem"
            ? "coffee"
            : category == "DrinkItem"
            ? "drink"
            : "juice"
        }`
      );
      let datas = await ress.json();
      await setData(datas.data);
      setProgress(100);
    }
    dataFetch();
  }, [filterFoodItemsData,filterCoffeeItemsData,filterDrinkItemsData,filterJuiceItemsData]);

  const handleChanges = () => {
    setChecked(!checked);
  };

  const updateItems = async () => {
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
      return;
    }
    if (Category == "no") {
      toast.warn("Please Select Category of Item", {
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
    // normal Prize Get
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

    if (smallPrice != "" || mediumPrice != "" || largePrice != "") {
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

    let active;
    if (checked == true) {
      active = "ON";
    } else {
      active = "OFF";
    }

    setProgress(40);

    // food Item Update
    if (category == "FoodItem") {
      let response = await fetch(`${HOST}/api/UpdateFoodItem`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: filterFoodItemsData.datas._id,
          FoodName: itemName,
          Qty: Qtys,
          Category: Category,
          Description: description,
          largesize: largePrice,
          mediumsize: mediumPrice,
          Active: active,
          normalsize: normalPrice,
          halfprice: smallPrice,
        }),
      });

      let datas = await response.json();
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
        return;
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
        return;
      }
      if (response.status == 201) {
        toast.success(`${itemName} is Successfully Addeds`, {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // setTimeout(RedirectFunction, 1500);
        // function RedirectFunction() {
        console.log("success");
        updateFoodItem(filterFoodItemsData.datas._id);
        router.push("/admin/UpdateFoodItem");
        // }
      }
    }
    // coffee item update
    else if (category == "CoffeeItem") {
      let response = await fetch(`${HOST}/api/UpdateCoffeeItem`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: filterCoffeeItemsData.datas._id,
          CoffeeName: itemName,
          Qty: Qtys,
          Category: Category,
          Description: description,
          largesize: largePrice,
          mediumsize: mediumPrice,
          Active: active,
          normalsize: normalPrice,
          smallsize: smallPrice,
        }),
      });
      setProgress(100);

      let datas = await response.json();
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
        return;
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
        return;
      }
      if (response.status == 201) {
        toast.success(`${itemName} is Successfully Added`, {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/admin/UpdateCoffeeItem");
        updateCoffeeItem(filterCoffeeItemsData.datas._id);
      }
    }

    // drink item update
    else if (category == "DrinkItem") {
      let response = await fetch(`${HOST}/api/UpdateDrinkItem`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: filterDrinkItemsData.datas._id,
          DrinkName: itemName,
          Qty: Qtys,
          Category: Category,
          Description: description,
          largesize: largePrice,
          mediumsize: mediumPrice,
          Active: active,
          normalsize: normalPrice,
          smallsize: smallPrice,
        }),
      });

      let datas = await response.json();
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
        return;
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
        return;
      }
      if (response.status == 201) {
        toast.success(`${itemName} is Successfully Added`, {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/admin/UpdateDrinkItem");
        updateDrinkItem(filterDrinkItemsData.datas._id);
      }
    }
    // juice item update
    else if (category == "JuiceItem") {
      let response = await fetch(`${HOST}/api/UpdateJuiceItem`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: filterJuiceItemsData.datas._id,
          JuiceName: itemName,
          Qty: Qtys,
          Category: Category,
          Description: description,
          largesize: largePrice,
          mediumsize: mediumPrice,
          Active: active,
          normalsize: normalPrice,
          smallsize: smallPrice,
        }),
      });

      let datas = await response.json();
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
        return;
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
        return;
      }
      if (response.status == 201) {
        toast.success(`${itemName} is Successfully Added`, {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/admin/UpdateJuiceItem");
        updateJuiceItem(filterJuiceItemsData.datas._id);
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
            ? "Update Food Item Form"
            : category == "CoffeeItem"
            ? "Update Coffee Item Form"
            : category == "DrinkItem"
            ? "Update Drink Item Form"
            : "Update Juice Item Form"
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
              ? "Update Food Item Page"
              : category == "CoffeeItem"
              ? "Update Coffee Item Page"
              : category == "JuiceItem"
              ? "Update Juice Item Page"
              : "Update Drink Item Page"
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
              ? "UPDATE FOOD ITEM GENERAL DATA"
              : category == "CoffeeItem"
              ? "UPDATE COFFEE ITEM GENERAL DATA"
              : category == "JuiceItem"
              ? "UPDATE JUICE ITEM GENERAL DATA"
              : "UPDATE DRINK ITEM GENERAL DATA"
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
              Item For Website
            </h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                {category == "FoodItem" ? (
                  <Link href="/admin/UpdateFoodImage">
                    <a>Click Here To Change Food Item Image</a>
                  </Link>
                ) : category == "CoffeeItem" ? (
                  <Link href="/admin/UpdateCoffeeImage">
                    <a> Click Here To Change Coffee Item Image</a>
                  </Link>
                ) : category == "DrinkItem" ? (
                  <Link href="/admin/UpdateDrinkImage">
                    <a> Click Here To Change Drink Item Image</a>
                  </Link>
                ) : (
                  <Link href="/admin/UpdateJuiceImage">
                    <a> Click Here To Change Juice Item Image</a>
                  </Link>
                )}
              </h3>
            </div>
            <li>
              <p>
                Enter{" "}
                {category == "FoodItem"
                  ? "Food"
                  : category == "CoffeeItem"
                  ? "Coffee"
                  : category == "JuiceItem"
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
                {category == "FoodItem"
                  ? "Food"
                  : category == "CoffeeItem"
                  ? "Coffee"
                  : category == "JuiceItem"
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
                {category == "FoodItem"
                  ? "Food"
                  : category == "CoffeeItem"
                  ? "Coffee"
                  : category == "JuiceItem"
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
                    {data.map((item) => {
                      return (
                        <option
                          value={
                            category == "FoodItem"
                              ? item.FoodCategoryName
                              : category == "CoffeeItem"
                              ? item.CoffeeCategoryName
                              : category == "JuiceItem"
                              ? item.JuiceCategoryName
                              : item.DrinkCategoryName
                          }
                          key={item._id}
                        >
                          {category == "FoodItem"
                            ? item.FoodCategoryName
                            : category == "CoffeeItem"
                            ? item.CoffeeCategoryName
                            : category == "JuiceItem"
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

            {category == "FoodItem" ? (
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
            <li className={StyleFood.btns}>
              <p>Product Visibility Status </p>
              <Switch
                onChange={handleChanges}
                checked={checked}
                className={StyleFood.react_switch1}
                offColor="#FF1E1E"
              />
            </li>
            <button onClick={updateItems}>
              UPDATE{" "}
              {category == "FoodItem"
                ? "FOOD"
                : category == "CoffeeItem"
                ? "COFFEE"
                : category == "JuiceItem"
                ? "JUICE"
                : "DRINK"}
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

export default UpdateItemsForm;
