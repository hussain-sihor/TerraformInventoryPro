import React, { useEffect, useState } from 'react'
import logo from "../assets/trolley.png"
import { TbAlienFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '@/lib/axiosInstance';


const NavBar = () => {
  const navigate = useNavigate();
  const [isLogIn , setIsLogIn] = useState(false);
  const [flag , setFlag] = useState(false);
  const [isActive,setIsActive] = useState("default");
  useEffect(()=>{
        const getUserInfo = async () => {
          const token = localStorage.getItem("token");
          if(!token){
            setIsLogIn(false);
            return;
          }
          await axiosInstance.get("/users/getuser", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if(response.status == 200){
                setIsLogIn(true);
              }
            });
        };

        getUserInfo();
  },[flag])

  
  return (
    <div className='w-full h-[65px] justify-between items-center text-white bg-black border-b-[1px] border-white border-dashed flex '>

    <div className="left justify-start w-[20%] gap-4 flex items-center h-full pl-8">
     <img src={logo} alt="" className='w-[28px]'/>
      <h1 className='text-2xl font-bold text-white content-center'>Inventory Pro</h1>
    </div>

    <div className="mid gap-10 flex w-[60%] h-full justify-center items-center text-md font-semibold">
    <Link to="/dashboard" onClick={()=>{setFlag(!flag) ; setIsActive("dashboard")}} 
    className={`${isActive === 'dashboard'? 'text-[#FF0000] text-lg font-bold' : 'text-white' }`}>Overview</Link>

    <Link to="/products" onClick={()=>{setFlag(!flag); setIsActive("products")}} 
    className={`${isActive === 'products'? 'text-[#FF0000] text-lg font-bold' : 'text-white' }`}>Products</Link>

    <Link to="/orders" onClick={()=>{setFlag(!flag); setIsActive("orders")}} 
    className={`${isActive === 'orders'? 'text-[#FF0000] text-lg font-bold' : 'text-white' }`}>Orders</Link>

    <Link to="/categories" onClick={()=>{setFlag(!flag); setIsActive("categories")}} 
    className={`${isActive === 'categories'? 'text-[#FF0000] text-lg font-bold' : 'text-white' }`}>Categories</Link>

    </div>
    <div className="flex w-[20%] h-full justify-end items-center pr-8 gap-5">
    <div className="justify-center items-center bg-white rounded-full w-10 h-10 cursor-pointer flex" onClick={()=>{}}>
			 <TbAlienFilled className="text-5xl text-black"/>
			 </div>
       {isLogIn 
       ? 
       <button className="flex justify-center items-center text-white text-lg font-medium rounded-md border-[1px] border-dashed border-white pl-2 pr-2 pt-[1px] pb-[1px] cursor-pointer hover:bg-white hover:text-black" type="button" 
       onClick={()=>{localStorage.removeItem("token");
        navigate(0);
       }}>Sign Out</button> 
       : 
       <button className="flex justify-center items-center text-white text-lg font-medium rounded-md border-[1px] border-dashed border-white pl-2 pr-2 pt-[1px] pb-[1px] cursor-pointer" type="button" 
       onClick={()=>{navigate("/login")}}>Sign In</button>
       }
      
    </div>
    
    </div>
  )
}

export default NavBar
