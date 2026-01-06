import express from 'express'
import dbConnection from "../../../db/dbConnection.js"
import upload from '../../../middleware/upload.js'
import verifyUser from '../../../middleware/verifyUser.js'

const router = express.Router()

router.post('/add', verifyUser, upload.single("image"), async (req, res) => {
    const db = await dbConnection()
    console.log("enter in add ")
    try {
        const {
            productName,
            brandName,
            model,
            price,
            discount,
            stock,
            category,
            subCategory,
            description,
            } = req.body;

        const sellerId = req.userId

        const insertProductSQL = `
            INSERT INTO products 
            (product_name, product_brand, product_model, price, description, stock, discount, category_id, sub_category_id, seller_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

        const productResult = await db.query(insertProductSQL, [
            productName,
            brandName,
            model,
            price,
            description,
            stock,
            discount,
            category,
            subCategory,
            sellerId,
        ]);

        //inserting image Path 
        const productId = productResult[0].insertId
        const imagePath = req.file.path;

        const insertImageSQL = `
        INSERT INTO productimage
        (product_id, image_path)
        VALUES (?,?)`

        const imageResult = await db.query(insertImageSQL, [productId, imagePath ])
        console.log("after addition")

        return res.status(200).json({message:"Added Product Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error", Error:error})
        
    } finally{
        await db.end()
    }
    
})

router.get("/categoryList", async (req, res) => {
    const db = await dbConnection();
    try {
        const sql = "SELECT category_name, category_id from categories"
        const categories = await db.query(sql)
        return res.status(200).json({message: "Get Categories", categories: categories[0]})
        
    } catch (error) {
        console.log(error)
    }finally{
        await db.end()
    }
})
router.get("/subCategoryList", async (req, res) => {
    const db = await dbConnection();
    const category_id = req.query.category_id
    try {
        const sql = "SELECT sub_category_id, sub_category_name from sub_categories where category_id = ?"
        const subCategories = await db.query(sql,[category_id])
        return res.status(200).json({message: "Get all sub_Categories", categories: subCategories[0]})
        
    } catch (error) {
        console.log(error)
        return res.status(5000).json({message:"Insternal server error"})
    }finally{
        await db.end()
    }
})

router.get("/get_products", verifyUser, async (req, res) => {
    const db = await dbConnection();
    try {
        const sellerId = req.userId;
        const SQL = "SELECT * from products where seller_id = ? ORDER BY product_id DESC"
        const result = await db.query(SQL,[sellerId])

        const products = result[0]
        return res.status(200).json({message: "Get all products",products:products,})
        
    } catch (error) {
        console.log(error)
        return res.status(5000).json({message:"Insternal server error"})
    }finally{
        await db.end()
    }
})
router.get("/get_product_images", verifyUser, async (req, res) => {
    const db = await dbConnection();
    try {
        const {productId} = req.query;
        const SQL = "SELECT image_path from productimage where product_id = ?"
        const result = await db.query(SQL,[productId])

        const image = result[0][0]
        // console.log(image);
        return res.status(200).json({message: "Get all products images",productImage:image})
        
    } catch (error) {
        console.log(error)
        return res.status(5000).json({message:"Insternal server error"})
    }finally{
        await db.end()
    }
})

router.patch("/change_status", verifyUser, async (req, res) => {
    const db = await dbConnection();
    console.log("Entr into chnage status")
    try {
        const sellerId = req.userId;
        const productId = req.body.productId

        const SQL = "SELECT status from products where seller_id = ? AND product_id = ?"
        const [result] = await db.query(SQL,[sellerId, productId])

        //storing current status
        const status = result[0].status

        if(result.length === 0) {
            return res.status(404).json({message: "product not found"})
        }

        //having new status which
        const newStatus = (status == 'enable') ? 'disable' : 'enable';
        const changeStatusSQL = "UPDATE products SET status = ? WHERE seller_id = ? AND product_id = ? "

        const [chnagedStatus] = await db.query(changeStatusSQL,[newStatus,sellerId,productId])
        if(chnagedStatus.affectedRows == 1) {
            return res.status(200).json({message: "product status changed",  status: newStatus})
        }

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Insternal server error"})
    }finally{
        await db.end()
    }
})

router.delete("/delete_product", verifyUser, async (req,res) => {
    const db = await dbConnection();
    console.log("enter into deleet product")
    try {
        const productId = req.query.productId;
        const SQL = "DELETE FROM products WHERE product_id = ?"

        const [rows] = await db.query(SQL, [productId])
        console.log(rows)
        return res.status(200).json({message:"Deleted product successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Iternal Server Error"});
        
    } finally{
        await db.end()
    }
})

export default router;