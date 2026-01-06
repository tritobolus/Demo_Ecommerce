import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

export const Products = ({setTotal, setEnable, setDisable}) => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [productList, setProductList] = useState([]);

  // get products
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/seller/product/get_products",
        {
          withCredentials: true,
        }
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  //get images
  const getProductImages = async () => {
    try {
      const productImages = await Promise.all(
        products.map(async (product) => {
          const res = await axios.get(
            "http://localhost:5000/seller/product/get_product_images",
            {
              params: { productId: product.product_id },
              withCredentials: true,
            }
          );
          return await res.data.productImage;
        })
      );
      setImages(productImages);
    } catch (error) {
      console.log(error);
    }
  };

  // merge them together (products+images)
  useEffect(() => {
    if (products?.length > 0 && images?.length > 0) {
      const merged = products.map((product, index) => ({
        ...product,
        image: images[index] || null,
      }));
      setProductList(merged);
    }
  }, [images, products]);

  //make product disable
  const changeStatus = async(productId) => {
    try {
      const res = await axios.patch("http://localhost:5000/seller/product/change_status", 
        {productId},
        {withCredentials:true}
      )
      console.log(res)
      const newStatus = res.data.status;
      
      //updating the UI
      setProducts(prev => 
        prev.map(p => (
          p.product_id === productId ? {...p, status:newStatus} : p
        ))
      )
    } catch (error) {
      console.log(error)
      
    }
  }

  //delete product 
  const deleteProduct = async(productId) => {
    try {
        const res = await axios.delete("http://localhost:5000/seller/product/delete_product",
          {
            params: {productId},
            withCredentials:true
          }
        )
        console.log(res);
        
        //updating the UI
        setProducts(prev => prev.filter(p => p.product_id !== productId));
        
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getProductImages();
  
      // set total_products, enable_products, disable_products 
      setTotal(products.length)
      setDisable(products.filter(p => p.status === "disable").length)
      setEnable(products.filter(p => p.status === "enable").length)
    }, [products]);
  
    useEffect(() => {
      getProducts();
    }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-y-2 gap-x-2">
        {productList.map((product) => (
          // each product card
          <div
            key={product.product_id}
            className={`flex justify-between bg-gray-200 ${product.status == "disable" ? 'opacity-50' : 'opacity-100' } p-2  gap-x-5`}
          >
            {/* left side of the card with image and details*/}
            <div className="flex gap-2">
              <img
                className="h-45 w-34 object-cover bg-gray-400"
                src={`http://localhost:5000/${product.image?.image_path}`}
                alt={product.product_name}
              />
              <div className="flex flex-col justify-between">
                <p className="text-2xl font-semibold">{product.product_name}</p>
                <p className="font-semibold text-gray-700">
                  Brand: {product.product_brand}
                </p>
                <p className="font-semibold text-gray-700">
                  Model: {product.product_model}
                </p>
                <p className="">
                  {product.description.length > 45
                    ? product.description.substring(0, 45) + "..."
                    : product.description}
                </p>
                <p className="line-through text-red-500">
                  M.R.P: {product.price}
                </p>
                <div className="flex items-center gap-x-1">
                  <p>Current M.R.P:</p>
                  <p className="font-semibold text-xl">
                    {" "}
                    {product.price - (product.price * product.discount) / 100}
                    /-
                  </p>
                </div>
                <p className="text-green-600">
                  {product.discount}% discount on this product
                </p>
              </div>
            </div>

            {/* right side of the image with action buttons */}
            <div className="flex flex-col justify-between">
              <button
                onClick={() => changeStatus(product.product_id)}
                className={`px-4 py-2 rounded-md text-white active:scale-95 transition-all duration-150
                    ${
                      product.status == "enable"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
              >
                {product.status}
              </button>
              <button
                onClick={() => deleteProduct(product.product_id)}
                className={`px-4 py-2 rounded-md text-white active:scale-95 transition-all duration-150 bg-red-500`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
