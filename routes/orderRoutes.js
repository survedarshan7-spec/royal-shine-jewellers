const express = require("express");

const {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/OrderController");

const router = express.Router();

// Create order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get single order
router.get("/:id", getOrder);

// Update order status
router.put("/:id", updateOrderStatus);

// Delete order
router.delete("/:id", deleteOrder);

module.exports = router;