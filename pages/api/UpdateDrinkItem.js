import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import TopSearchSchema from './Schema/NumberOfSearch'


export default async function UpdateDrinkItem(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let verify = await VerifyAdmin(req, res);
      if (verify == undefined) {
        return res
          .status(401)
          .json({ message: "Please login with admin credentials" });
      }
      let id=req.body._id;
      if(id==undefined){
      return res.status(400).json({message:"please Provide Id Of Item"})
      }

      let DrinkName=req.body.DrinkName;
      let qty=req.body.Qty;
      let category=req.body.Category;
      let Active=req.body.Active;
let mediumsize=req.body.mediumsize;
let largesize=req.body.largesize;
let smallsize=req.body.smallsize;
let Description=req.body.Description;
let normalsize=req.body.normalsize;



// find records and check new name not duplicated
let findData=await DrinkItemSchema.findById(id);
// seacrh Data in
let searhData=await TopSearchSchema.findOne({ItemName:findData.DrinkName})


if(DrinkName!=findData.DrinkName){
let resDouble=await DrinkItemSchema.find({DrinkName:DrinkName});
if(resDouble.length!=0){
      return  res.status(400).json({ message: "Item Already Exits with this Item Name" });
 }
}

// change new name searchData
if(searhData!=null){
if(searhData.ItemName!=DrinkName){
await TopSearchSchema.findOneAndUpdate({_id:searhData._id},{$set:{"ItemName":DrinkName}})
}
}
await DrinkItemSchema.findOneAndUpdate({_id:id},{$set:{"DrinkName":DrinkName,"Qty":qty,"Category":category,"Active":Active,"Description":Description}})

if((normalsize!='')){
// already exists update price
let ms=false;
let ss=false;
let ls=false;

findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":normalsize}})
return res.status(201).json({message:"successfully updated"})
}
fired();
}
if(item.sizeName=="smallsize"){ss=true}
if(item.sizeName=="mediumsize"){ms=true}
if(item.sizeName=="largesize"){ls=true}
})
if(ms){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if(ss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"smallsize"}}})

}
if(ls){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
let ns=false;
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
ns=true;
}
})
if(ns==false){

await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"normalsize","Price":normalsize} }})
}
return res.status(201).json({message:"successfully updated"})
}


if((mediumsize!='')&&(smallsize!='')&&(largesize!='')){
let nss=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}
if(item.sizeName=="smallsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":smallsize}})
}
fired();
}
if(item.sizeName=="largesize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}

})
if(nss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
// new entry

let ms=false;
let ls=false
let ss=false
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
if(item.sizeName=="largesize"){
ls=true;
}
if(item.sizeName=="smallsize"){
ss=true;
}
})
if(ms==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}
if(ls==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}

if(ss==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"smallsize","Price":smallsize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((mediumsize!='')&&(smallsize!='')){
let nss=false;
let ls=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="largesize"){ls=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}
if(item.sizeName=="smallsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":smallsize}})
}
fired();
}

})
if(nss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ls){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
// new entry
let ms=false;
let ss=false
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
if(item.sizeName=="smallsize"){
ss=true;
}
})
if(ms==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}
if(ss==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"smallsize","Price":smallsize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((mediumsize!='')&&(largesize!='')){
let nss=false;
let hs=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="smallsize"){hs=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}

if(item.sizeName=="largesize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}
})
if(nss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(hs){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
}
// new entry
let ms=false;
let ls=false
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
if(item.sizeName=="largesize"){
ls=true;
}
})
if(ms==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}
if(ls==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((smallsize!='')&&(largesize!='')){
let nss=false;
let ms=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="normalsize"){ms=true}
if(item.sizeName=="smallsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":smallsize}})
}
fired();
}
if(item.sizeName=="largesize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}

})
if(nss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ms){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
// new entry

let ls=false
let ss=false
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="largesize"){
ls=true;
}
if(item.sizeName=="smallsize"){
ss=true;
}
})

if(ls==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}

if(ss==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"smallsize","Price":smallsize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((mediumsize!='')){
let nss=false;let ss=false;let ls=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="smallsize"){ss=true}
if(item.sizeName=="largesize"){ls=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}

})
if(nss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
}
if(ls){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
// new entry

let ms=false;
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
})
if(ms==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}

return res.status(201).json({message:"successfully updated"})

}

if((smallsize!='')){
let nss=false;
let ms=false;
let ls=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="mediumsize"){ms=true}
if(item.sizeName=="largesize"){ls=true}
if(item.sizeName=="smallsize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":smallsize}})
}
fired();
}
})
if(nss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ms){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if(ls){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
// new entry
let ss=false
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="smallsize"){
ss=true;
}
})
if(ss==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"smallsize","Price":smallsize} }})
}
return res.status(201).json({message:"successfully updated"})

}

if((largesize!='')){
let nss=false;
let ss=false;
let ms=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="mediumsize"){ms=true}
if(item.sizeName=="smallsize"){ss=true}
if(item.sizeName=="largesize"){
const fired=async()=>{
await DrinkItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}
})
if(nss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ms){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if(ss){
 await DrinkItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
}
// new entry


let ls=false
let newData=await DrinkItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="largesize"){
ls=true;
}

})

if(ls==false){
await DrinkItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}
return res.status(201).json({message:"successfully updated"})

}

    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
