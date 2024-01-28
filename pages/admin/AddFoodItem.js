import Styles from "../../styles/admin.module.css";

import AddItems from "../../Components/AddItems";

export default function AddFoodItem() {
  return (
    <div className={Styles.admin}>
      <AddItems pageStatus={"FoodItem"} />
    </div>
  );
}
