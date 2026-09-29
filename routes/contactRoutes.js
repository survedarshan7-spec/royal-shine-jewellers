const express = require("express");
const Contact = require("../models/Contact");

const {
    protect,
    adminOnly
} = require("../middlewarw/authMiddleware");

const router = express.Router();


// ==========================================
// CUSTOMER - SAVE CONTACT ENQUIRY
// ==========================================
router.post("/", async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            message
        } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        res.status(201).json({
            success: true,
            message: "Contact enquiry saved successfully",
            contact: contact
        });

    } catch (error) {

        console.error("Contact Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save contact enquiry",
            error: error.message
        });

    }
});


// ==========================================
// ADMIN - GET ALL CONTACT ENQUIRIES
// ==========================================
router.get("/", protect, adminOnly, async (req, res) => {
    try {

        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            contacts: contacts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch contact enquiries",
            error: error.message
        });

    }
});


// ==========================================
// ADMIN - UPDATE CONTACT STATUS
// ==========================================
router.put("/:id/status", protect, adminOnly, async (req, res) => {
    try {

        const {
            status
        } = req.body;

        const allowedStatuses = [
            "New",
            "Read",
            "Replied"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const contact =
            await Contact.findByIdAndUpdate(
                req.params.id,
                {
                    status: status
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact status updated successfully",
            contact: contact
        });

    } catch (error) {

        console.error(
            "Status Update Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to update contact status",
            error: error.message
        });

    }
});


// ==========================================
// ADMIN - DELETE CONTACT ENQUIRY
// ==========================================
router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {

        const contact =
            await Contact.findByIdAndDelete(
                req.params.id
            );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact enquiry deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete contact enquiry",
            error: error.message
        });

    }
});


module.exports = router;