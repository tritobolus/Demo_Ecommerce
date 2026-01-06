import express from 'express'
import bcrypt from "bcrypt";
import dbConnection from '../../../db/dbConnection.js';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/signup', async (req, res) => {
    const db = await dbConnection();

    try {
        const {address, email, firstName, lastName, password, phoneNo, pincode, state, panCard, storeName, description } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //checking email is already registered or not
        const sql1 = 'SELECT * FROM seller WHERE email_id = ?';
        const checkEmail = await db.query(sql1, [email]);
        if(checkEmail[0].length > 0) {
            return res.status(409).json({ message: "Email Alredy Registered!" });
        }

        //checking store name is already taken or not
        const sql2 = 'SELECT * FROM seller WHERE store_name = ?';
        const checkStorename = await db.query(sql2, [storeName]);
        if(checkStorename[0].length > 0) {
            return res.status(409).json({ message: "Store Name Alredy Taken!" });
        }

        //checking pan card is already taken or not
        const sql3 = 'SELECT * FROM seller WHERE pan_card = ?';
        const checkPan = await db.query(sql3, [panCard]);
        if(checkPan[0].length > 0) {
            return res.status(409).json({ message: "PAN Card Alredy Taken!" });
        }

        //insering seller data to database
        const sql4 = 'INSERT INTO seller (address, email_id, first_name, last_name, password, phone_no, pincode, state, pan_card, store_name, description ) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(sql4, [address, email, firstName, lastName, hashPassword, phoneNo, pincode, state, panCard, storeName, description])
        if(result[0].affectedRows > 0){
            return res.status(201).json({message: "seller Registered successfully"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server Error"});
    }
})

router.post('/signin', async (req, res) => {
    const db = await dbConnection();

    try {

        const {email, password, user } = req.body;

        const sql1 = 'SELECT * FROM seller WHERE email_id = ?';
        const sellerData = await db.query(sql1, [email]);

        if(sellerData[0].length == 0) {
            return res.status(404).json({ message: "Email not found" });
        }
        console.log(sellerData)

        const isMatch = await bcrypt.compare(password, sellerData[0][0].password);
        
            if (isMatch) {
              const payload = {
                user: user,
                email: email,
                userId: sellerData[0][0].seller_id,
              };
              const secretKey = process.env.SECRET_KEY;
              const options = { expiresIn: "1d" };
        
              const token = jwt.sign(payload, secretKey, options);
            //   console.log(token);
            
              res.cookie("token", token);
        
              res.status(200).json({ message: "Login successful" });
            } else {
              res.status(401).json({ message: "Invalid password" });
            }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server Error"});
    }
})

export default router;