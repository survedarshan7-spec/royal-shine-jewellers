const Product = require("../models/product");


// ==========================================
// ADD PRODUCT
// ==========================================

exports.addProduct = async (req, res) => {
    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Product adding failed",
            error: error.message
        });

    }
};


// ==========================================
// GET ALL PRODUCTS
// ==========================================

exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================================
// GET PRODUCT BY ID
// ==========================================

exports.getProduct = async (req, res) => {
    try {

        const product =
            await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================================
// UPDATE PRODUCT
// ==========================================

exports.updateProduct = async (req, res) => {
    try {

        const product =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Product update failed",
            error: error.message
        });

    }
};


// ==========================================
// DELETE GALLERY IMAGE
// ==========================================

exports.deleteGalleryImage = async (req, res) => {
    try {

        const product =
            await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        const index = Number(req.params.index);

        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= product.images.length
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid gallery image index"
            });

        }

        product.images.splice(index, 1);

        await product.save();

        res.status(200).json({
            success: true,
            message: "Gallery image deleted successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Gallery image delete failed",
            error: error.message
        });

    }
};


// ==========================================
// DELETE PRODUCT
// ==========================================

exports.deleteProduct = async (req, res) => {
    try {

        const product =
            await Product.findByIdAndDelete(
                req.params.id
            );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Product delete failed",
            error: error.message
        });

    }
};


// ==========================================
// SUBMIT CUSTOMER RATING
// ==========================================

exports.submitRating = async (req, res) => {
    try {

        const product =
            await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        const rating = Number(req.body.rating);

        // Check rating
        if (
            !Number.isFinite(rating) ||
            rating < 1 ||
            rating > 5
        ) {

            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });

        }

        const oldRatingCount =
            product.ratingCount || 0;

        const oldRating =
            product.rating || 0;

        const newRatingCount =
            oldRatingCount + 1;

        const newRating =
            (
                (oldRating * oldRatingCount) +
                rating
            ) / newRatingCount;

        product.rating =
            Number(newRating.toFixed(1));

        product.ratingCount =
            newRatingCount;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Rating submitted successfully",
            rating: product.rating,
            ratingCount: product.ratingCount
        });

    } catch (error) {

        console.error(
            "Rating Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Rating submission failed",
            error: error.message
        });

    }
};