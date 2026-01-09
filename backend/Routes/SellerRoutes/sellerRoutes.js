import express from 'express'
import product from './sellerSubRoutes/product.js'
import account from './sellerSubRoutes/account.js'
import order from './sellerSubRoutes/orders.js'
import dbConnection from '../../db/dbConnection.js';

const router = express.Router();

router.use("/product",product)
router.use("/account",account)
router.use("/order",order)

router.get("/get_sellers", async(req,res) => {
    const db = await dbConnection();
    try {
        const sql = "Select * from seller";
        const rows = await db.query(sql);
        // console.log(rows)
        return res.status(200).json({messag:"Get all seller data!", seller:rows[0]})
    } catch (error) {
        console.log(error)
        return res.status(500).json({messag:"Internal server error"})
    }
})

router.put("/edit_seller", async(req,res) => {
    const db = await dbConnection();
    try {
        const formData = req.body;
        // console.log(formData);
        const sql = 'update seller set first_name = ?, last_name = ?, phone_no = ?, address = ?, state = ?, pincode = ?, store_name = ?, status = ?, pan_card = ? where seller_id = ?';

        const rows = await db.query(sql, [formData.first_name, formData.last_name, formData.phone_no, formData.address, formData.state,formData.pincode, formData.store_name, formData.status, formData.pan_card, formData.seller_id])
        console.log(rows)

        return res.status(200).json({message:"Update seller details"})
    } catch (error) {
        console.log(error) 
        return res.status(500).json({message:"Iternal Servr Error"})
    }
})

export default router;