
import Styles from "../../styles/admin.module.css";
import UpdateItemsForm from "../../Components/UpdateItemsForm";

export default function UpdateJuiceItemForm() {

  return (
    <div className={Styles.admin}><UpdateItemsForm category={"JuiceItem"} />
    </div>
  );
}
