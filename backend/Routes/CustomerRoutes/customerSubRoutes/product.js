import express from 'express'
import dbConnection from '../../../db/dbConnection.js'
import verifyUser from '../../../middleware/verifyUser.js'

const router = express.Router()

router.post("/addToWishlist",verifyUser, async(req,res) => {
    const db = await dbConnection()
    try {
        const customerId = req.userId;
        const productId = req.body.productId;
        const sql = "select * from wishlist where customer_id = ? AND product_id = ?"
        const [rows] = await db.query(sql,[customerId,productId])
        if(rows.length>0) {
            return res.status(409).json({message:"Already in wishlist"})
        }
        const SQL = 
        `insert into wishlist (customer_id , product_id) values (?,?);`;

        const [result] = await db.query(SQL,[customerId, productId]);
    
        return res.status(200).json({message:"Add to wishlist"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }finally{
        await db.end()
    }
})
router.get("/getWishlist",verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const customerId = req.userId;
        const SQL = 
        ` 
            select w.wishlist_id as wishlistId, p.product_id as productId, p.product_name as productName, p.product_model as productModel, p.product_brand as productBrand, p.price, p.description, p.discount, i.image_path as imagePath 
            from wishlist as w
            left join products as p
            on w.product_id = p.product_id
            left join productimage as i
            on i.product_id = w.product_id
            where w.customer_id = 12 And p.status = "enable" ;

        `
        const [rows] = await db.query(SQL,[customerId]);
    
        return res.status(200).json({message:"Get wishlist", wishlist:rows})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }finally{
        await db.end()
    }
})
router.delete("/removeWishlist", verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const wishlistId = req.query.wishlistId;
        const customerId = req.userId;
        const SQL = "DELETE FROM wishlist WHERE wishlist_id = ? AND customer_id = ?";
        const [rows] = await db.query(SQL,[wishlistId,customerId]);
        console.log(rows)
        if(rows.affectedRows > 0) {
            return res.status(200).json({message:"Remove wishlist successfully"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }finally{
        await db.end()
    }
})


router.post("/addToCart",verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const customerId = req.userId;
        const productId = req.body.productId;
        const sql = "select * from cart where customer_id = ? AND product_id = ?"
        const [rows] = await db.query(sql,[customerId,productId])
        if(rows.length>0) {
            return res.status(409).json({message:"Already in cart"})
        }
        const SQL = 
        `insert into cart (customer_id , product_id) values (?,?);`;

        const [result] = await db.query(SQL,[customerId, productId]);
    
        return res.status(200).json({message:"Added to cart"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }finally{
        await db.end()
    }
})
router.get("/getCart",verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const customerId = req.userId;
        const SQL = 
        ` 
            select c.cart_id, c.quantity, p.product_id, p.product_name, p.price, p.discount, i.image_path, s.seller_id, s.first_name, s.last_name, s.store_name
            from cart as c
            left join products as p
            on c.product_id = p.product_id
            left join productimage as i
            on p.product_id  = i.product_id
            left join seller as s
            on s.seller_id = p.seller_id
            where customer_id = ?;
        `

        const [rows] = await db.query(SQL,[customerId]);
    
        return res.status(200).json({message:"get cart", cart:rows})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }finally{
        await db.end()
    }
})
router.patch("/increaseQuantity",verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const customerId = req.userId;
        const productId = req.body.productId
        const SQL = 
        ` 
            update cart
            set quantity = quantity+1
            where customer_id = ? AND product_id = ?;
        `
       
        const [rows] = await db.query(SQL,[customerId, productId]);
         if (rows.affectedRows === 0) {
            return res.status(400).json({ message: "Item not found in cart" });
        }
    
        return res.status(200).json({message:"Quantity increased"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }finally{
        await db.end()
    }
})
router.patch("/decreaseQuantity",verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const customerId = req.userId;
        const productId = req.body.productId
        const quantity = req.body.quantity

        if(quantity === 1) {
            return res.status(400).json({message:"Can't be less than 1 iteams"})
        }
        const SQL = 
        ` 
            update cart
            set quantity = quantity-1
            where customer_id = ? AND product_id = ?;
        `
       
        const [rows] = await db.query(SQL,[customerId, productId]);
         if (rows.affectedRows === 0) {
            return res.status(400).json({ message: "Item not found in cart" });
        }
    
        return res.status(200).json({message:"Quantity decreased"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }finally{
        await db.end()
    }
})
router.delete("/removeFromCart", verifyUser, async(req,res) => {
    const db = await dbConnection();
    try {
        const cartId = req.query.cartId;
        const customerId = req.userId;
        const SQL = "DELETE FROM cart WHERE cart_id = ? AND customer_id = ?"
        const [rows] = await db.query(SQL,[cartId,customerId]);
        console.log(rows)
        if(rows.affectedRows > 0) {
            return res.status(200).json({message:"Remove cart successfully"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }finally{
        await db.end()
    }
})


export default router;