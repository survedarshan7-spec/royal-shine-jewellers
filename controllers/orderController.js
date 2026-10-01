const Order = require("../models/order");

// Create order
const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(400).json({
            message: "Order creation failed",
            error: error.message
        });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("products.product");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// Get single order
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user")
            .populate("products.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching order",
            error: error.message
        });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order status updated",
            order
        });

    } catch (error) {
        res.status(400).json({
            message: "Error updating order",
            error: error.message
        });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting order",
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder
};