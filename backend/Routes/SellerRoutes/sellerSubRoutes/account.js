import express from 'express'
import verifyUser from '../../../middleware/verifyUser.js';
import dbConnction from '../../../db/dbConnection.js'


const router = express.Router();

router.get("/details", verifyUser, async(req, res) => {
    const db = await dbConnction();
    console.log("hi from seller details")
    try {
        const sellerId = req.userId;
        const SQL = "SELECT * from seller WHERE seller_id = ?"
        const [rows] = await db.query(SQL,[sellerId])
        const details = rows[0]
        return res.status(200).json({message:"Get seller details", details:details})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    } finally {
        await db.end()
    }
})

export default router;