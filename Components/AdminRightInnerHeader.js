import StyleFood from "../styles/AddFood.module.css";
import { BiCurrentLocation } from "react-icons/bi";
import Switch from "react-switch";
import { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { MdMenuOpen } from "react-icons/md";

import { useContext } from "react";
import { AllContext } from "../context/AllContext";
export default function AdminRightInnerHeader(props) {
  const {menuEnableState,setMenuEnableState} = useContext(AllContext);
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(false);

  // refresh page problem fix
  useEffect(() => {
    if (localStorage.getItem("orderStatus")) {
      if (localStorage.getItem("orderStatus") == "true") {
        setChecked(false);
      } else {
        setChecked(true);
      }
    }
  }, []);
  // set on / off after fetching old status from database
  useEffect(() => {
    const gets = async () => {
      setProgress(40);
      const res1 = await fetch(`${HOST}/api/ShowOrderOnOffStatus`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      let data = await res1.json();
      setProgress(100);
      if (data.data) {
        let s = data.data[0].Status;
        if (s == "true") {
          setChecked(false);
        } else {
          setChecked(true);
        }
      }
    };
    gets();
  }, []);
  // update on/off state using toggle button
  const handleChange = () => {
    setChecked(!checked);
    localStorage.setItem("orderStatus", checked);
    const sendData = async () => {
      setProgress(40);
      // fetch Update Data
      const res1 = await fetch(`${HOST}/api/ShowOrderOnOffStatus`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      setProgress(100);
      if (res1.status == 401) {
        toast.error("Please Login With Admin Credentials", {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      let data = await res1.json();

      if (res1.status == 501) {
        toast.error("Internal Server Error", {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      if (res1.status == 404) {
        toast.warn("No Record Found", {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      let id;
      // update status
      if (data.data) {
        id = data.data[0]._id;
        if (data.data[0].Status !== checked) {
          if (!id) {
            toast.warn("Id Not Found", {
              position: "bottom-right",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }
          setProgress(40);
          const res = await fetch(`${HOST}/api/UpdateOnOffStatus`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              Status: checked,
              id: id,
            }),
          });
          setProgress(100);
          if (res.status == 501) {
            toast.error("Internal Server Error", {
              position: "bottom-right",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }
          if (res.status == 400) {
            toast.warn("Status is Empty", {
              position: "bottom-right",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }

          if (checked == true) {
            toast.error("Order Is OFF Now", {
              position: "bottom-right",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Order Is  ON Now", {
              position: "bottom-right",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      }
    };

    sendData();
  };
  return (
    <div className={StyleFood.topHeader}>
      {" "}
      <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />
      {/* heading section */}
      <div className={StyleFood.heading_section}>
      {(menuEnableState)?<i className={StyleFood.Icons} onClick={()=>setMenuEnableState(false)}><MdMenuOpen /></i>:<i className={StyleFood.Icons} onClick={()=>setMenuEnableState(true)}><IoMenuSharp /></i>}
      

        <i className={StyleFood.IconsHide}>
          <BiCurrentLocation />
        </i>
        <h1>{props.title}</h1>
      </div>
      {/* alert */}
      <div className="alert"></div>
      {/* profile */}
      <div className={StyleFood.profile_section}>
        <h1>order controller:</h1>
        <label>
          <Switch
            onChange={handleChange}
            checked={checked}
            className={StyleFood.react_switch}
            offColor="#FF1E1E"
          />
        </label>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
