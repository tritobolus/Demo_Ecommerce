import express from 'express'
import verifyUser from '../../../middleware/verifyUser.js';
import dbConnection from '../../../db/dbConnection.js';

const router = express.Router();

router.get('/', verifyUser, async(req, res) => {
    const db = await dbConnection();

    try {
        console.log("user: ",req.user)
        console.log("user id: ",req.userId)
        const SQL = `SELECT * FROM ${req.user} WHERE ${req.user}_id = ? `
        const [userDetails] = await db.query(SQL,[req.userId])

        return res.json({status: "Success", user:req.user, email:req.email, userId:req.userId, userDetails:userDetails[0]})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
        
    } finally{
        await db.end();
    }
})

export default router;