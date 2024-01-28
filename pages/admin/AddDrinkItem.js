
import Styles from "../../styles/admin.module.css";
import AddItems from "../../Components/AddItems";

export default function AddDrinkItem() {

  return (
    <div className={Styles.admin}>
          <AddItems pageStatus={"DrinkItem"} />
   
    </div>
  );
}
