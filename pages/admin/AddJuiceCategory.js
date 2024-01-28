import Styles from "../../styles/admin.module.css";
import AddCategory from "../../Components/AddCategory";

function AddJuiceCategory() {
 

  return (
    <div className={Styles.admin}>
   <AddCategory category={"JuiceItem"}/>
    </div>
  );
}

export default AddJuiceCategory;
