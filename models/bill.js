const mongoose = require("mongoose");

const billItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: null
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
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

        rate: {
            type: Number,
            default: 0
        },

        makingCharges: {
            type: Number,
            default: 0
        },

        stoneCharges: {
            type: Number,
            default: 0
        },

        gstPercent: {
            type: Number,
            default: 0
        },

        gstAmount: {
            type: Number,
            default: 0
        },

        discount: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            default: 0
        }
    },
    {
        _id: false
    }
);


const billSchema = new mongoose.Schema(
    {
        billNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        customerName: {
            type: String,
            required: true,
            trim: true
        },

        customerMobile: {
            type: String,
            default: "",
            trim: true
        },

        billDate: {
            type: String,
            default: ""
        },

        items: {
            type: [billItemSchema],
            required: true
        },

        subTotal: {
            type: Number,
            default: 0
        },

        totalGST: {
            type: Number,
            default: 0
        },

        totalDiscount: {
            type: Number,
            default: 0
        },

        grandTotal: {
            type: Number,
            default: 0
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "UPI",
                "Card",
                "Bank Transfer"
            ],
            default: "Cash"
        }
    },
    {
        timestamps: true
    }
);


module.exports =
    mongoose.model(
        "Bill",
        billSchema
    );