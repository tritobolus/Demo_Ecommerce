import axios from "axios";
import  { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { IoStar } from "react-icons/io5";

export const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/general/get_single_product",
        {
          params: { productId: productId },
        }
      );
      console.log(res.data.product)
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };
  const getReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/general/get_reviews", {
        params: { productId: productId },
      });
      console.log(res.data.reviews);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        <IoStar/>
      </span>
    ));
  };

    const addToWishlist = async(productId) => {
    try {
      const res = await axios.post("http://localhost:5000/customer/product/addToWishlist", 
        { productId:productId},
        {withCredentials:true},
      )
      // console.log(res)
       alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      
    }
  }
    const addToCart = async(productId) => {
    try {
      const res = await axios.post("http://localhost:5000/customer/product/addToCart", 
        { productId:productId},
        {withCredentials:true},
      )
      // console.log(res)
      alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      
    }
  }

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);
  return (
    <>
      <div className="max-h-screen">
        {/* product section */}
        <div className=" mt-5 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8">
        
          <div className="border rounded-lg p-4">
            <img
              src={`http://localhost:5000/${product.image_path}`}
              alt={product.product_name}
              className="w-full h-60 object-contain"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold">{product.product_name}</h2>

            <p className="text-gray-600">
              Brand:{" "}
              <span className="font-medium">{product.product_brand}</span>
            </p>

            <p className="text-gray-600">
              Model:{" "}
              <span className="font-medium">{product.product_model}</span>
            </p>

            <p className="text-gray-600">
              Seller: <span className="font-medium">{product.store_name}</span>
            </p>

            <p className="text-lg font-semibold text-green-600">
              ₹{product.price - product.price * (product.discount / 100)}
              {product.discount && (
                <span className="text-sm text-red-500 ml-2">
                  ({product.discount}% OFF)
                </span>
              )}
            </p>

            <p className="text-gray-700">{product.description}</p>

            <p className="text-sm">
              Stock:{" "}
              <span
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <div className="flex justify-between">
              <button onClick={() => addToCart(product.product_id)} className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 w-fit">
                Add to Cart
              </button>
              <button onClick={() => addToWishlist(product.product_id)} className="mt-4 bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-600 w-fit">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        
        {/* review section */}
        <div className="max-w-5xl mx-auto mt-10 p-6 h-75 overflow-y-auto border-t">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review.review_id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">
                      {review.first_name} {review.last_name}
                    </p>

                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>

                  <p className="mt-2 text-gray-700">{review.comments}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
