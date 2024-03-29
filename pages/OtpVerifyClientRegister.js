import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Link from "next/link";
import Styles from "../styles/admin.module.css";
import ClientStyle from "../styles/Signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import router from "next/router";
let HOST = process.env.NEXT_PUBLIC_API_URL;

export default function OtpVerifyClientRegister() {
  const [resend, setResend] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [progress, setProgress] = useState(0);
  const [disbaleBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("clientRegistrationEmail"));
    setTimeout(Redirect, 1000);
    function Redirect() {
      if (email == null || email == undefined) {
        router.push("/");
      }
    }
  }, []);

  const VerifyUser = async (e) => {
    e.preventDefault();
    setDisableBtn(true);

    if (!otp) {
      toast.warn("Please Enter OTP", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDisableBtn(false);
      return;
    }

    let count = 0;
    let otpDigit = parseInt(otp);
    let sum = 0;
    while (otpDigit) {
      sum += otpDigit % 10;
      ++count;
      otpDigit = Math.floor(otpDigit / 10);
    }
    if (count !== 6) {
      toast.warn("Please Enter 6 Digit OTP", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDisableBtn(false);
      return;
    }
    setProgress(40);

    const res = await fetch(`${HOST}/api/VerifyOtp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Otp: otp,
      }),
    });
    let data = await res.json();
    setProgress(60);

    if (data.status == 401) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDisableBtn(false);
      setProgress(100);

      return;
    }

    if (data.status == 400) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("clientRegistrationEmail");
      localStorage.removeItem("clientRegistrationId");
      setProgress(100);

      setTimeout(Redirect, 1500);
      function Redirect() {
        router.push("/Signup");
      }
      setDisableBtn(false);
      return;
    }
    if (data.status == 403) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("clientRegistrationEmail");
      setTimeout(Redirect, 1500);
      function Redirect() {
        router.push("/Signup");
      }
      setDisableBtn(false);
      return;
    }
    if (data.status == 501) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDisableBtn(false);
      return;
    }
    if (data.status == 201) {
      toast.success("Otp Verified Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("clientRegistrationEmail");
      setTimeout(Redirect, 1500);
      function Redirect() {
        router.push("/ClientLogin");
      }
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.success("please provide email id", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDisableBtn(false);
      return;
    }

    setProgress(40);
    const res = await fetch(`${HOST}/api/ResendOtp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
      }),
    });
    let data = await res.json();
    setProgress(100);
    if (res.status == 400) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (res.status == 201) {
      toast.success(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setResend(false);
      function resendOtps() {
        setResend(true);
      }
      setTimeout(resendOtps, 300000);
      return;
    }
  };

  const handleChange = (e) => {
    let len = e.target.value.toString();

    if (len.length <= 6) {
      setOtp(e.target.value);
    } else {
      toast.warn("OTP FIELD ONLY CONTAIN 6 DIGITS", {
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
        <HeadTag title="Client Otp Verify" />
        <Header />

        <div className={ClientStyle.clientLogin}>
          <div className={ClientStyle.form}>
            <h3>SD CANTEEN</h3>
            <h2 style={{textAlign:"center"}}>
              Otp Successfully send to <span>{email}</span>
            </h2>
            <form onSubmit={VerifyUser}>
              <li>
                <h6 style={{ top: "-48%" }}>
                  Enter 6 Digit Otp send to Email Id <span>*</span>
                </h6>
                <input
                  type="number"
                  name="otp"
                  placeholder="Enter OTP"
                  maxLength={6}
                  value={otp}
                  autoFocus
                  onChange={handleChange}
                />
                <TbDeviceMobileMessage className={ClientStyle.icon} />
              </li>

              {disbaleBtn ? (
                <button
                  disabled
                  style={{ cursor: "not-allowed", marginLeft: "36%" }}
                >
                  Waiting...
                </button>
              ) : (
                <button style={{ marginLeft: "36%" }} onClick={VerifyUser}>
                  Verify User
                </button>
              )}
            </form>

            <div className={ClientStyle.path}>
              {resend ? (
                <h4 onClick={resendOtp}>Resend Otp Again</h4>
              ) : (
                <h4 style={{ cursor: "text" }}>
                  New Otp request available in 5 minutes
                </h4>
              )}

              <h4 style={{ marginLeft: "12%" }}>
                <Link href="/Signup">Wrong Email Id ?</Link>
              </h4>
            </div>
          </div>
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
  );
}
