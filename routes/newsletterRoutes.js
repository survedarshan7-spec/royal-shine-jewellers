const express = require("express");

const {
    subscribeNewsletter,
    getSubscribers,
    deleteSubscriber
} = require("../controllers/newsletterController");

const router = express.Router();

// Subscribe
router.post("/", subscribeNewsletter);

// Get all subscribers
router.get("/", getSubscribers);

// Delete subscriber
router.delete("/:id", deleteSubscriber);

module.exports = router;