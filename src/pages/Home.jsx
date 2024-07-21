import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const productList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
        console.log(productList + "fghjk");
      } catch (error) {
        console.log(`Error fetching products: ${error}`);
      }
    };
    fetchProducts();
  }, []);

  return (
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
  );
};

// const ProductCard = ({ id, image, price, brand, category }) => {
//   return (
//     <div className="w-64 h-80 border border-gray-300 rounded-lg shadow-md flex flex-col bg-white">
//       <div className="flex-1 flex items-center justify-center">
//         <img src={image} alt={brand} className="w-full h-48 object-cover rounded-t-lg" />
//       </div>
//       <div className="p-4 flex flex-col justify-between">
//         <h3 className="text-lg font-bold">{brand}</h3>
//         <p className="text-sm text-gray-600">{category}</p>
//         <p className="text-lg font-semibold">${price}</p>
//       </div>
//     </div>
//   );
// };

export default Home;
