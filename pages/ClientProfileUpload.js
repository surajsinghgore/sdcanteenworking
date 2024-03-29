import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Image from 'next/image'
import router from 'next/router'
import LoadingBar from "react-top-loading-bar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "../styles/admin.module.css";
import ProfileStyles from "../styles/ClientProfileUpload.module.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import React, { useEffect,useState } from "react";

let boyProfile = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014242/men_uuulzd.png`
let girlProfile = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014244/girl_vzok8n.png`

import { AiOutlineCloudUpload } from 'react-icons/ai';
export default function ClientProfileUpload() {
  const [imgs, setImgs] = useState(boyProfile);
  const [files, setFiles] = useState("");
 const [progress, setProgress] = useState(0);
const [disbaleBtn,setDisableBtn]=useState(false);


useEffect(()=>{

const getData=async()=>{
setProgress(40)
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
let data=await res.json();
setProgress(100)

if(!data){
router.push('/')
}
  if(data.unauthorized){
  toast.error(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
 setTimeout(Redirect, 1200);
    function Redirect() {
        localStorage.removeItem('clientToken')
  localStorage.removeItem('clientId')
  router.push('/ClientLogin')
    }
  }

   if(data.wrongUser){
   toast.error(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
 setTimeout(Redirect, 1200);
    function Redirect() {
        localStorage.removeItem('clientToken')
  localStorage.removeItem('clientId')
  router.push('/ClientLogin')
    }

  }
if(data.data.Profile!==""){
router.push('/')
}
  if(data.data.Gender=='male'){
  setImgs(boyProfile)
  }
  if(data.data.Gender=='female'){
  setImgs(girlProfile)
  }
}
getData();
},[])
 const handleChange = async (e) => {
    if (e.target.files[0]) {
      var file = e.target.files[0];
      setFiles(file);
  
      let url = await URL.createObjectURL(file);
      setImgs(url);
    }
  };



const uploadProfileImage=async(e)=>{
e.preventDefault();
setDisableBtn(true)

if(!files){
toast.warn('Please Upload Profile Photo', {
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
setProgress(40)
const data = new FormData();
    data.append("Profile", files);
    let sizeInMb = files.size / (1024 * 1024);
    let size=parseFloat(sizeInMb.toFixed(2))
  
// file size check
if(size>5){

  toast.warn('Please Upload File Less Than 5 Mb', {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });   setProgress(100);setDisableBtn(false)
  return ;
  }
   
 let res = await fetch(`${HOST}/api/ClientProfile`, {
      method: "POST",
      body: data,
    });

    let datas=await res.json();
    setProgress(100)
    if(res.status==401){
      toast.warn(`${datas.message}`, {
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
 
 if(res.status==501){
      toast.warn(`${datas.message}`, {
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
    if(res.status==201){
         toast.success('Profile Photo Successfully uploaded', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   
 setTimeout(Redirect, 1200);
    function Redirect() {
  router.push('/')
    }
    
    }
}
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
      <HeadTag title="Upload Client Profile" />
   <Header />
       </div>

    <div className={ProfileStyles.Profile}>
    <div className={ProfileStyles.left}>
<h1>Please Upload your Profile Photo</h1>
<div className={ProfileStyles.div}>

    <label className={ProfileStyles.custom_file_upload}>
<input
                type="file"
                name="photo"
                id="photoFood"
                onChange={handleChange}
              />
   <AiOutlineCloudUpload className={ProfileStyles.upload_icon} /> Select Profile
</label>
</div>

{(disbaleBtn)?<button disabled style={{cursor:'not-allowed'}}>Waiting...</button>:<button onClick={uploadProfileImage}>Upload Profile</button>}
</div>


 <div className={ProfileStyles.right}>
 <div className={ProfileStyles.image}>
  <Image src={imgs} alt="" id="output" layout="fill"/>
 </div>
 {(disbaleBtn)?<button disabled style={{cursor:'not-allowed'}}>Waiting...</button>:<button onClick={uploadProfileImage}>Upload Profile</button>}
 
</div>
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
