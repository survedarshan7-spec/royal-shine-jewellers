const Newsletter = require("../models/newsletter");

// Subscribe to newsletter
const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const existingEmail = await Newsletter.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already subscribed"
            });
        }

        const newsletter = await Newsletter.create({
            email: email
        });

        res.status(201).json({
            message: "Subscribed successfully",
            newsletter
        });

    } catch (error) {
        res.status(500).json({
            message: "Newsletter subscription failed",
            error: error.message
        });
    }
};

// Get all subscribers
const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find();

        res.status(200).json(subscribers);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching subscribers",
            error: error.message
        });
    }
};

// Delete subscriber
const deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Newsletter.findByIdAndDelete(
            req.params.id
        );

        if (!subscriber) {
            return res.status(404).json({
                message: "Subscriber not found"
            });
        }

        res.status(200).json({
            message: "Subscriber deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting subscriber",
            error: error.message
        });
    }
};

module.exports = {
    subscribeNewsletter,
    getSubscribers,
    deleteSubscriber
};