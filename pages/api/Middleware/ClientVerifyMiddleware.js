const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const cookieParser=require('cookie-parser')


const VerifyClientUser=async(req,res)=>{
// get user from the jwt token and add id to req object
try {
await cookieParser();
const ClientToken= req.cookies.clinetToken; //auth-token is 
if(!ClientToken){
   return res.status(401).send({message:"please login with client credentials",unauthorized:"true"})
}

    const data=jwt.verify(ClientToken, JWT_SECRET);

return req.user=data.user;

} catch (error) {
console.log(error)
   return res.status(401).send({message:"please login with client credentials",unauthorized:"true"})
}

}


module.exports=VerifyClientUser;