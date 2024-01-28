import Styles from "../../styles/admin.module.css";
import AddCategory from "../../Components/AddCategory";

function AddDrinkCategory() {

  return (
    <div className={Styles.admin}>
    <AddCategory category={"DrinkItem"}/>
    </div>
  );
}

export default AddDrinkCategory;
