import express from 'express'
import verifyUser from '../../../middleware/verifyUser.js';
import dbConnection from '../../../db/dbConnection.js';

const router = express.Router()

router.get("/details", verifyUser, async(req,res) => {
    const db = await dbConnection()
    try {
        const customerId = req.userId;
        console.log("customer id : ",customerId)
        const SQL = "SELECT * from customer where customer_id = ?"
        const [rows] = await db.query(SQL,[customerId])
        console.log("customer details",rows[0])
        return res.status(200).json({message:"Get customer details", details:rows[0]})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"}); 
    }
})

export default router;