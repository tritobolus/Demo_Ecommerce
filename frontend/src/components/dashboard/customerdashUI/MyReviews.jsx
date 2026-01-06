import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoStar } from "react-icons/io5";
export const MyReviews = () => {
  const [reviews, setReviews] = useState([])
  const getReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customer/reviews/get_reviews", {
        withCredentials:true
      })
      console.log(res)
      setReviews(res.data.reviews)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReviews()
  },[])
  return (
    <>
      <div className="p-4 flex flex-col gap-y-3">
      <h2 className="text-3xl font-semibold">My Reviews</h2>
      <hr />
      <div className=' flex flex-col h-150 overflow-y-auto'>
        
      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.review_id}
            className="border rounded p-3 mb-3  gap-4 grid grid-cols-3 "
          >
            {/* Product Image */}
            <img
              src={`http://localhost:5000/${review.image_path}`}
              alt={review.product_name}
              className="w-24 h-24 object-cover rounded"
            />

            {/* Review Details */}
            <div>
              <h3 className="font-semibold">
                {review.product_name}
              </h3>

              <p className="text-sm text-gray-600">
                {review.product_brand} - {review.product_model}
              </p>

              <p className="text-sm">
                Store: {review.store_name}
              </p>
            </div>
            <div>
              <div className="text-sm flex gap-x-2 font-semibold">
                Rating: <IoStar size={16} className='text-yellow-500'/> {review.rating}/5
              </div>

              <p className="mt-1 text-sm flex gap-x-2 font-semibold">
                comment: {review.comments}
              </p>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
    </>
  )
}
