import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import style from "../styles/PastOrder.module.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Loader from "../Components/Loader";
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PastOrder() {
const [data,setData]=useState([]);
const [temp,setTemp]=useState([]);
const [loader,setLoader]=useState(true);
 const [totalOrderLen, setTotalOrderLen] = useState(0);
const [all,setAll]=useState(true)
const [com,setCom]=useState(false)
const [rej,setRej]=useState(false)
const [pen,setPen]=useState(false)

useEffect(()=>{
   setLoader(true);
const fetchOrder=async()=>{
let ress = await fetch(`${HOST}/api/ShowAllOrderClient`);

              let datas=await ress.json();
if(datas.data!=undefined){

              setData(datas.data)

              setTemp(datas.data)
                setTotalOrderLen(datas.data.length)
                setLoader(false);
}
}
fetchOrder();
},[])
const comData=()=>{
setLoader(true)
let filterData=temp.filter((items)=>{
return items.OrderStatus.toLowerCase()=="complete";
})
setTotalOrderLen(filterData.length)
setData(filterData);
setPen(false);
setAll(false);
setRej(false);
setCom(true);
const loaderOff=()=>{
setLoader(false)
}
setTimeout(loaderOff,300);

}
const rejData=()=>{
setLoader(true)
let filterData=temp.filter((items)=>{
return items.OrderStatus.toLowerCase()=="reject";
})
setTotalOrderLen(filterData.length)
setData(filterData);
setPen(false);
setAll(false);
setRej(true);
setCom(false);
const loaderOff=()=>{
setLoader(false)
}
setTimeout(loaderOff,300);

}
const pendData=()=>{
setLoader(true)
let filterData=temp.filter((items)=>{
return items.OrderStatus.toLowerCase()=="pending";
})
setData(filterData);
setTotalOrderLen(filterData.length)
setPen(true);
setAll(false);
setRej(false);
setCom(false);
const loaderOff=()=>{
setLoader(false)
}
setTimeout(loaderOff,300);
}
const allData=()=>{
setLoader(true)
setTotalOrderLen(temp.length)
setData(temp);
setPen(false);
setAll(true);
setRej(false);
setCom(false);
const loaderOff=()=>{
setLoader(false)
}
setTimeout(loaderOff,300);
}
// copy to clipboard 
function copy(text){
  navigator.clipboard.writeText(text);
  toast.success(`${text} copy to clipboard`, {
    position: "bottom-right",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}
  return (
    <>
<Loader loader={loader}/>
    <VerifyClientMiddleware />
      <div className={Styles.admin}>
        <HeadTag title="Order Placed" />
        <Header />
      </div>
    <div className={style.AllOrder}>
   {/* top section */}
    <div className={style.topSection}>
  <h1>All Order&#39;s Details</h1>
  <h2>Total Order Placed <span>{totalOrderLen}</span></h2>
</div>
{/* filter section */}
    <div className={style.filter}>
<li className={(all)? style.active:""} onClick={allData}>   {(all)? <hr/>:""}All Orders</li>
<li className={(com)? style.active:""} onClick={comData}>{(com)? <hr/>:""}Complete Order</li>
<li className={(rej)? style.active:""} onClick={rejData}>{(rej)? <hr/>:""}Reject Order</li>
<li className={(pen)? style.active:""} onClick={pendData}>{(pen)? <hr/>:""}Pending Order</li>
    </div>

{/* data heading */}
<div className={style.data}>
{(data!=undefined)?<>
{(data.length!=0)?<div className={style.headings}>
<li>Order Id </li>
<li>Date</li>
<li>Time</li>
<li>Payment Method</li>
<li>Total Amount</li>
<li>Order Status</li>
</div>  :<h4>No Order Found</h4>}
</>: <h4>No Order Found</h4>}

{(data!=undefined)?
<>
{data.map((item)=>{
return <div className={style.allItems} key={item._id}>
<div className={style.hdatas}>
<li className={style.token} onClick={() => copy(item.TokenUser)} style={{cursor:'pointer'}}>{item.TokenUser}</li>
<li>{item.OrderDate}</li>
<li>{item.PickUpTime}</li>
<li>{item.PaymentMethod}</li>
<li>{item.TotalAmount}</li>
{(item.OrderStatus.toLowerCase()=="pending")?<li  className={style.status}><div className={style.pending}>Pending</div></li>:(item.OrderStatus.toLowerCase()=="reject") ? <li  className={style.status}><div className={style.reject}>Reject</div></li>: <li  className={style.status}><div className={style.complete}>Complete</div></li>}


</div>
<h6>Items Order Details </h6>

<div className={style.iheading}>

<div className={style.itemsHeading}>
<li>Item Name</li>
<li>Qty</li>
<li>Category</li>
<li>Amount</li>
<li>Size Booked</li>
</div>
</div>

<div className={style.items}>
{(item.ItemsOrder.length!=0)? <>
{(item.ItemsOrder.map((sub)=>{
return <div className={style.itemsMenu} key={sub._id}>
<li>{sub.ItemName}</li>
<li>{sub.Qty}</li>
<li>{sub.Category}</li>
<li>{sub.Amount}</li>
<li>{sub.Size}</li>
</div>
}))}
</>: <h4>No Order Found</h4>}
</div>
</div>
})}
</>
 :<h4>No Order Found</h4>}


</div>


       </div> 
      <Footer />
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
    </>
  );
}
