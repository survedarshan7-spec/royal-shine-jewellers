const express = require("express");

const {
    getSettings,
    updateSettings
} = require("../controllers/settingscontroller");

const {
    protect,
    adminOnly
} = require("../middlewarw/authMiddleware");

const router = express.Router();


// ==========================================
// GET SHOP SETTINGS
// ==========================================

router.get(
    "/",
    getSettings
);


// ==========================================
// UPDATE SHOP SETTINGS
// ==========================================

router.put(
    "/",
    protect,
    adminOnly,
    updateSettings
);


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;