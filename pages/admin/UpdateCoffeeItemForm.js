
import Styles from "../../styles/admin.module.css";
import UpdateItemsForm from "../../Components/UpdateItemsForm";
 function UpdateCoffeeItemForm() {



  return (
    <div className={Styles.admin}><UpdateItemsForm category={"CoffeeItem"} />
    </div>
  );
}

export default UpdateCoffeeItemForm