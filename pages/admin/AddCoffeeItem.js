
import Styles from "../../styles/admin.module.css";
import AddItems from "../../Components/AddItems";

export default function AddCoffeeItem() {

  return (
    <div className={Styles.admin}>
          <AddItems pageStatus={"CoffeeItem"} />
    </div>
  );
}
