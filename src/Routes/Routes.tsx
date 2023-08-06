import React, { useState } from 'react'
import { BrowserRouter ,Routes , Route} from 'react-router-dom'
import Navbar from '../Component/Navbar'
import Login from '../Pages/Login'
import Singup from '../Pages/Singup'
import Home from '../Pages/Home'
import ProductModal from '../Component/ProductModal'
import {useSelector} from 'react-redux'
import PageNotFound from '../Pages/PageNotFound'


function RootRoute() {
  const {loginData,userIsLoggedIn} = useSelector((state: any) => state.productSlice);
  return (
    <BrowserRouter>
    <Navbar/>
    <ProductModal/>
      {
        userIsLoggedIn ?
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="*"  element={<PageNotFound/>}/>
        </Routes>
        : 
        <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route index path="/login" element={<Login/>}/>
      <Route path="/signup"  element={<Singup/>}/>
      <Route path="*"  element={<PageNotFound/>}/>
        </Routes>
      }
    </BrowserRouter>
  )
}

export default RootRoute