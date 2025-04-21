// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true, ref: "user" },
//     items: [
//       {
//         product: { type: String, required: true, ref: "product" },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     amount: { type: Number, required: true },
//     address: { type: String, required: true, ref: "address" },
//     status: { type: String, default: "Order Placed" },
//     paymentType: { type: String, required: true },
//     isPaid: { type: Boolean, required: true, default: false },
//   },
//   { timestamps: true } // Fixed timestamps for createdAt and updatedAt
// );

// const Order = mongoose.models.order || mongoose.model("order", orderSchema);
// export default Order;





import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User", // Use ObjectId for better relational mapping
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Validation for positive quantity
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
      min: 0, // Validation for non-negative amounts
    },
    address: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Address",
    },
    status: {
      type: String,
      default: "Order Placed", // Default status
    },
    paymentType: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Use existing model if it exists, or create a new one
const Order = models.Order || model("Order", orderSchema);

export default Order;

