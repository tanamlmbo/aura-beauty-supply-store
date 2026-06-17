import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;