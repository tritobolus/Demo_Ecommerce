import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnection from "../../../db/dbConnection.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const db = await dbConnection();

  try {
    const {
      address,
      email,
      firstName,
      lastName,
      password,
      phoneNo,
      pincode,
      state,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const sql1 = "SELECT * FROM customer WHERE email_id = ?";
    const sql2 =
      "INSERT INTO customer (address, email_id, first_name, last_name, password, phone_no, pincode, state ) VALUE(?, ?, ?, ?, ?, ?, ?, ?)";

    const data = await db.query(sql1, [email]);
    if (data[0].length > 0) {
      return res.status(409).json({ message: "Email Alredy Registered!" });
    }

    const result = await db.query(sql2, [
      address,
      email,
      firstName,
      lastName,
      hashPassword,
      phoneNo,
      pincode,
      state,
    ]);
    if (result[0].affectedRows > 0) {
      return res.status(201).json({ message: "user Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const db = await dbConnection();

  try {
    const { email, password, user } = req.body;

    const sql1 = "SELECT * FROM customer WHERE email_id = ?";
    const userData = await db.query(sql1, [email]);

    if (userData[0].length == 0) {
      return res.status(404).json({ message: "Email not found" });
    }


    const isMatch = await bcrypt.compare(password, userData[0][0].password);

    if (isMatch) {
      const payload = {
        user: user,
        email: email,
        userId: userData[0][0].customer_id,
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
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
});

export default router;
