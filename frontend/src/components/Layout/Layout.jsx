import React from 'react'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
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
}

export default Layout