import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CartStyle from "../styles/Cart.module.css";
import Styles from "../styles/admin.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "react-use-cart";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image'
import router from 'next/router'
import { useRouter } from "next/router";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useEffect, useState } from "react";


export default function Cart() {
const routers=useRouter();
const [state,setState]=useState(true);
const [foodItem,setFoodItem]=useState([""]);
const [coffeeItem,setCoffeeItem]=useState([""])
const [drinkItem,setDrinkItem]=useState([""])
const [juiceItem,setJuiceItem]=useState([""])
const [length,setLength]=useState(0);
const [payableAmount,setPayableAmount]=useState(0);

const redirectToOrderPage=()=>{
router.push('/OrderDetails')
}
const {
    items,
    removeItem,
    emptyCart ,
    updateItem  
  } = useCart()



useEffect(()=>{
if(items!=undefined ){
setLength(items.length)
let foodData=items.filter((item)=>{
return item.FoodName
})
if(foodData!=undefined){
setFoodItem(foodData)
}

let coffeeData=items.filter((item)=>{
return item.CoffeeName
})
if(coffeeData!=undefined){
setCoffeeItem(coffeeData)
}

let juiceData=items.filter((item)=>{
return item.JuiceName
})
if(juiceData!=undefined){
setJuiceItem(juiceData)
}

let drinkData=items.filter((item)=>{
return item.DrinkName
})
if(drinkData!=undefined){
setDrinkItem(drinkData)
}
if(items!=undefined && items.length!=0){
let sum=0;
for (let i = 0; i < items.length; i++) {
    let number=parseInt(items[i].totalAmount)
    sum+=number;
}
    setPayableAmount(sum)
}

}
},[state])
// clear all cart items
const cleanAllCartItem=()=>{
emptyCart();
setPayableAmount(0)
 toast.error('Cart Clean Successfully', {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setState(!state);
}


// delete item
const deleteItem=(item)=>{
removeItem(item.id);
if(items.length==1){
setPayableAmount(0)

}

toast.error(`Item successfully removed from cart`, {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
setState(!state)
}

// decrement
const decrement=(item)=>{
let book=parseInt(item.QtyBook);
let book1=--book;
if(book1!==0){
let qb=parseInt(--item.QtyBook)
let tm=parseInt(item.price*item.QtyBook)
updateItem(item.id,{
QtyBook:qb,
totalAmount:tm
})
setState(!state)
}
else{
 toast.warn('Sorry , Item Quantity Must be Atleast 1', {
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



const backBtn=()=>{
routers.back()
}
// increment
const increment=(item)=>{
let book=parseInt(item.QtyBook);
let book1=++book;
if(book1>10){
 toast.warn('Maximum 10 Quantity Is Allowed To Booked', {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
else{
let qb=parseInt(++item.QtyBook)
let tm=parseInt(item.price*item.QtyBook)
updateItem(item.id,{
QtyBook:qb,
totalAmount:tm
})
}
setState(!state)

}
  return (
    <>
      <div className={Styles.admin}>
        <HeadTag title="Cart Page" />
        <Header />
      </div>
      {/* cart */}
      <div className={CartStyle.cart}>
        <h1> Cart Items </h1>
        <div className={CartStyle.progress}>
          <hr />

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={`${CartStyle.circle} ${CartStyle.circle1}`}>
               <span>1</span> 
              </div>
              <div className={CartStyle.description}>
                <p> SHOPPING CART </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>  <span>2</span> </div>
              <div className={CartStyle.description}>
                <p> ORDER DETAILS </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>  <span>3</span> </div>
              <div className={CartStyle.description}>
                <p> PAYMENT METHOD </p>
              </div>
            </div>
          </div>
        </div>





{/* cart List */}
<div className={CartStyle.cartItem}>
<div className={CartStyle.top}>
<h6>You have <span>{length} items </span>in your order.</h6>
<button onClick={cleanAllCartItem}>Clean Cart</button>
</div>
<div className={CartStyle.cartTable}>
<div className={CartStyle.heading}>
<div className={CartStyle.pics}></div>
<div className={CartStyle.names}>NAME</div>
<div className={CartStyle.price}>PRICE</div>
<div className={CartStyle.price}>SIZE</div>
<div className={CartStyle.qty}>QTY</div>
<div className={CartStyle.total}>TOTAL</div>
<div className={CartStyle.remove}></div>
</div>

{(length==0)? <><h1>Cart Is Empty</h1></>:<>
{(foodItem)?<>
{foodItem.map((item)=>{
return(
<div className={CartStyle.data} key={item.id}>
<div className={CartStyle.FoodPics}>
<Image src={item.Image} alt={item.ImageName} layout="fill" priority="true"/>
</div>
<div className={CartStyle.names}><p> {item.FoodName}</p></div>
<div className={CartStyle.price}> <p>{item.price}</p> </div>
<div className={CartStyle.price}> <p>{item.Size}</p> </div>
<div className={CartStyle.qty}>
<div className={CartStyle.button}>
<div className={CartStyle.left} onClick={()=>decrement(item)} title="Decrement">-</div>
<div className={CartStyle.middle}>{item.QtyBook}</div>
<div className={CartStyle.right} onClick={()=>increment(item)} title="Increment">+</div>
</div>
</div>
<div className={CartStyle.total}><p>{item.totalAmount}</p></div>
<div className={CartStyle.remove}><RiDeleteBin2Line title="remove this item" style={{cursor:"pointer"}} onClick={()=>deleteItem(item)}/></div>
</div>
)
})}
</> : ""} 
 
{(coffeeItem)?<>
{coffeeItem.map((item)=>{
return(
<div className={CartStyle.data} key={item.id}>
<div className={CartStyle.CoffeePics}>
<Image src={item.Image} alt={item.ImageName} layout="fill" priority="true"/>
</div>
<div className={CartStyle.names}><p> {item.CoffeeName}</p></div>
<div className={CartStyle.price}> <p>{item.price}</p> </div>
<div className={CartStyle.price}> <p>{item.Size}</p> </div>
<div className={CartStyle.qty}>
<div className={CartStyle.button}>
<div className={CartStyle.left} onClick={()=>decrement(item)} title="Decrement">-</div>
<div className={CartStyle.middle}>{item.QtyBook}</div>
<div className={CartStyle.right} onClick={()=>increment(item)} title="Increment">+</div>
</div>
</div>

<div className={CartStyle.total}><p>{item.totalAmount}</p></div>
<div className={CartStyle.remove}><RiDeleteBin2Line title="remove this item" style={{cursor:"pointer"}} onClick={()=>deleteItem(item)}  /></div>
</div>
)
})}
</> : ""}
 {(drinkItem)?<>
{drinkItem.map((item)=>{
return(
<div className={CartStyle.data} key={item.id}>
<div className={CartStyle.DrinkPics} >
<Image src={item.Image} alt={item.ImageName} layout="fill" />
</div>
<div className={CartStyle.names}><p> {item.DrinkName}</p></div>
<div className={CartStyle.price}> <p>{item.price}</p> </div>
<div className={CartStyle.price}> <p>{item.Size}</p> </div>
<div className={CartStyle.qty}>
<div className={CartStyle.button}>
<div className={CartStyle.left} onClick={()=>decrement(item)} title="Decrement">-</div>
<div className={CartStyle.middle}>{item.QtyBook}</div>
<div className={CartStyle.right} onClick={()=>increment(item)} title="Increment">+</div>
</div>
</div>

<div className={CartStyle.total}><p>{item.totalAmount}</p></div>
<div className={CartStyle.remove}><RiDeleteBin2Line title="remove this item" style={{cursor:"pointer"}} onClick={()=>deleteItem(item)}/></div>
</div>
)
})}
</> : ""} 
{(juiceItem)?<>
{juiceItem.map((item)=>{
return(
<div className={CartStyle.data} key={item.id}>
<div className={CartStyle.JuicePics}>
<Image src={item.Image} alt={item.ImageName} layout="fill" />
</div>
<div className={CartStyle.names}><p> {item.JuiceName}</p></div>
<div className={CartStyle.price}> <p>{item.price}</p> </div>
<div className={CartStyle.price}> <p>{item.Size}</p> </div>
<div className={CartStyle.qty}>
<div className={CartStyle.button}>
<div className={CartStyle.left} onClick={()=>decrement(item)} title="Decrement">-</div>
<div className={CartStyle.middle}>{item.QtyBook}</div>
<div className={CartStyle.right} onClick={()=>increment(item)} title="Increment">+</div>
</div>
</div>
<div className={CartStyle.total}><p>{item.totalAmount}</p></div>
<div className={CartStyle.remove}><RiDeleteBin2Line title="remove this item" style={{cursor:"pointer"}} onClick={()=>deleteItem(item)}/></div>
</div>
)
})}
</> : ""} 
</>}


<div className={CartStyle.bottom}>
<button className={CartStyle.more} onClick={backBtn}>Continue Shopping</button>
<div className={CartStyle.subtotal}>
<h1>Total Payable Amount: <span> ₹ {payableAmount}</span></h1>
{(length==0)? <button className={CartStyle.disables}>Add Item</button>:<button onClick={redirectToOrderPage}>Order Now</button>}
</div>
</div>



</div>

<div className={CartStyle.top} id={CartStyle.BtnInMobile}>
<h6>TOTAL PAYABLE AMOUNT:<span> ₹ {payableAmount} </span></h6>

{(length==0)? <button className={CartStyle.disables}>Add Item</button>:<button onClick={redirectToOrderPage}>Order Now</button>}
</div>
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
