import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import {Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import RootLayout from './Components/RootLayout'
import Product from './pages/Product'
import AddProducts from './pages/AddProducts'
import Home from './pages/Home'
import MyAds from './pages/MyAds'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element = {<RootLayout/>}>
          <Route index element={<Home/>} />
          <Route path ='/addProduct' element = {<AddProducts/>} />
          <Route path='/product/:id' element = {<Product/>} />
          <Route path='/myAds' element = {<MyAds/>} />
        </Route>
      </>

    )
  );
  return <RouterProvider router={router} />
}

export default App
