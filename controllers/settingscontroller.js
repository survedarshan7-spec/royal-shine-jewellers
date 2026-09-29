const Settings = require("../models/setting");


// ==========================================
// GET SETTINGS
// ==========================================

const getSettings = async (req, res) => {

    try {

        let settings = await Settings.findOne();

        // Create default settings if none exist
        if (!settings) {

            settings = await Settings.create({

                shopName:
                    "Royal Shine Jewellers",

                ownerName:
                    "",

                phoneNumber:
                    "",

                whatsappNumber:
                    "919999999999",

                email:
                    "",

                address:
                    "",

                mapLink:
                    "",

                logo:
                    "",

                instagram:
                    "",

                facebook:
                    "",

                about:
                    ""

            });

        }

        res.status(200).json({

            success: true,

            settings: settings

        });

    } catch (error) {

        console.error(
            "Get Settings Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to get settings",

            error:
                error.message

        });

    }

};


// ==========================================
// UPDATE SETTINGS
// ==========================================

const updateSettings = async (req, res) => {

    try {

        let settings =
            await Settings.findOne();

        if (!settings) {

            settings =
                new Settings(req.body);

        } else {

            Object.keys(req.body).forEach(
                (key) => {

                    settings[key] =
                        req.body[key];

                }
            );

        }

        const savedSettings =
            await settings.save();

        res.status(200).json({

            success: true,

            message:
                "Settings updated successfully",

            settings:
                savedSettings

        });

    } catch (error) {

        console.error(
            "Update Settings Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update settings",

            error:
                error.message

        });

    }

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    getSettings,

    updateSettings

};