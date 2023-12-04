import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TechProducts"
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    },
    { timestamps: true }
)

const Cart = mongoose.UserCart || mongoose.model("UserCart", CartSchema);

export default Cart;