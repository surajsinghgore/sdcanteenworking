
import Styles from "../../styles/admin.module.css";

import UpdateItemsImage from "../../Components/UpdateItemsImage";
export default function UpdateFoodImage() {

  return (
    <div className={Styles.admin}>
    
    <UpdateItemsImage category={"FoodItem"}/>
    </div>
  );
}

