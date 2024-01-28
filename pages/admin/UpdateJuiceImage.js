import UpdateItemsImage from "../../Components/UpdateItemsImage";
import Styles from "../../styles/admin.module.css";


export default function UpdateJuiceImage() {
  return (
    <div className={Styles.admin}> <UpdateItemsImage category={"JuiceItem"}/>
    </div>
  );
}
