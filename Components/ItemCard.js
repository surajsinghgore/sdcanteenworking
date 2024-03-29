import Image from 'next/image';
import { RiArrowDropUpFill } from 'react-icons/ri';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect ,useState} from "react";
import {  useCart } from "react-use-cart";
import Style from '../styles/FoodItem.module.css'
import Link from 'next/link'

import router from 'next/router'

export default function ItemCard(item) {
 const {
    items,   emptyCart,
    removeItem,
    addItem ,
  } = useCart();
const [useSize,setUseSize]=useState(false);
const [showBtn,SetShowBtn]=useState(false);
const [price,setPrice]=useState('');
const [size,setSize]=useState('');
const [adds,setAdds]=useState(false);

useEffect(()=>{
if(item.item!=undefined){
setSize(item.item.ItemCost[0].sizeName)
setPrice(item.item.ItemCost[0].Price)
}
},[])
 
useEffect(() => {
    items.map((itemm) => {
      if (item.item != undefined) {
        if (itemm.id ==item.item._id) {
          setAdds(true);
     
        }
      }
    });
  },[items]);
const AddToCart=(item)=>{
if(item.item.ItemCost.length==1){
localStorage.setItem("itemOrder",item.item.ItemCost[0]._id)
}
else if(useSize==false){
localStorage.setItem("itemOrder",item.item.ItemCost[0]._id)
}
else {
item.item.ItemCost.map((itx)=>{
if(itx.Price==price){
localStorage.setItem("itemOrder",itx._id)
}
})
}
let subId=localStorage.getItem("itemOrder");
let subData=item.item.ItemCost.filter((items)=>{
return items._id==subId})

if(subData.length==0 || subData==undefined){
 toast.warn("please try agian ", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    emptyCart();
     localStorage.removeItem("itemOrder");
    return ;
}
let id=item.item._id;
let price=subData[0].Price;
let Qty=item.item.Qty;
let Image=item.item.Image;
let Category=item.item.Category;
let Size=subData[0].sizeName;
let QtyBook=1;
let totalAmount=subData[0].Price;
let foodFind;
foodFind=item.item.FoodName;
if(foodFind!=undefined){
let FoodName=item.item.FoodName;
addItem({id,price,FoodName,Qty,Image,Size,subId,Category,QtyBook,totalAmount})



if(FoodName==undefined){
 toast.success("Food successfully added to cart", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}

else{
 toast.success(`${FoodName} successfully added to cart`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
setAdds(true);
    
    return ;
}
  
}

const RemoveFromCart=(item)=>{
setAdds(false);
if(item.item._id!=undefined){
let id=item.item._id;
item.item.addToCart=false
removeItem(id);
 toast.error("Item successfully removed from cart", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

}
}

// buy now item
const BuyNow=(item)=>{
let check=false;
let cartData=items

for(let j=0;j<cartData.length;j++){
if(item.FoodName!=undefined){
if(cartData[j].FoodName==item.item.FoodName){
check=true;
}
}
}
if(check==false){
if(item.item.ItemCost.length==1){
localStorage.setItem("itemOrder",item.item.ItemCost[0]._id)
}
else if(useSize==false){
localStorage.setItem("itemOrder",item.item.ItemCost[0]._id)
}
else {
item.item.ItemCost.map((itx)=>{
if(itx.Price==price){
localStorage.setItem("itemOrder",itx._id)
}
})
}
}

let subId=localStorage.getItem("itemOrder");
let subData=item.item.ItemCost.filter((items)=>{
return items._id==subId})
if(subData.length==0 || subData==undefined){
 toast.warn("please try again ", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    emptyCart();
 localStorage.removeItem("itemOrder");
    return ;
}
let id=item.item._id;
let price=subData[0].Price;
let Qty=item.item.Qty;
let Image=item.item.Image;
let Category=item.item.Category;
let Size=subData[0].sizeName;
let QtyBook=1;
let totalAmount=subData[0].Price;
let foodFind;
foodFind=item.item.FoodName;
if(foodFind!=undefined){
let FoodName=item.item.FoodName;
addItem({id,price,FoodName,Qty,Image,Size,subId,Category,QtyBook,totalAmount})
if(FoodName==undefined){
 toast.success("Food successfully added to cart", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}

else{
 toast.success(`${FoodName} successfully added to cart`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}

    

function redirect(){
     router.push("/Cart");
}
     setTimeout(redirect,1500)
    return ;
}
  

}


const ControlSizes=()=>{
SetShowBtn(!showBtn);
}


const filterPrice=(itm)=>{
setPrice(itm.Price)
setSize(itm.sizeName)
SetShowBtn(!showBtn);
setUseSize(true)
localStorage.setItem("itemOrder",itm._id)
}
  return (
  <>
  
     <div className={Style.card} key={item.item._id} loading="lazy">
   <div className={Style.FoodImg}>
  <Link href={`/${item.item.FoodName}`}><a> <Image src={item.item.Image} alt={item.item.ImageName} layout='fill' priority="true" /></a></Link>
   </div>
   <div className={Style.deatils}>
   <Link href={`/${item.item.FoodName}`}><a><h1>{item.item.FoodName}</h1></a></Link>
<h3>Qty: <span>{item.item.Qty}</span></h3>
{(item.item.Category)?<>
<h6>Category: <span>{item.item.Category}</span></h6>
</> : <>
<h6>Category: <span>No</span></h6>
</>}
 <div className={Style.sizes}>
 <div className={Style.dropBtn} onClick={ControlSizes}>
 <div className={Style.span}>{size}</div>
 <div className={Style.arrow}>
 {(showBtn==true)?<RiArrowDropUpFill className={Style.arrowIcon}/> : <RiArrowDropDownFill className={Style.arrowIcon}/>}

 </div>
 </div>
 {(showBtn==true) ? 
  <div className={Style.listPopUp}>
  {item.item.ItemCost.map((itm)=>{
  return(
 <div key={itm._id}><li onClick={()=>filterPrice(itm)}>{itm.sizeName}</li></div>
    )
  })}
 </div>:""}
 
 <div className={Style.price}>
   <h4>₹ {price}</h4>
 </div>
 </div>
<div className={Style.btnSection}>
 {(adds)?
 <><button onClick={()=>RemoveFromCart(item)}>Remove Item</button></> :
  <><button onClick={()=>AddToCart(item)}>Add To Cart</button></>}
   <button className={Style.buy} onClick={()=>BuyNow(item)}>Buy Now</button>
   </div>
   </div></div>
         <ToastContainer
        position="bottom-right"
        autoClose={1500}
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
