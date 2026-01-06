import express from 'express'

import account from './customerSubRoutes/account.js'
import product from './customerSubRoutes/product.js'
import order from './customerSubRoutes/order.js'
import reviews from './customerSubRoutes/reviews.js'

const router = express.Router();

router.use("/account", account)
router.use("/product", product)
router.use("/order", order)
router.use("/reviews", reviews)

export default router;