
import Styles from "../../styles/admin.module.css";
import AddCategory from "../../Components/AddCategory";

function AddFoodCategory() {

  return (
    <div className={Styles.admin}>
     <AddCategory category={"FoodItem"}/>
    </div>
  );
}

export default AddFoodCategory;
