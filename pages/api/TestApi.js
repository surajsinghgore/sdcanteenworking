import OtpGenerate from "./models/OtpSend";


export default async function ShowRatingOfClient(req, res) {
    try {
        let otp=await OtpGenerate();
 return res.status(200).send(otp)
      
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  
}
