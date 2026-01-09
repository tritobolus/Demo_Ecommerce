import express from 'express';
import dbConnection from "../../db/dbConnection.js";
import verifyUser from '../../middleware/verifyUser.js';


const router = express.Router()

router.get("/get_admins", verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const currentAdmin = req.query.currentAdmin;
        console.log(currentAdmin)
        const sql1 = "select * from admin";
        const sql2 = "select * from admin where role = ?";
        var admins=[];
        if(currentAdmin == 'allAdmin') {
            const rows = await db.query(sql1);
            admins = rows;
        } else {
            const rows = await db.query(sql2,[currentAdmin])
            admins = rows;
        }
        return res.status(200).json({message:"get all admin", admin:admins[0]}) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Iternal Servr Error"})
    } finally{
        await db.end()
    }
})

router.put("/edit_admin", async(req,res) => {
    const db = await dbConnection();
    try {
        const formData = req.body;
        console.log(formData);
        const sql = 'update admin set first_name = ?, last_name = ?, phone_no = ?, address = ?, state = ?, pincode = ?, role = ?, status = ? where admin_id = ?';

        const rows = await db.query(sql, [formData.first_name, formData.last_name, formData.phone_no, formData.address, formData.state,formData.pincode, formData.role, formData.status, formData.admin_id])
        console.log(rows)

        return res.status(200).json({message:"Update Admin details"})
    } catch (error) {
        console.log(error) 
        return res.status(500).json({message:"Iternal Servr Error"})
    }
})

export default router