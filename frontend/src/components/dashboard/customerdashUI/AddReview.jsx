import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";

export const AddReview = ({ reviewItems, setOpenReview }) => {
  const [reviews, setReviews] = useState([]);

  // Initialize reviews when reviewItems is ready
  useEffect(() => {
    if (reviewItems && reviewItems.length > 0) {
      setReviews(
        reviewItems.map(item => ({
          product_id: item.product_id,
          comment: "",
          rating: ""
        }))
      );
    }
  }, [reviewItems]);

  // Update comment
  const handleCommentChange = (index, value) => {
    const newReviews = [...reviews];
    newReviews[index].comment = value;
    setReviews(newReviews);
  };

  // Update rating
  const handleRatingChange = (index, value) => {
    const newReviews = [...reviews];
    newReviews[index].rating = value;
    setReviews(newReviews);
  };

  // Save all reviews
  const handleSave = async() => {
    try {
        const res = await axios.post("http://localhost:5000/customer/reviews/add_reviews",
        {reviews} ,
        {withCredentials:true}
    ); 
    console.log("respomce from hanlde save",res)
    alert(res.data.message)
    setOpenReview(false)

    } catch (error) {
        console.log()
        
    }
  };

  return (
    <div className="absolute z-100 top-30 left-110 h-120 w-240 p-10 bg-teal-100 shadow-2xl rounded-2xl">
      <h2 className="text-center font-semibold text-xl">Give Review & Rating</h2>

      <div className="overflow-y-auto h-70 flex flex-col gap-2 mt-4">
        {reviewItems &&
          reviewItems.map((item, index) => (
            <div key={item.product_id} className="grid grid-cols-5 gap-2 items-center">
              <img
                src={`http://localhost:5000/${item.image_path}`}
                alt=""
                className="h-25 w-20 object-cover"
              />
              <div>
                <p>{item.product_name}</p>
                <p>{item.product_brand}</p>
                <p>{item.product_model}</p>
              </div>
              <textarea
                className="col-span-2 border rounded p-2"
                placeholder="Write your review"
                value={reviews[index] ? reviews[index].comment : ""}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
              <div className="flex items-center gap-2">
                <IoStar size={25} className="text-yellow-500" />
                <select
                  value={reviews[index] ? reviews[index].rating : ""}
                  onChange={(e) => handleRatingChange(index, e.target.value)}
                  className="border"
                >
                  <option value="">Select rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 w-full"
          onClick={() => setOpenReview(false)}
        >
          Close
        </button>
        <button
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 w-full"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
