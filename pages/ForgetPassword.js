import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import forget from "../styles/Forget.module.css";
import { useState } from "react";
import { AiOutlineMail } from 'react-icons/ai';
import { BiMessageCheck } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
export default function ForgetPassword() {
const [email,setEmail]=useState("");
 const [progress, setProgress] = useState(0);
const [otp,setOtp]=useState("")
const [disbaleBtn,setDisableBtn]=useState(false);
const [npass,seNpass]=useState("")
const [cnpass,setCnpass]=useState("")
const [st,setSt]=useState(false);
const [st1,setSt1]=useState(false);
useEffect(()=>{
if((sessionStorage.getItem("reset")!=undefined)){
Router.push("/")
}
if((sessionStorage.getItem("login")!=undefined)){
Router.push("/")
}
},[])


const otpSend=async(e)=>{
e.preventDefault();
setSt1(true)
setProgress(40)
if(email==""){
  toast.warn(`Please Enter Email Id`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
      setProgress(100)
       return ;
  }
const res = await fetch(`${HOST}/api/EmailCheckForgetPassword`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Email:email
      }),
    });
    let datass=await res.json();
setProgress(100)


if(datass.status=="400"){
for(let i=0;i<datass.errors.length;i++){
if(i<1){
  toast.warn(`${datass.errors[i].msg}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

continue;
}
}
   setSt1(false)

return ;
}

if(res.status==400){
toast.warn(`${datass.message}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }); 
   setSt1(false)
     return ;
}
if(res.status==201){
toast.success("OTP successfully send", {
      position: "bottom-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }); 
setSt(true)
setSt1(true)
sessionStorage.setItem("vEmail",email);
}

}

const resetPassword=async(e)=>{
e.preventDefault();
setDisableBtn(true)
if(!npass){
toast.warn('New Password field not be Empty', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   
setDisableBtn(false)
return ;
}
if(!cnpass){
toast.warn('Re-enter field of Password not be Empty', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   
setDisableBtn(false)
return ;
}
if(npass!=cnpass){
toast.warn('New Password and Re-enter Password is not same', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   
setDisableBtn(false)
return ;
}


setProgress(40)

const res = await fetch(`${HOST}/api/ForgetPassword`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
   newPassword:npass,Email:email,Otp:otp
      }),
    });
 let datass=await res.json();
setProgress(100)

 if(res.status==501){
    toast.warn(`${datass.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   setDisableBtn(false)
return ;
    }
    if(res.status==400){
    toast.warn(`${datass.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   setDisableBtn(false)
return ;
    }
    if(res.status==403){
    toast.warn(`${datass.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   
sessionStorage.removeItem("vEmail")
setTimeout(() => {
Router.push("/ClientLogin");
}, 1500);
setDisableBtn(false)
return;
    }
  

   if(res.status==201){
    toast.success("Password Successfully Reset", {
position: "bottom-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   
sessionStorage.removeItem("vEmail")
sessionStorage.setItem("reset","true");
setTimeout(() => {
Router.push("/ClientLogin");
}, 1500);
return ;
    }
}
const handleChange = (e) => {
let len=(e.target.value).toString();

if(len.length<=6){

  setOtp(e.target.value);
}
else{

  toast.warn('OTP FIELD ONLY CONTAIN 6 DIGITS', {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }); 
}
};
  return (
    <div>
    <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
    <div className={Styles.admin}>
      <HeadTag title="Forget Password" />
   <Header />

<div className={forget.forget}>

<div className={forget.form}>
<div className={forget.top}>
<h1>Forget Password</h1>
</div>



<div className={forget.emailSection}>
<form onSubmit={otpSend}>
<div className={forget.email}>
<AiOutlineMail className={forget.icons}/>

{(st)? <input type="email" value={email} readOnly/>:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email Id to Reset Password" autoFocus required/> }
</div>


{(st1)?'':<button onClick={otpSend}>Send Otp</button>}
</form>
</div>


{(st)? <>

<div className={forget.otp}>
<div className={forget.email}>
<BiMessageCheck className={forget.icons}/>
<input type="Number" value={otp} onChange={handleChange} placeholder="Enter 6 Digit Otp send to email id" maxLength={6} 

 autoFocus required/>
</div>
</div>

<div className={forget.pass}>
<form onSubmit={resetPassword}>
<div className={forget.email}>
<RiLockPasswordLine className={forget.icons}/>
<input type="password" value={npass} onChange={(e)=>seNpass(e.target.value)} placeholder="Enter New Password" autoComplete="new-password"/>

</div>
<div className={forget.email}>
<RiLockPasswordLine className={forget.icons}/>
<input type="password" value={cnpass} onChange={(e)=>setCnpass(e.target.value)} placeholder="Re-Enter Confirm Password"/>

</div>

{(disbaleBtn)?<button disabled style={{cursor:'not-allowed'}}>Waiting...</button>:<button onClick={resetPassword}>Change Password</button>}
</form>
</div>
</>: ""}


</div>

</div>
   {(st==false)?<div className={forget.space}></div>: ""} 
    </div>
   <Footer />
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
    </div>
  )
}
