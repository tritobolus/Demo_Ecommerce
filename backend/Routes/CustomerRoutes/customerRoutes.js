import express from 'express'

import account from './customerSubRoutes/account.js'
import product from './customerSubRoutes/product.js'
import order from './customerSubRoutes/order.js'
import reviews from './customerSubRoutes/reviews.js'

import dbConnection from '../../db/dbConnection.js'

const router = express.Router();

router.use("/account", account)
router.use("/product", product)
router.use("/order", order)
router.use("/reviews", reviews)

router.get("/get_customer", async(req,res) => {
    const db = await dbConnection();
    try {
        const sql = "Select * from customer order by customer_id desc";
        const rows = await db.query(sql);
        return res.status(200).json({messag:"Get all customer data!", customer:rows[0]})
    } catch (error) {
        console.log(error)
        return res.status(500).json({messag:"Internal server error"})
    }
})

router.put("/edit_customer", async(req,res) => {
    const db = await dbConnection();
    try {
        const formData = req.body;
        const sql = 
            'update customer set first_name = ?, last_name = ?, phone_no = ?, address = ?, state = ?, pincode = ?, status = ? where customer_id = ? ';

        await db.query(sql, [formData.first_name, formData.last_name, formData.phone_no, formData.address, formData.state,formData.pincode, formData.status, formData.customer_id])

        return res.status(200).json({message:"Update customer details"})
    } catch (error) {
        console.log(error) 
        return res.status(500).json({message:"Iternal Servr Error"})
    }
})

export default router;