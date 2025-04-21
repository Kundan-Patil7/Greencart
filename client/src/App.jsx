import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AddAddress, AllProducts, Cart, Home, MyOrder, ProductCategory, ProductDetails } from './pages/index';
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/auth/Login';
import SellerLogin from './components/seller/sellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProducts from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Order from './pages/seller/Order';


function App() {

  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin, isSeller} = useAppContext();

  return (
    <div className='text-default min-h-screen  text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login/> : null}

      <Toaster />

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<AllProducts />} />
          <Route path='/product/:category' element={<ProductCategory />} />
          <Route path='/product/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-order' element={<MyOrder />} />
          
           <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
           <Route index element={<AddProducts />} />
         
           <Route path='product-list' element={<ProductList />} />
           <Route path='order' element={<Order/>} />
           
           </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
