import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Products } from "./products";

export const ManageProduct = () => {
  const [totalProduct, setTotalProduct] = useState("");
  const [enableProduct, setEnableProduct] = useState("");
  const [disableProduct, setDisableProduct] = useState("");

  return (
    <>
      <div className=" h-screen flex flex-col gap-y-3 p-5 ">
        <h2 className="font-semibold text-3xl">Manage Your Product</h2>
        <hr />
        <div className="flex justify-between">
          <div className=" bg-teal-400 rounded-md text-2xl  font-semibold flex flex-col items-center  p-4">
            <p>Total product</p>
            <p>{totalProduct ? totalProduct : 0}</p>
          </div>
          <div className="bg-teal-400 rounded-md text-2xl  font-semibold flex flex-col items-center p-4">
            <p>Enable Product</p>
            <p>{enableProduct ? enableProduct : 0}</p>
          </div>
          <div className="bg-teal-400 rounded-md text-2xl font-semibold flex flex-col items-center  p-4">
            <p>Disable Product</p>
            <p>{disableProduct ? disableProduct : 0}</p>
          </div>

          <Link
            to="../add_product"
            className="bg-teal-400 rounded-md text-2xl font-semibold flex flex-col justify-center  p-4"
          >
            Add Product
          </Link>
        </div>
        <h3 className="text-xl">Your produts</h3>
        <div className=" overflow-y-auto">
          <Products setTotal ={setTotalProduct} setEnable={setEnableProduct} setDisable={setDisableProduct}/>
        </div>
      </div>
    </>
  );
};
