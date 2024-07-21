import React,{useState} from "react";

import { db, storage } from "../firebase";
import { collection,addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {

  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('')
  const [title, setTitle] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState('')
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData'))
  console.log(userData?.uid)


  const handleImage1Change = (e) => {
    if(e.target.files[0]){
      setImage1(e.target.files[0])
    }
  }
  const handleImage2Change = (e) => {
    if(e.target.files[0]){
      setImage2(e.target.files[0])
    }
  }
  const handleImage3Change = (e) => {
    if(e.target.files[0]){
      setImage3(e.target.files[0])
    }
  }

  const uploadImageToStorage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageURL = await getDownloadURL(storageRef)
    return imageURL
  }

  const handleSubmit = async (e) => {
      e.preventDefault()

      if(!image1 || !image2 || !image3) {
        alert("please upload all the images")
        return;
      }

      try {

        const image1URL = await uploadImageToStorage(image1)
        const image2URL = await uploadImageToStorage(image2)
        const image3URL = await uploadImageToStorage(image3)

        console.log("data before storing")

        await addDoc(collection(db, "products"),{
          category,
          brand,
          title,
          price,
          description,
          image1 : image1URL,
          image2 : image2URL,
          image3 : image3URL,
          uid : userData?.uid
        })

        console.log("data saved")

        alert("data successfully added")
        setCategory('');
        setBrand('');
        setTitle('');
        setPrice('');
        setDescription('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        navigate('/')

      } catch (error) {
        console.log(`error adding product : \n ${error}`)
      }
  }


  

  return (
    <>
      <div className="flex justify-center items-center mt-28 h-[55em]">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-[-6em]">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Product Information
          </h2>
        <form onSubmit = {handleSubmit}>
          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
            onChange={(e) => setCategory(e.target.value)}
              id="category"
              name="category"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
              <option>Books</option>
              <option>Cycle</option>
              <option>Others</option>
            </select>
          </div>

          {/* Brand */}
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
            onChange={(e) => setBrand(e.target.value)}
              type="text"
              id="brand"
              name="brand"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter brand"
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
            onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter title"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
            onChange={(e) => setPrice(e.target.value)}
              type="text"
              id="price"
              name="price"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter price"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
            onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product description"
              rows="4"
            ></textarea>
          </div>

          {/* Upload Photo 1 */}
          <div className="mb-4">
            <label
              htmlFor="photo1"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Photo 1
            </label>
            <input
            onChange={handleImage1Change}
              type="file"
              id="photo1"
              name="photo1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Upload Photo 2 */}
          <div className="mb-4">
            <label
              htmlFor="photo2"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Photo 2
            </label>
            <input
            onChange={handleImage2Change}
              type="file"
              id="photo2"
              name="photo2"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Upload Photo 3 */}
          <div className="mb-4">
            <label
              htmlFor="photo3"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Photo 3
            </label>
            <input
            onChange={handleImage3Change}
              type="file"
              id="photo3"
              name="photo3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
