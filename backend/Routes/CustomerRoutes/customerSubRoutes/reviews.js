import express from "express";
import dbConnection from "../../../db/dbConnection.js";
import verifyUser from "../../../middleware/verifyUser.js";

const router = express.Router();

router.post("/add_reviews", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const customerId = req.userId;
    const reviews = req.body.reviews;
    const SQL = `INSERT INTO reviews (customer_id, product_id, comments, rating)
                     VALUES(?, ?, ?, ?)`;

    for (let review of reviews) {
      await db.query(SQL, [
        customerId,
        review.product_id,
        review.comment,
        review.rating,
      ]);
    }

    return res.status(200).json({ message: "Added your review " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await db.end();
  }
});
router.get("/get_reviews", verifyUser, async (req, res) => {
  const db = await dbConnection();
  try {
    const customerId = req.userId;
    const SQL = 
        `
            select r.review_id, r.comments, r.rating, p.product_name, p.product_brand, p.product_model,image_path, s.store_name from reviews as r
            left join products as p
            on r.product_id = p.product_id
            left join productimage as i
            on p.product_id = i.product_id
            left join seller as s
            on s.seller_id = p.seller_id
            where customer_id = ? And p.status = 'enable' order by r.review_id Desc;
        `;

    const [reviews] = await db.query(SQL, [customerId])
    console.log(reviews)

    return res.status(200).json({ message: "Get reviews ", reviews:reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await db.end();
  }
});

export default router;
