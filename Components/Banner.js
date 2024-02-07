import Image from "next/image";
import Link from "next/link";
import Style from "../styles/FoodItem.module.css";
export default function Banner(props) {
  return (
    <div className={Style.Status}>
      <div className={Style.banner}>
        <Image src={props.BannerImage} alt="banner" layout="fill" />
      </div>
  
        {/* if contact page */}
        {props.CurrentPage == "Contact Us" && (
          <div className={Style.pathContact}>
            <h1>Menu</h1>

            <p>
              <Link href="/">Home</Link> -{" "}
              <Link href={props.CurrentPageUrl}>{props.CurrentPage}</Link>-{" "}
              <span>{props.SubPage}</span>
            </p>
          </div>
        )}
        {/*  food page */}
        {props.CurrentPage == "Food Item" && (
          <div className={Style.path}>
            <h1>Menu</h1>

            <p>
              <Link href="/">Home</Link> -{" "}
              <Link href={props.CurrentPageUrl}>{props.CurrentPage}</Link>-{" "}
              <span>{props.SubPage}</span>
            </p>
          </div>
        )}


        {/* coffee,drink,juice item */}
       
         {(props.CurrentPage == "Coffee Item"||props.CurrentPage == "Drink Item"||props.CurrentPage == "Juice Item") && (
          <div className={Style.pathCoffee}>
            <h1>Menu</h1>

            <p>
              <Link href="/">Home</Link> -{" "}
              <Link href={props.CurrentPageUrl}>{props.CurrentPage}</Link>-{" "}
              <span>{props.SubPage}</span>
            </p>
          </div>
        )}


        
      </div>
  
  );
}
