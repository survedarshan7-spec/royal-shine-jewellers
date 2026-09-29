const express = require("express");

const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteGalleryImage,
    submitRating
} = require("../controllers/productController");

const {
    protect,
    adminOnly
} = require("../middlewarw/authMiddleware");

const router = express.Router();


// ==========================================
// PUBLIC ROUTES - CUSTOMER WEBSITE
// ==========================================

router.get("/", getProducts);

router.get("/:id", getProduct);


// ==========================================
// CUSTOMER RATING
// ==========================================

// Customer can submit rating without login
router.post("/:id/rating", submitRating);


// ==========================================
// ADMIN PROTECTED ROUTES
// ==========================================

router.post(
    "/",
    protect,
    adminOnly,
    addProduct
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateProduct
);

router.delete(
    "/:id/gallery/:index",
    protect,
    adminOnly,
    deleteGalleryImage
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProduct
);


module.exports = router;