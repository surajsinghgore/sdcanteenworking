import AdminLeftPenelComponents from "./AdminLeftPenelComponents";
import Styles from "../styles/admin.module.css";

import { useContext } from "react";
import { AllContext } from "../context/AllContext";
// image logo
let logo = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014809/ClientImages/logo_l0f3ug.png`;
import Image from "next/image";
import DataList from "../Data/DataList";
import "react-toastify/dist/ReactToastify.css";
export default function AdminLeftMenu() {
  const { menuEnableState,setMenuEnableState } = useContext(AllContext);

  return (
    <>
      {menuEnableState ? (
        <div className={Styles.leftPanel}>
          <div className={Styles.logo_img}>
            <Image src={logo} layout="fill" alt="logo " />
          </div>

          <div className={Styles.menu_Links}>
            {DataList.map((item) => (
              <AdminLeftPenelComponents item={item} key={item.id} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
