const express = require("express");

const {
    createBill,
    getBills,
    getBill,
    deleteBill
} = require("../controllers/billController");

const {
    protect,
    adminOnly
} = require("../middlewarw/authMiddleware");

const router = express.Router();


// Create Bill
router.post(
    "/",
    protect,
    adminOnly,
    createBill
);


// Get All Bills
router.get(
    "/",
    protect,
    adminOnly,
    getBills
);


// Get Single Bill
router.get(
    "/:id",
    protect,
    adminOnly,
    getBill
);


// Delete Bill
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteBill
);


module.exports = router;