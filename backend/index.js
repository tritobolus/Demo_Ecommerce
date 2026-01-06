import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './Routes/AuthRoutes/authRoutes.js'
import sellerRoutes from './Routes/SellerRoutes/sellerRoutes.js'
import customerRoutes from './Routes/CustomerRoutes/customerRoutes.js'
import general from './Routes/General/general.js'
import admin from './Routes/AdminRoutes/adminRouts.js'


dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/auth', authRoutes)
app.use('/seller', sellerRoutes)
app.use('/customer', customerRoutes)
app.use('/admin', admin)
app.use('/general', general)

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => console.log(`Server is runing...`) );