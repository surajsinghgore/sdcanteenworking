
import Styles from "../../styles/admin.module.css";
import UpdateItemsImage from "../../Components/UpdateItemsImage";

export default function UpdateDrinkImage() {
  return (
    <div className={Styles.admin}><UpdateItemsImage category={"DrinkItem"}/>
    </div>
  );
}
