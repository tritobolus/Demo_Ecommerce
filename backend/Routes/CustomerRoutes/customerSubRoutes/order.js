import express from "express";
import dbConnection from "../../../db/dbConnection.js";
import verifyUser from "../../../middleware/verifyUser.js";
const router = express.Router();

router.post("/create", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const {
      customerId,
      deliveryAddress,
      state,
      pincode,
      totalAmount,
      phone,
      numberOfItem,
      items,

    } = req.body;

    // create oder
    const orderSQL = `
            INSERT INTO orders (customer_id, delivery_address, state, pincode, total_amount, phone, no_of_item)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    const [orderResults] = await db.query(orderSQL, [
      customerId,
      deliveryAddress,
      state,
      pincode,
      totalAmount,
      phone,
      numberOfItem
    ]);

    //create oder_items
    const orderId = orderResults.insertId;

    const orderItemSQL = `
            INSERT INTO order_items (order_id, product_id, seller_id, quantity, price, discount, final_price)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    
    for (const item of items) {
      await db.query(orderItemSQL, [
        orderId,
        item.productId,
        item.sellerId,
        item.quantity,
        item.price,
        item.discount,
        item.finalPrice,
      ]);
    }

    //delete cart after succefully placed oerder to both order and oder_items_table
    const clearCartSQL = `DELETE FROM cart WHERE customer_id = ?`;
    await db.query(clearCartSQL, [customerId]);

    return res.status(201).json({
      message: "Order placed successfully!",
      orderId: orderId,
    });
  } catch (error) {
    console.log("Oder failed: ",error);
    return res.status(500).json({ error: "Something went wrong. Order failed!" })
  } finally{
    await db.end()
  }
});

router.get("/getOrders", verifyUser, async(req, res) => {
  const db = await dbConnection();
  try {
    const customerId = req.userId;
    const SQL = "SELECT * FROM orders WHERE customer_id = ? order by order_id desc"
    const [orders] = await db.query(SQL,[customerId])

    return res.status(200).json({message:"Get all customer orders",orders:orders })
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
    
  }
})
router.delete("/delete", verifyUser, async(req, res) => {
  const db = await dbConnection();
  try {
    const orderId = req.query.orderId;
    const SQL = "DELETE FROM orders WHERE order_id = ?"
    await db.query(SQL,[orderId])

    return res.status(200).json({message:" Order deleted successfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
    
  }
});

router.get("/get_order_items", verifyUser, async(req, res) => {
  const db = await dbConnection();
  try {
    const orderId = req.query.orderId;
    const SQL = 
      `
        select o.order_item_id, o.order_id, o.product_id, o.quantity, o.price, o.discount, o.final_price, i.image_path , p.product_name, p.product_model, p.product_brand, p.description
        from order_items as o
        left join products as p
        on p.product_id = o.product_id
        left join productimage as i
        on o.product_id = i.product_id
        where order_id = ?;;
      `;
    const [orderItems] = await db.query(SQL,[orderId])

    return res.status(200).json({message:" Get all order items", orderItems:orderItems})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
    
  }
})

export default router
