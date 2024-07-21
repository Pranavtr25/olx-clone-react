import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import Footer from './Footer'

function RootLayout() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      if(user){
        console.log("user logged in")
        setUser(user)
      }else{
        console.log("user logged out")
        setUser(null)
      }
    });
    return () => unsubscribe();
  },[])

  return (
    <div>
        <Navbar user = {user}/>
        <main>
           <Outlet/> 
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout