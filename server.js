const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// ==============================
// ENV
// ==============================

dotenv.config();

// ==============================
// APP
// ==============================

const app = express();

const PORT = 5000;

// ==============================
// PATHS
// ==============================

const websiteFolder = path.join(
    __dirname,
    ".."
);

const uploadsFolder = path.join(
    __dirname,
    "uploads"
);

const assetsFolder = path.join(
    __dirname,
    "..",
    "assets"
);

// ==============================
// CREATE UPLOAD FOLDER
// ==============================

if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(
        uploadsFolder,
        {
            recursive: true
        }
    );
}

// ==============================
// MIDDLEWARE
// ==============================

app.use(
    cors()
);

app.use(
    express.json({
        limit: "10mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb"
    })
);

// ==============================
// STATIC WEBSITE
// ==============================

app.use(
    express.static(
        websiteFolder
    )
);

// ==============================
// STATIC UPLOADS
// ==============================

app.use(
    "/uploads",
    express.static(
        uploadsFolder
    )
);

// ==============================
// STATIC ASSETS
// ==============================

app.use(
    "/assets",
    express.static(
        assetsFolder
    )
);

// ==============================
// ROUTES
// ==============================

const productRoutes =
    require('./routes/productRoutes');

const userRoutes =
    require("./routes/userRoutes");

const orderRoutes =
    require("./routes/orderRoutes");

const billRoutes =
    require("./routes/billroutes");

const settingsRoutes =
    require("./routes/settingsroutes");

// ==============================
// API ROUTES
// ==============================

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(
    "/api/bills",
    billRoutes
);

app.use(
    "/api/settings",
    settingsRoutes
);

// ==============================
// MULTER STORAGE
// ==============================

const storage =
    multer.diskStorage({

        destination:
            function (
                req,
                file,
                cb
            ) {

                cb(
                    null,
                    uploadsFolder
                );

            },

        filename:
            function (
                req,
                file,
                cb
            ) {

                const extension =
                    path.extname(
                        file.originalname
                    );

                const filename =
                    Date.now() +
                    "-" +
                    Math.round(
                        Math.random() *
                        100000000
                    ) +
                    extension;

                cb(
                    null,
                    filename
                );

            }

    });

// ==============================
// FILE FILTER
// ==============================

const fileFilter =
    function (
        req,
        file,
        cb
    ) {

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (
            allowedTypes.includes(
                file.mimetype
            )
        ) {

            cb(
                null,
                true
            );

        }

        else {

            cb(
                new Error(
                    "Only JPG, JPEG, PNG and WEBP images are allowed."
                )
            );

        }

    };

// ==============================
// MULTER
// ==============================

const upload =
    multer({

        storage:
            storage,

        fileFilter:
            fileFilter,

        limits: {
            fileSize:
                10 * 1024 * 1024
        }

    });

// ==============================
// AUTH MIDDLEWARE
// ==============================

const {
    protect,
    adminOnly
} =
    require(
        "./middlewarw/authMiddleware"
    );

// ==============================
// IMAGE UPLOAD API
// ==============================

app.post(
    "/api/upload",
    protect,
    adminOnly,
    upload.single("image"),

    function (
        req,
        res
    ) {

        try {

            if (!req.file) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "No image uploaded"

                    });

            }

            const imagePath =
                "/uploads/" +
                req.file.filename;

            res.status(200).json({

                success: true,

                message:
                    "Image uploaded successfully",

                image:
                    imagePath,

                filename:
                    req.file.filename

            });

        }

        catch (error) {

            console.error(
                "UPLOAD ERROR:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Image upload failed",

                error:
                    error.message

            });

        }

    }
);

// ==============================
// HEALTH CHECK
// ==============================

app.get(
    "/api/health",

    function (
        req,
        res
    ) {

        res.json({

            success: true,

            message:
                "Backend is working",

            mongodb:
                mongoose.connection.readyState === 1
                    ? "Connected"
                    : "Disconnected"

        });

    }
);

// ==============================
// ROOT WEBSITE
// ==============================

app.get(
    "/",

    function (
        req,
        res
    ) {

        const indexFile =
            path.join(
                websiteFolder,
                "index.html"
            );

        if (
            fs.existsSync(
                indexFile
            )
        ) {

            res.sendFile(
                indexFile
            );

        }

        else {

            res.status(404).send(
                "index.html not found"
            );

        }

    }
);

// ==============================
// 404 API HANDLER
// ==============================

app.use(
    "/api",

    function (
        req,
        res
    ) {

        res.status(404).json({

            success: false,

            message:
                "API route not found",

            path:
                req.originalUrl

        });

    }
);

// ==============================
// GENERAL ERROR HANDLER
// ==============================

app.use(
    function (
        error,
        req,
        res,
        next
    ) {

        console.error(
            "SERVER ERROR:",
            error
        );

        if (
            error instanceof multer.MulterError
        ) {

            return res
                .status(400)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

        res.status(500).json({

            success: false,

            message:
                error.message ||
                "Internal server error"

        });

    }
);

// ==============================
// MONGODB CONNECTION
// ==============================

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/jewellery";

mongoose
    .connect(
        MONGO_URI
    )
    .then(
        function () {

            console.log(
                "MongoDB Connected Successfully"
            );

        }
    )
    .catch(
        function (error) {

            console.error(
                "MongoDB Connection Error:",
                error.message
            );

        }
    );

// ==============================
// START SERVER
// ==============================

app.listen(
    PORT,

    function () {

        console.log(
            "----------------------------------"
        );

        console.log(
            "Jewellery Backend Server Started"
        );

        console.log(
            "Server: http://localhost:" +
            PORT
        );

        console.log(
            "Website: http://localhost:" +
            PORT +
            "/"
        );

        console.log(
            "Products: http://localhost:" +
            PORT +
            "/api/products"
        );

        console.log(
            "Users: http://localhost:" +
            PORT +
            "/api/users"
        );

        console.log(
            "Orders: http://localhost:" +
            PORT +
            "/api/orders"
        );

        console.log(
            "Bills: http://localhost:" +
            PORT +
            "/api/bills"
        );

        console.log(
            "Health: http://localhost:" +
            PORT +
            "/api/health"
        );

        console.log(
            "Settings: http://localhost:" +
            PORT +
            "/api/settings"
        );

        console.log(
            "Uploads: http://localhost:" +
            PORT +
            "/uploads/"
        );

        console.log(
            "Assets: http://localhost:" +
            PORT +
            "/assets/"
        );

        console.log(
            "----------------------------------"
        );

    }
);