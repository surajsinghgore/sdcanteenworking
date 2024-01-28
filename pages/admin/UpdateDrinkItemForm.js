import Styles from "../../styles/admin.module.css";
import UpdateItemsForm from "../../Components/UpdateItemsForm";

export default function UpdateDrinkItemForm() {
  return (
    <div className={Styles.admin}>
      {" "}
      <UpdateItemsForm category={"DrinkItem"} />
    </div>
  );
}
