import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import ContactStyle from "../styles/Contact.module.css";
let token=process.env.NEXT_PUBLIC_FORMSPACETOKEN;
import LoadingBar from "react-top-loading-bar";

let banner = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014251/contactbanner_ujd9dh.jpg`;
let shape = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014248/shape_rftir3.png`;
let line = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014246/line-cauve_mipnzr.png`;

import router from 'next/router'
import Image from 'next/image';
import Banner from "../Components/Banner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoLocation } from 'react-icons/go';
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FaFax } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useForm } from '@formspree/react';
export default function Contact() {
const [userName,setUserName]=useState("");
const [userEmail,setUserEmail]=useState("");
const [userMobile,setUserMobile]=useState("");
const [userMessage,setUserMessage]=useState("");

const [progress, setProgress] = useState(0);

 const [state, handleSubmit] = useForm(token);

useEffect(()=>{
  const fire=()=>{
    setProgress(40);
if((userName=="")||(userEmail=="")||(userMobile=="")||(userMessage=="")){
   toast.warn('Please Fill all the form fields', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setProgress(100);

    return ;
}
setProgress(100);
    toast.success('Message Successfully Send', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
   
    setTimeout(Redirect, 1200);
    function Redirect() {
      router.push("/");
    }
}


  if (state.succeeded) {
    setProgress(40);
    fire();
    setProgress(100);
  }
},[handleSubmit])



useEffect(()=>{
const getData=async()=>{
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      }
    });
let data=await res.json();
if(data.data!=undefined){
setUserName(data.data.FullName);
setUserEmail(data.data.Email);
setUserMobile(data.data.Mobile)
}else{
toast.error('Please Login To Access This Page', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
setTimeout(RedirectFunction,1500);
function RedirectFunction(){
  router.push('/ClientLogin')
}
}
}
getData();

},[])



  return (
    <>
    <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
     <div className={Styles.admin}>
     <HeadTag title="Contact Us" />
   <Header />
<Banner BannerImage={banner} 
CurrentPageUrl="/Contact" CurrentPage="Contact Us" SubPage="Page" />
 </div>
<div className={ContactStyle.contactIcons}>
<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<div className={ContactStyle.StyleImg}>
<Image src={shape} alt="shape" layout="fill"/></div>
</div>
<GoLocation className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<h3>ggdsd sector 32-C chandigarh
</h3>
</div>
</li>


<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<div className={ContactStyle.StyleImg}>
<Image src={shape} alt="shape" layout="fill"/></div></div>
<FiPhoneCall className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<p>+0172 491 2400
</p>
</div>
</li>
<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<div className={ContactStyle.StyleImg}>
<Image src={shape} alt="shape" layout="fill"/></div></div>
<HiOutlineMailOpen className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<p >info@ggdsd.ac.in
</p>
</div>
</li>

<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<div className={ContactStyle.StyleImg}>
<Image src={shape} alt="shape" layout="fill"/></div></div>
<FaFax className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<p >+91-172-2661077
</p>
</div>
</li>
</div>

<div className={ContactStyle.curli_line}>
<Image src={line} alt="shape" layout="fill"/>
</div>

<div className={ContactStyle.form}>
<div className={ContactStyle.left}>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1395.880377230655!2d76.77054255924733!3d30.703901985301545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed8c1f11d227%3A0x70bd95668a9bd51f!2sNescafe%20Cafe%20SD%20College!5e1!3m2!1sen!2sin!4v1660984992813!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
<div className={ContactStyle.right}>
<h3>GET IN TOUCH</h3>
<h2>Send Us Message</h2>
<p>Please provide your details below so that we get in touch.</p>
<form onSubmit={handleSubmit}>
<input type="text" name="name" placeholder="Full Name" className={ContactStyle.Names} value={userName} onChange={(e)=>setUserName(e.target.value)} readOnly/>
<input type="email" name="email" placeholder="Email Id" className={ContactStyle.Email} value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} readOnly/>

<input type="number" name="number" placeholder="Mobile Number" className={ContactStyle.Number} value={userMobile} onChange={(e)=>setUserMobile(e.target.value)} readOnly/>

<textarea name="message" className={ContactStyle.Message} placeholder="Your Message" value={userMessage} onChange={(e)=>setUserMessage(e.target.value)}></textarea>
<button type="submit" disabled={state.submitting}>SUBMIT NOW</button>
</form>
</div>
</div>  
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />  
   <Footer />
    
    </>
  )
}
