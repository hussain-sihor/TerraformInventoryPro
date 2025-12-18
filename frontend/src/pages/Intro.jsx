import React from 'react'
import NavBar from '../components/NavBar'
import logo from "../assets/trolley.png"
import intro1 from "../assets/intro1.jpg"
import intro2 from "../assets/intro2.jpg"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance'
const Intro = () => {
  const navigate = useNavigate();
  return (
   <>
    
   <div className="w-full h-[calc(100vh-65px)] flex bg-primary ">

    <div className="left w-[50%] flex justify-center items-start flex-col gap-8 pl-14 text-white">
      <h1 className='text-5xl font-bold '>Inventory & Stock <br></br> Managment Solution</h1>
      <h1 className='w-[65%] text-lg font-semibold'><span className='text-xl text-optional font-semibold'>InventoryPro</span> is your ultimate solution for efficient and seamless inventory management. This helps you track and manage your stock effortlessly.</h1>
      <div className='border-2 border-dashed border-white pl-3 pr-3 font-semibold text-lg bg-secondary'>Free-to-use</div>

    </div>

    <div className="right flex w-[50%] justify-center items-center flex-col pr-8">
      
      <img className=' w-[100%] h-[80%] rounded-xl border-2 border-dashed border-optional'src={intro1} alt="" />
    
    </div>
   </div>

    </>
  )
}

export default Intro
