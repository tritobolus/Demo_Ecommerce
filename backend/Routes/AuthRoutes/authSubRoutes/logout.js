import jwt from 'jsonwebtoken'
import express from 'express'

const router = express.Router();


router.get('/', (req, res) => {
    try {
    res.clearCookie("token"); 
    return res.status(200).json({ status: "Success" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Can't delete JWT token!" });
  }
})

export default router;