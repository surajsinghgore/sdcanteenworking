const otpGenerator = require('otp-generator')

const OtpGenerate = async (req, res) => {
    let optGenerateNumber=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});


// check 6 digit otp generated or not
if(optGenerateNumber.length>6 || optGenerateNumber.length<6){
return res.status(500).json({message:"Sorry Something went wrong,Please Register Again",otpError:"true"})
}
return optGenerateNumber;

};



export default OtpGenerate;
