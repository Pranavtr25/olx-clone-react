import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import ProductContainer from '../Components/ProductContainer'
import ProductSlider from '../Components/ProductSlider'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { collection, doc, getDocs } from 'firebase/firestore'

const Product = () => {
  const {id} = useParams()
  const [productData, setProductData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db,'products'))
        const productList = snapshot.docs.map(doc => ({
            id : doc.id,
            ...doc.data()
        }))
        setProductData(productList)  
        // console.log(productList)
      } catch (error) {
        console.log(`error fetching products : \n ${error} `)
      }
    }
    fetchData();
  },[])
  // console.log(id)
  // console.log(productData)

  let singleProductData = {};
  for(let val of productData){
    if(val?.id === id){
      singleProductData = val
    }
  }
  // console.log(singleProductData)

  return (
    <>
    <div className='bg-[#f2f4f5]'>
        <Banner singleProductData = {singleProductData}/>
        <ProductContainer singleProductData = {singleProductData}/>
        <ProductSlider singleProductData = {singleProductData}/>
    </div>
    </>
  )
}

export default Product