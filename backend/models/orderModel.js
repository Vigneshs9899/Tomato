import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" }, // e.g., "Food Processing", "Out for Delivery", etc.
    date: { type: Date, default: Date.now },

    payment: { type: Boolean, default: false }, // deprecated or kept for legacy

    // NEW FIELDS
    paymentMethod: { type: String, default: "COD" }, // COD | Online
    paymentStatus: { type: String, default: "Pending" }, // Pending | Paid | Failed
    orderStatus: { type: String, default: "Placed" } // Placed | Cancelled | Delivered etc.
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
