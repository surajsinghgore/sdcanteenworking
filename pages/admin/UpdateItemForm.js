import Styles from "../../styles/admin.module.css";
import UpdateItemsForm from "../../Components/UpdateItemsForm";

function UpdateFoodItemForm() {
  return (
    <div className={Styles.admin}>
      <UpdateItemsForm category={"FoodItem"} />
    </div>
  );
}

export default UpdateFoodItemForm;
