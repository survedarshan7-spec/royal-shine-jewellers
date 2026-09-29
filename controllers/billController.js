const Bill = require("../models/bill");


/* =========================
   GENERATE BILL NUMBER
========================= */

const generateBillNumber = async () => {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const datePrefix =
        `${year}${month}${day}`;


    const prefix =
        `RSJ-${datePrefix}-`;


    /*
     * Find all bills created today
     * having today's bill number prefix.
     */

    const todayBills =
        await Bill.find({

            billNumber: {
                $regex:
                    `^${prefix}`
            }

        }).select(
            "billNumber"
        );


    /*
     * Find the highest bill number
     * instead of relying on string sorting.
     */

    let highestNumber = 0;


    todayBills.forEach(
        (bill) => {

            const number =
                parseInt(
                    bill.billNumber
                        .split("-")
                        .pop(),
                    10
                );


            if(
                !isNaN(number) &&
                number > highestNumber
            ){

                highestNumber =
                    number;

            }

        }
    );


    /*
     * Next bill number
     */

    const nextNumber =
        highestNumber + 1;


    /*
     * Final format:
     *
     * RSJ-20260926-0001
     * RSJ-20260926-0002
     * RSJ-20260926-0003
     */

    return (
        prefix +
        String(nextNumber)
            .padStart(4, "0")
    );

};


/* =========================
   CREATE BILL
========================= */

const createBill = async (
    req,
    res
) => {

    try{

        /*
         * Generate bill number
         * automatically.
         */

        const billNumber =
            await generateBillNumber();


        /*
         * Ignore bill number
         * sent from frontend.
         */

        const billData = {

            ...req.body,

            billNumber:
                billNumber

        };


        /*
         * Create new bill
         */

        const bill =
            new Bill(
                billData
            );


        /*
         * Save bill to MongoDB
         */

        const savedBill =
            await bill.save();


        /*
         * Success response
         */

        res.status(201).json({

            success: true,

            message:
                "Bill created successfully",

            bill:
                savedBill

        });

    }
    catch(error){

        console.error(
            "Create Bill Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to create bill",

            error:
                error.message

        });

    }

};


/* =========================
   GET ALL BILLS
========================= */

const getBills = async (
    req,
    res
) => {

    try{

        const bills =
            await Bill.find()
                .sort({
                    createdAt: -1
                });


        res.status(200).json({

            success: true,

            count:
                bills.length,

            bills:
                bills

        });

    }
    catch(error){

        console.error(
            "Get Bills Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to get bills",

            error:
                error.message

        });

    }

};


/* =========================
   GET SINGLE BILL
========================= */

const getBill = async (
    req,
    res
) => {

    try{

        const bill =
            await Bill.findById(
                req.params.id
            );


        if(!bill){

            return res.status(404).json({

                success: false,

                message:
                    "Bill not found"

            });

        }


        res.status(200).json({

            success: true,

            bill:
                bill

        });

    }
    catch(error){

        console.error(
            "Get Bill Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to get bill",

            error:
                error.message

        });

    }

};


/* =========================
   DELETE BILL
========================= */

const deleteBill = async (
    req,
    res
) => {

    try{

        const bill =
            await Bill.findByIdAndDelete(
                req.params.id
            );


        if(!bill){

            return res.status(404).json({

                success: false,

                message:
                    "Bill not found"

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Bill deleted successfully"

        });

    }
    catch(error){

        console.error(
            "Delete Bill Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to delete bill",

            error:
                error.message

        });

    }

};


/* =========================
   EXPORT
========================= */

module.exports = {

    createBill,

    getBills,

    getBill,

    deleteBill

};

