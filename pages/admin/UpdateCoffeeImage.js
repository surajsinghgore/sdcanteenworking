
import Styles from "../../styles/admin.module.css";
import UpdateItemsImage from "../../Components/UpdateItemsImage";

function UpdateCoffeeImage() {

  return (
    <div className={Styles.admin}>
    <UpdateItemsImage category={"CoffeeItem"}/>
    </div>
  );
}


export default  UpdateCoffeeImage;

