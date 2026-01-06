import express from 'express'
import product from './sellerSubRoutes/product.js'
import account from './sellerSubRoutes/account.js'
import order from './sellerSubRoutes/orders.js'

const router = express.Router();

router.use("/product",product)
router.use("/account",account)
router.use("/order",order)

export default router;