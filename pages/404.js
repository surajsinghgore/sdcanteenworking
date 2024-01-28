import not from '../styles/notFound.module.css'

import Image from 'next/image'                
import Router from 'next/router'
export default function NotFound() {
const redirect=()=>{
Router.push("/")
}
  return (
    <div className={not.notFound}>
   <div className={not.imgsSection}>
   <Image src={'https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014249/404_wiofvt.webp'} alt="image error " width={800} height={580}/>
   </div>
   <button onClick={redirect}>Take Me Home</button>
    </div>
  )
}
