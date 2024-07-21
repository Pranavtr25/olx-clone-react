import React, { useEffect, useState } from "react";
import logo from "../images/olx_logo1.jpg";
import sellLogo from "../images/sell_logo.png"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SignupModal } from "./SignupModal";
import LoginModal from "./LoginModal";
import DropDown from "./DropDown";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const Navbar = ({user}) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
    const [fetchedUserData, setFetchedUserData] = useState({})
    const navigate = useNavigate();

    const [searchData, setSearchData] = useState('')

    const userdata = JSON.parse(localStorage.getItem('userData'))
    console.log(`userdata from local : \n ${userdata?.uid}`)

    const handleSearchValue = (e) => {
        try {
            localStorage.setItem('searchValue', e.target.value)
        } catch (error) {
            console.log(`error storing local storage \n ${error}`)
        }
    }

    useEffect(() => {
    
        const fetchedProducts = async () =>{
          try {
            const snapshot = await getDocs(collection(db, "users"))
            const productList = snapshot.docs.map(doc => ({
              id : doc.id,
              ...doc.data()
            }))
            
            console.log("fetched...")
            console.log(productList)
            for(let val of productList){
                if(val?.uid === userdata?.uid){
                    setFetchedUserData(val)
                }
            }
            // console.log(fetchedUserData)
    
          } catch (error) {
            console.log(`error fetching products : \n ${error}`)
          }
        };
        fetchedProducts()
      },[])
      console.log(fetchedUserData)


  return (
    <>
    <div className="flex justify-evenly my-3">
        <Link to='/'>
            <img
                className="h-12 object-contain cursor-pointer"
                src={logo}
                alt="icon"
            />
        </Link>
        <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-search text-gray-400"></i>
            </span>
            <input
            type="text"
            className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <i className="fas fa-caret-down text-gray-400"></i>
            </span>
        </div>


        
        <div className="relative w-full max-w-xl">
            <input
            onChange={handleSearchValue}
            type="text"
            className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i className="fas fa-search text-gray-400"></i>
            </span>
        </div>

        <div className="hidden lg:flex p-2">
            <i className="fa-solid fa-language m-1"></i>
            <i className="fas fa-caret-down text-gray-400"></i>
        </div>
        {user ?
            (<div className="hidden lg:flex p-2">
                <Link to='/myAds'>
                    <p className=" cursor-pointer hover:text-blue-600 mx-3">hello, {fetchedUserData.userName}</p>
                </Link>
                <p className="cursor-pointer hover:text-blue-600" onClick = {() => {
                    auth.signOut()
                    .then(() => {
                        localStorage.removeItem('userData')
                        console.log("user logged out...")
                        navigate("/")
                    })
                    .catch((error) => {
                        console.log(`error while logout \n ${error}`)
                    })
                    }}>logout</p>
            </div>) : 

            (<div className="hidden lg:flex p-2">
                <p className="cursor-pointer hover:text-blue-600 mx-3" onClick={() => setIsSignupModalOpen(true)}>signup</p>
                <p className="cursor-pointer hover:text-blue-600" onClick={() => setIsLoginModalOpen(true)}>login</p>
            </div>) 

        }
        <DropDown setIsSignupModalOpen = {setIsSignupModalOpen} setIsLoginModalOpen = {setIsLoginModalOpen} user = {user} fetchedUserData = {fetchedUserData}/>
        {user && 
            <Link to='/addProduct'>
                <img
                    className="h-12 object-contain cursor-pointer rounded-full"
                    src={sellLogo}
                    alt="icon"
                />
            </Link>
        }
    </div>

    {isSignupModalOpen && <SignupModal setIsSignupModalOpen={setIsSignupModalOpen}/>}
    {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen}/>}


    </>
  );
};

export default Navbar;
