import React,{useState,useEffect,useContext} from 'react'
import LoadingBar from "react-top-loading-bar";
import { BiMenu } from 'react-icons/bi';
let HOST = process.env.NEXT_PUBLIC_API_URL;
let foodkey = process.env.NEXT_PUBLIC_Secret_Key_FoodOwner;
let coffeekey = process.env.NEXT_PUBLIC_Secret_Key_CoffeeOwner;
let juicekey = process.env.NEXT_PUBLIC_Secret_Key_JuiceOwner;
let drinkkey = process.env.NEXT_PUBLIC_Secret_Key_DrinkOwner;
import { BiLoader } from 'react-icons/bi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { CgPlayListRemove } from 'react-icons/cg';
import { TiTickOutline } from 'react-icons/ti';
import { MdOutlineClose } from 'react-icons/md';
import { IoMdDoneAll } from 'react-icons/io';
import { GrFormClose } from 'react-icons/gr';
import VerifyAdminLogin from '../pages/admin/VerifyAdminLogin';
import "react-toastify/dist/ReactToastify.css";
import StyleRealtime from "../styles/RealtimeOrder.module.css";
import { ToastContainer, toast } from "react-toastify";
import router from 'next/router'
import { AllContext } from "../context/AllContext";
function SingleItemRealtime({item}) {
 const { statesForRealtime,setStateForRealtime } = useContext(AllContext);

const [updateStates,setUpdateStates]=useState(false);
const [datas,setDatas]=useState([]);
const [low,setLow]=useState();
const [show,setShow]=useState(false);
const [price,setPrice]=useState(0)
const [OrderStatus,setOrderStatus]=useState('');
const [status,setStatus]=useState('pending')
const [progress, setProgress] = useState(0);
useEffect(()=>{
if(item){
setDatas(item);
setOrderStatus(item.OrderStatus);
let lowercase=item.OrderStatus.toLowerCase();
setLow(lowercase)
setPrice(item.AmountReceived)
}
},[])





// process order
const process=()=>{
setShow(false);
setUpdateStates(true)
}
// reject Order

const reject=(id,CategoryPrimary)=>{
let status="reject";
if(CategoryPrimary=="foodcategory"){
let value=prompt("Enter Secret Key [ Food Admin ] to Process Order");
if(value!=foodkey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
}
else if(CategoryPrimary=="coffeecategory"){
let value=prompt("Enter Secret Key [ Coffee Admin ] to Process Order");
if(value!=coffeekey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
}
else if(CategoryPrimary=="drinkcategory"){
let value=prompt("Enter Secret Key [ Drink Admin ] to Process Order");
if(value!=drinkkey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
}
else if(CategoryPrimary=="juicecategory"){
let value=prompt("Enter Secret Key [ Juice Admin ] to Process Order");
if(value!=juicekey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

}
else{
toast.warn('Sorry something went wrong with  Secret Key you provides', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

const sendData=async()=>{ setProgress(40)

const res = await fetch(`${HOST}/api/UpdateOrderItems`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "id": id,"status":status
      }),
    });
  await res.json(); setProgress(100)

if(res.status==403){
toast.error('Please Login With Admin Credentails', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==400){
toast.warn('Please fill All the filed Id,Price,Status', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

if(res.status==404){
toast.warn('Record Not Found', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==501){
toast.warn('Internal Server Error', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
toast.success('Successfully Updated', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
router.push('/admin/RealtimeOrder')
setStateForRealtime(!statesForRealtime);
setLow(status)
setOrderStatus(status)
setShow(false)
}
sendData();
}


const UpdateOrder=(id,Amount,CategoryPrimary)=>{

let priceInt=parseInt(price);
if(priceInt<0){
toast.warn('Price Below Zero Not Allowed', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
else if(priceInt==0){
toast.warn('Zero Price Amount Not Allowed', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
else if(status=="pending"){
toast.warn('Please Change Order Status', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(priceInt<parseInt(Amount)){
toast.warn('Amount Is Less Than Total Amount', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(priceInt>parseInt(Amount)){
toast.warn('Amount Is More Than Total Amount', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

if(CategoryPrimary=="foodcategory"){
let value=prompt("Enter Secret Key [ Food Admin ] to Process Order");
if(value!=foodkey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
}
else if(CategoryPrimary=="coffeecategory"){
let value=prompt("Enter Secret Key [ Coffee Admin ] to Process Order");
if(value!=coffeekey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
}
else if(CategoryPrimary=="drinkcategory"){
let value=prompt("Enter Secret Key [ Drink Admin ] to Process Order");
if(value!=drinkkey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
}
else if(CategoryPrimary=="juicecategory"){
let value=prompt("Enter Secret Key [ Juice Admin ] to Process Order");
if(value!=juicekey){
toast.warn('Sorry Incorrect Secret Key', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

}
else{
toast.warn('Sorry something went wrong with  Secret Key you provides', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

const sendData=async()=>{ setProgress(40)

const res = await fetch(`${HOST}/api/UpdateOrderItems`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "id": id,"price":price,"status":status
      }),
    });
    let data = await res.json(); setProgress(100)

if(res.status==403){
toast.error('Please Login With Admin Credentails', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==400){
toast.warn('Please fill All the filed Id,Price,Status', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

if(res.status==404){
toast.warn('Record Not Found', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==501){
toast.warn('Internal Server Error', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}

toast.success('Successfully Updated', {
position: "bottom-right",
autoClose: 1200,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
router.push('/admin/RealtimeOrder')
setStateForRealtime(!statesForRealtime);
setUpdateStates(false)
setLow(status)
setOrderStatus(status)
}
sendData();
}


  return (
     <>  <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  

     <VerifyAdminLogin />
    {(datas.length!=0)?<div>
<div className={StyleRealtime.tableheaddatasub} key={item._id}>
<div className={StyleRealtime.div1}>{item.ItemName}</div>
<div className={StyleRealtime.div2}>{item.ProductOriginalAmount}</div>
<div className={StyleRealtime.div3}>{item.Qty}</div>
<div className={StyleRealtime.div4}>{item.Category}
<span>
{(item.Size=="normalsize")? "[N]":(item.Size=="smallsize")? "[S]":(item.Size=="largesize")? "[L]":(item.Size=="mediumsize")? "[M]":"[H]"}</span>
</div>
<div className={StyleRealtime.div5}>{item.Amount}</div>
<div className={StyleRealtime.div6}>{item.AmountReceived} </div>
<div className={StyleRealtime.div7}>
{(low=="pending")? <div className={StyleRealtime.pen}>{OrderStatus}</div>: (low=="complete")? <div className={StyleRealtime.com}>{OrderStatus}</div>:
<div className={StyleRealtime.rej}>{OrderStatus}</div>} 
</div>

{(OrderStatus.toLowerCase()=="complete")?
// complete  
<div className={StyleRealtime.div8}>
 <IoMdDoneAll className={StyleRealtime.com} title="Order Complete"/>
</div>
:
// reject
((OrderStatus.toLowerCase()=="reject")? 
<div className={StyleRealtime.div8}>
 <GrFormClose className={StyleRealtime.rej} title="Order Reject"/>
</div>
:
// pending
 <div className={StyleRealtime.div8} onClick={()=>setShow(!show)}>
{(show)?<CgPlayListRemove className={StyleRealtime.close}/>:<BiMenu className={StyleRealtime.menu}/>}
</div>) 
 }

{/* option after click */}


{(show)?
<div className={StyleRealtime.options}>
<div onClick={()=>process(item._id)}><span className={StyleRealtime.icon1} >
<BiLoader /></span> <span className={StyleRealtime.icon_1}>Process</span> 
</div>

<div onClick={()=>reject(item._id,item.CategoryPrimary)}><span className={StyleRealtime.icon2}  ><RiDeleteBin7Line /></span> <span className={StyleRealtime.icon_2} >Reject</span> </div>
</div> :
""}



{/* update form */}
{(updateStates) ?
<div className={StyleRealtime.update}>
<div className={StyleRealtime.div1}>{item.ItemName}</div>
<div className={StyleRealtime.div2}>{item.ProductOriginalAmount}</div>
<div className={StyleRealtime.div3}>{item.Qty}</div>
<div className={StyleRealtime.div4}>{item.Category}
</div>
<div className={StyleRealtime.div5}>{item.Amount}</div>
<div className={StyleRealtime.div6}>
<input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
</div>
<div className={StyleRealtime.div7}>
<select value={status} onChange={(e)=>setStatus(e.target.value)}>
<option value="pending">Pending</option>
<option value="complete">Complete</option>
</select>
</div>
<div className={StyleRealtime.div8}>
{/* open close icon */}
<TiTickOutline className={StyleRealtime.tick} title="Update" onClick={()=>UpdateOrder(item._id,item.Amount,item.CategoryPrimary)} />
<MdOutlineClose className={StyleRealtime.back} title="Back" onClick={()=>setUpdateStates(false)} />
</div>
</div>
  : ""}


</div>
    </div> : ""} 
    
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
  )
}


export default SingleItemRealtime;