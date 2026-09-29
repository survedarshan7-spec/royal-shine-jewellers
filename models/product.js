const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        // Final product amount
        price: {
            type: Number,
            required: true
        },

        // Rate per gram
        rate: {
            type: Number,
            default: 0
        },

        // GST percentage
        gst: {
            type: Number,
            default: 3
        },

        // Amount before GST = Weight × Rate
        metalAmount: {
            type: Number,
            default: 0
        },

        // GST amount
        gstAmount: {
            type: Number,
            default: 0
        },

        // Final amount after GST
        totalAmount: {
            type: Number,
            default: 0
        },

        weight: {
            type: String,
            default: ""
        },

        metal: {
            type: String,
            default: ""
        },

        purity: {
            type: String,
            default: ""
        },

        size: {
            type: String,
            default: ""
        },

        stone: {
            type: String,
            default: ""
        },

        stock: {
            type: Number,
            default: 0
        },

        image: {
            type: String,
            default: ""
        },

        images: {
            type: [String],
            default: []
        },

        featured: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },

        // Customer rating
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        // Number of ratings
        ratingCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);