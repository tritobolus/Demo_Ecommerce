import { createContext, useContext, useState } from "react";
import axios from 'axios'

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const[searchQuery, setSearchQuery] = useState("")
    const [products, setProducts] = useState([])

    const getProducts = async() => {
    try {
      const res = await axios.get("http://localhost:5000/general/getproducts")
      console.log(res)
     
        if(res.status == 200) {
          setProducts(res.data.products)
        }
      
    } catch (error) {
      console.log(error)
    }
  }
    
  return (
    <ProductContext.Provider
      value={{
      searchQuery,
      setSearchQuery,
      products,
      getProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

//custom hook
export const useProduct = () => useContext(ProductContext)