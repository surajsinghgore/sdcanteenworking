import mongoose from "mongoose";

// items Order Schema
const ItemsOrderSchema = new mongoose.Schema({
  ItemName: { type: String, required: true },
  Qty: { type: Number, required: true },
  ProductOriginalAmount: { type: Number, required: true },
  Amount: { type: Number, required: true },
  Category: { type: String },
  Size: { type: String,required:true },
  OrderStatus: { type: String, default: "Pending", required: true },
  AmountReceived: { type: Number, default: 0, required: true },
  CategoryPrimary:{ type: String ,required:true,lowercase:true},
    paymentStatus:{type:String,required:true,default:"pending"}
});
const OrderSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientData",
      required: true,
    },

    FullName: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      lowercase: true,
      required: true,
    },
    Mobile: {
      type: Number,
      required: true,
    },
    FullAddress: {
      type: String,
      lowercase: true,
      required: true,
    },
    PickUpTime: {
      type: String,
      required: true,
      lowercase: true,
    },
     PickUpTime1: {
      type: mongoose.Types.Decimal128,
      required: true
    },
      PickUpTime2: {
      type: String,
      required: true
    },
    OrderTime: {
      type: String,
      lowercase: true,
    },
    OrderDate: {
      type: String,
      lowercase: true,
    },
    PaymentMethod: {
      type: String,
      lowercase: true,
      required: true,
    },
    TotalAmount: { type: Number, required: true },
    OrderStatus: { type: String, default: "Pending", required: true },
     PaymentOrderStatus: { type: String, default: "pending", required: true },
    AmountReceived: { type: Number, default: 0, required: true },
    OrderId: {
      type: String,
      required: true,
      lowercase: true,
    },
    TokenUser: {
      type: String,
      required: true,
      maxlength: 6,
      minlength: 6,
      lowercase: true,
    },
    PaymentInfo:{ type: Object,default:""},
    ItemsOrder: [ItemsOrderSchema],
  },
  { timestamps: true }
);

mongoose.models = {};

const OrderSchemaDataBase =
  mongoose.models.OrderSchema || mongoose.model("OrderItems", OrderSchema);

export default OrderSchemaDataBase;
