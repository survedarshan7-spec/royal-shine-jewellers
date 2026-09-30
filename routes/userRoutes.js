const express = require("express");

const {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get all users
router.get("/", getUsers);

// Get single user
router.get("/:id", getUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;