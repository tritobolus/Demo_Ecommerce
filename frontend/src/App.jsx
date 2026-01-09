import { Routes, Route } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { ProductPage } from "./pages/ProductPage";
import { Dashboard } from "./pages/Dashboard";
import  SellerDash  from "./components/dashboard/SellerDash";
import CustomerDash from "./components/dashboard/CustomerDash";
import  AdminDash  from "./components/dashboard/AdminDash";

//seller dashboard routes
import {SellerOverview} from './components/dashboard/sellerdashUI/SellerOverview'
import {ManageOrders} from './components/dashboard/sellerdashUI/ManageOrders'
import {ManageProduct} from './components/dashboard/sellerdashUI/ManageProduct'
import {ReviewRating} from './components/dashboard/sellerdashUI/ReviewRating'
import {InventoryStock} from './components/dashboard/sellerdashUI/InventoryStock'
import {AddProduct} from './components/dashboard/sellerdashUI/AddProduct'

//customer dashboard routes
import {CustomerOverview} from './components/dashboard/customerdashUI/CustomerOverview'
import {MyOrders} from './components/dashboard/customerdashUI/MyOrders'
import {MyReviews} from './components/dashboard/customerdashUI/MyReviews'
import {Wishlist} from './components/dashboard/customerdashUI/Wishlist'
import {Settings} from './components/dashboard/customerdashUI/Settings'
import {ManageAddress} from './components/dashboard/customerdashUI/ManageAddress'

//admin dashboard routes
import {AdminOverview} from './components/dashboard/admindashUI/AdminOverview'
import {CreateAdmin} from './components/dashboard/admindashUI/CreateAdmin'
import {ManageAdmin} from './components/dashboard/admindashUI/ManageAdmin'
import {ManageSeller} from './components/dashboard/admindashUI/ManageSeller'
import {ManageCustomer} from './components/dashboard/admindashUI/ManageCustomer'
import {AdminManageOrders} from './components/dashboard/admindashUI/AdminManageOrders'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path ="/cart" element={<Cart/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:productId" element={<ProductPage />} />

        
        <Route path="/sellerdash" element={<SellerDash />}>
          <Route index  element={<SellerOverview/>}/>
          <Route path="manage_orders" element={<ManageOrders/>}/>
          <Route path="manage_product" element={<ManageProduct/>}/>
          <Route path="review_rating" element={<ReviewRating/>}/>
          <Route path="inventory_stock" element={<InventoryStock/>}/>
          <Route path="add_product" element={<AddProduct/>}/>
        </Route>

        <Route path="/customerdash" element={<CustomerDash />}> 
          <Route index element={<CustomerOverview/>}/>
          <Route path="manage_address" element={<ManageAddress/>}/>
          <Route path="my_orders" element={<MyOrders/>}/>
          <Route path="my_reviews" element={<MyReviews/>}/>
          <Route path="wishlist" element={<Wishlist/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>

        <Route path="/admindash" element={<AdminDash />} >
          <Route index element={<AdminOverview/>}/>
          <Route path="create_admin" element={<CreateAdmin/>}/>
          <Route path="manage_admin" element={<ManageAdmin/>}/>
          <Route path="manage_seller" element={<ManageSeller/>}/>
          <Route path="manage_customer" element={<ManageCustomer/>}/> 
          <Route path="manage_orders" element={<AdminManageOrders/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
