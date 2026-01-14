import express from 'express'
import dbConnection from '../../db/dbConnection.js'
const router = express.Router()

router.get("/getproducts", async(req,res) => {
    const db = await dbConnection()
    try {
        const SQL = 
        `select p.product_id, p.product_name, p.price, p.discount, p.product_model, p.product_brand, p.description, p.status, p.category_id, p.sub_category_id, s.seller_id, s.store_name, i.image_path
        from products as p
        left join seller as s
        on p.seller_id = s.seller_id    
        left join productimage as i
        on p.product_id = i.product_id
        where p.status != 'disable'`;

        const [rows] = await db.query(SQL);
        return res.status(200).json({message:"get all products", products:rows})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    } finally{
        await db.end();
    }
})


router.get("/get_single_product", async(req,res) => {
    const db = await dbConnection()
    try {
        const {productId} = req.query
        const SQL = 
        `
        select p.product_id, p.product_name, p.product_brand, p.product_model, p.price, p.description, p.stock, p.status, p.discount, s.store_name, i.image_path  
        from products as p
        left join seller as s
        on p.seller_id = s.seller_id
        left join productimage as i
        on i.product_id = p.product_id
        where p.product_id = ?;
                
        `;

        const [product] = await db.query(SQL,[productId]);
        return res.status(200).json({message:"get all products", product:product[0]})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    } finally{
        await db.end()
    }
})

router.get("/get_reviews", async(req,res) => {
    const db = await dbConnection()
    try {
        const {productId} = req.query
        const SQL = 
        `
        select r.review_id, r.comments, r.rating, r.created_at, c.first_name, c.last_name
        from reviews as r
        left join customer as c
        on c.customer_id = r.customer_id
        where product_id = ?;
                
        `;

        const [reviews] = await db.query(SQL,[productId]);
        console.log(reviews)
        return res.status(200).json({message:"get all products", reviews:reviews})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }finally{
        await db.end()
    }
})


export default router;