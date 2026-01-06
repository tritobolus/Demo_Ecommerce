import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {useAuth} from "../../../context/AuthContext"
import axios from "axios";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
 
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const {userId} = useAuth()
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("productName", productName);
    formData.append("brandName", brandName);
    formData.append("model", model);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("description", description);
    try {
      const res = await axios.post(
        "http://localhost:5000/seller/product/add",
        formData,{withCredentials:true}
      );
      console.log(res)
      if(res.status == 200) {
        alert(res.data.message);
        navigate(-1);
      };
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  };

  //get current product_categories
  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/seller/product/categoryList"
        );
        setCategoryList(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryList();
  }, []);

  //after selecting category, we will find crossponding sub_category
  const getSubCategoryList = async (id) => {
    try {
      console.log("Enter in getsubCategories");
      console.log(id);
      const res = await axios.get(
        "http://localhost:5000/seller/product/subCategoryList",
        {
          params: {
            category_id: id,
          },
        }
      );
      setSubCategoryList(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-screen p-5">
        {/* heading */}
        <div className="flex flex-col gap-y-3">
          <h2 className="text-3xl font-semibold">Add Product</h2>
          <hr />
        </div>

        {/* form */}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-10"
        >
          {/* product name & brand & model */}
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="productname" className="text-xl font-semibold">
                Product Name
              </label>
              <input
                type="text"
                name="productname"
                onChange={(e) => setProductName(e.target.value)}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="brandname" className="text-xl font-semibold">
                Brand Name
              </label>
              <input
                type="text"
                name="brandname"
                onChange={(e) => setBrandName(e.target.value)}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="model" className="text-xl font-semibold">
                Model
              </label>
              <input
                type="text"
                name="model"
                onChange={(e) => setModel(e.target.value)}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              />
            </div>
          </div>
          {/* price & discount & stock */}
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="price" className="text-xl font-semibold">
                Price
              </label>
              <input
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="discount" className="text-xl font-semibold">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                onChange={(e) => setDiscount(e.target.value)}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="stock" className="text-xl font-semibold">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                onChange={(e) => setStock(e.target.value)}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              />
            </div>
          </div>
          {/* product categoris & image */}
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="" className="text-xl font-semibold">
                Product Category
              </label>
              <select
                onChange={(e) => {
                  const selectedId = e.target.value; // category_id
                  // const selectedName =
                  //   e.target.options[e.target.selectedIndex].text; // category_name

                  setCategory(selectedId);
                  getSubCategoryList(selectedId);
                }}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              >
                <option value="">Select Category</option>

                {categoryList.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-xl font-semibold">
                Product Sub-Category
              </label>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              >
                <option value="">Select your state</option>
                {subCategoryList.map((subCategory) => (
                  <option
                    key={subCategory.sub_category_id}
                    value={subCategory.sub_category_id}
                  >
                    {subCategory.sub_category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-xl font-semibold">
                Select photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="px-3 py-2 w-75 border-2 focus:outline-teal-400 rounded-2xl"
              />
            </div>
          </div>

          {/* product description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-xl font-semibold">
              Product Description
            </label>
            <textarea
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border-2 focus:outline-teal-400 rounded-2xl"
            />
          </div>

          {/* action buttons */}
          <div className="flex justify-between px-130 mt-10">
            <button
            type="button"
              onClick={() => navigate(-1)}
              className="px-3 py-2 bg-red-500 rounded-lg text-white"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-lg text-white"
            >
              Add
            </button>
          </div>
        </form>

    
      </div>
    </>
  );
};
