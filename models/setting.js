const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
    {
        shopName: {
            type: String,
            default: "Royal Shine Jewellers",
            trim: true
        },

        ownerName: {
            type: String,
            default: "",
            trim: true
        },

        phoneNumber: {
            type: String,
            default: "",
            trim: true
        },

        whatsappNumber: {
            type: String,
            default: "919999999999",
            trim: true
        },

        email: {
            type: String,
            default: "",
            trim: true,
            lowercase: true
        },

        address: {
            type: String,
            default: "",
            trim: true
        },

        mapLink: {
            type: String,
            default: "",
            trim: true
        },

        logo: {
            type: String,
            default: "",
            trim: true
        },

        instagram: {
            type: String,
            default: "",
            trim: true
        },

        facebook: {
            type: String,
            default: "",
            trim: true
        },

        about: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Settings", settingsSchema);