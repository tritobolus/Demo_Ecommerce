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
    } finally{
        await db.end()
    }
})

export default router