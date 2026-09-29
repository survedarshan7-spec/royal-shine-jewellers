require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose
    .connect("mongodb://127.0.0.1:27017/jewellery_shop")
    .then(async () => {

        const hash = await bcrypt.hash("admin123", 10);

        const result = await User.updateOne(
            { email: "admin@gmail.com" },
            {
                $set: {
                    password: hash,
                    role: "admin"
                }
            }
        );

        console.log("ADMIN PASSWORD RESET SUCCESSFULLY");
        console.log(result);

        await mongoose.disconnect();
    })
    .catch((error) => {
        console.error("ERROR:", error);
    });