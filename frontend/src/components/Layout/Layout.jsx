import React from 'react'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
<<<<<<< HEAD
import ChatBot from '../Chatbot/Chatbot'
import './Layout.css'

const Layout = () => {
   return (
     <>
       <Header />
       <Routers />
       <Footer />
       <div className=" flow-chatbot ">
         <ChatBot />
       </div>
     </>
   );
=======

const Layout = () => {
   return (
      <>
         <Header />
         <Routers />
         <Footer />      
      </>
   )
>>>>>>> 485b414cb290e351f8e3bc5a223336378823ae6d
}

export default Layout