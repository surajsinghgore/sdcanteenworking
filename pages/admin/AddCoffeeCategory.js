import Styles from "../../styles/admin.module.css";
import AddCategory from "../../Components/AddCategory";

export default function AddCoffeeCategory() {


  return (
    <div className={Styles.admin}>
     <AddCategory category={"CoffeeItem"}/>
    </div>
  );
}

