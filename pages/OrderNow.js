import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import order from "../styles/OrderNow.module.css";


import Image from 'next/image'
let food = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014247/food_jxjsba.png`
let coffee = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014251/coffee_i2cfjf.webp`
let drink = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014243/drink_eekwf6.webp`
import router from 'next/router'
let juice = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014245/juice_rafk8s.png`
export default function OrderNow() {
const foodRedirect=()=>{
router.push("/FoodItem")
}
const coffeeRedirect=()=>{
router.push("/CoffeeItem")

}
const drinkRedirect=()=>{
router.push("/DrinkItem")

}
const juiceRedirect=()=>{
router.push("/JuiceItem")

}
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Order Now" />
   <Header />

  
    <div className={order.order}>
    <h1>TRY OUR TASTY ITEMS</h1>
 
  
  <div className={order.cardSection}>
  
  <div className={order.food} onClick={foodRedirect}>
  <div className={order.imgs}>
  <Image src={food} alt="food" layout="fill" priority="true" />
  </div>
  <h1>Food Items</h1>
  </div>


  <div className={order.food} onClick={coffeeRedirect}>
  <div className={order.imgs}>
  <Image src={coffee} alt="food"  layout="fill" priority="true" />
  </div>
  <h1>Coffee Items</h1>
  </div>


   <div className={order.food} onClick={juiceRedirect}>
  <div className={order.imgs} >
  <Image src={juice} alt="food" layout="fill" priority="true" />
  </div>
  <h1 style={{paddingTop:"1%"}}>Juice Items</h1>
  </div>

 <div className={order.food} onClick={drinkRedirect}>
  <div className={order.imgs}>
  <Image src={drink} alt="food" layout="fill" priority="true" />
  </div>
  <h1>Drink Items</h1>
  </div>
  </div>   </div>
    </div>
   <Footer />
    </div>
  )
}
