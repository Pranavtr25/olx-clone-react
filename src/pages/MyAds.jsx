import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import ProductCard from '../Components/ProductCard';
import { useNavigate } from 'react-router-dom';

const MyAds = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/');
    } else {
      const fetchProducts = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'products'));
          let productList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          productList = productList.filter(product => product?.uid === userData?.uid);
          setProducts(productList);
        } catch (error) {
          console.log(`Error fetching products: ${error}`);
        }
      };
      fetchProducts();
    }
  }, [userData, navigate]);

  return (
    <>
      {userData ? (
        <>
          <h1 className="text-4xl font-bold text-center my-6">My Ads</h1>
          <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                id={product.id}
                image={product.image1}
                price={product.price}
                brand={product.brand}
                category={product.category}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default MyAds;
