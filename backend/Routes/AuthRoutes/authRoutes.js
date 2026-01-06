import express from 'express'
import authCustomer from './authSubRoutes/authCustomer.js'
import authSeller from './authSubRoutes/authSeller.js'
import authAdmin from './authSubRoutes/authAdmin.js'
import verifyuser from './authSubRoutes/verifyuser.js'
import logout from './authSubRoutes/logout.js'

const router = express.Router();

router.use('/customer', authCustomer)
router.use('/seller', authSeller)
router.use('/admin', authAdmin)
router.use('/verification', verifyuser)
router.use('/logout', logout)

export default router;