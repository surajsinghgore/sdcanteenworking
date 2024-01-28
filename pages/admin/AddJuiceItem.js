
import Styles from "../../styles/admin.module.css";
import AddItems from "../../Components/AddItems";

export default function AddJuiceItem() {
  return (
    <div className={Styles.admin}>
          <AddItems pageStatus={"JuiceItem"} />
   
    </div>
  );
}
