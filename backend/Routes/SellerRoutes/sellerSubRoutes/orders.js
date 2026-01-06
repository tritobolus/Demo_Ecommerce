import express from "express";
import dbConnection from "../../../db/dbConnection.js";
import verifyUser from "../../../middleware/verifyUser.js";
const router = express.Router();

router.get("/getOrders", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const customerId = req.userId;
    const SQL = `
        select o.order_id, o.customer_id, o.total_amount, o.order_status, o.order_date, o.delivery_address, o.pincode, o.state, o.phone, o.no_of_item, c.first_name, c.last_name, c.status as customer_status from orders as o
        left join customer as c
        on c.customer_id = o.customer_id order by order_id desc;
      `;
    const [orders] = await db.query(SQL, [customerId]);

    return res
      .status(200)
      .json({ message: "Get all customer orders", orders: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get_order_items", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const orderId = req.query.orderId;
    const SQL = `
        select o.order_item_id, o.order_id, o.product_id, o.quantity, o.price, o.discount, o.final_price, o.status, i.image_path , p.product_name, p.product_model, p.product_brand, p.description
        from order_items as o
        left join products as p
        on p.product_id = o.product_id
        left join productimage as i
        on o.product_id = i.product_id
        where order_id = ?;
      `;
    const [orderItems] = await db.query(SQL, [orderId]);

    let count = 0;
    for(let i =0; i<orderItems.length; i++){
      if(orderItems[i].status === 'approved') {
        count++;
      }
    }

    return res
      .status(200)
      .json({ message: " Get all order items", orderItems: orderItems, numberOfItemsApproved:count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get_all_order_items", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const sellerId = req.query.sellerId;
    const SQL = `
        select ot.order_item_id, ot.product_id, ot.quantity, ot.price, ot.final_price, ot.status, i.image_path, p.product_name, p.product_brand, p.product_model
        from order_items as ot
        left join orders as o
        on ot.order_id = o.order_id
        left join productimage as i
        on i.product_id = ot.product_id
        left join products as p
        on p.product_id = ot.product_id
        where ot.seller_id = 8 and o.order_status = "processing";
      `;
    const [allOrderItems] = await db.query(SQL, [sellerId]);

    return res
      .status(200)
      .json({ message: " Get all order items", allOrderItems: allOrderItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update_order_status", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const status = req.body.status;
    const orderId = req.body.orderId;
    const SQL = `
        update orders set order_status = ? where order_id = ?
      `;
    await db.query(SQL, [status, orderId]);

    return res.status(200).json({ message: " Updated order status" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update_order_item_status", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const status = req.body.status;
    const orderItemId = req.body.orderItemId;
    const SQL = `
        update order_items set status = ? where order_item_id = ?
      `;
    await db.query(SQL, [status, orderItemId]);

    return res.status(200).json({ message: " Updated order item status" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
