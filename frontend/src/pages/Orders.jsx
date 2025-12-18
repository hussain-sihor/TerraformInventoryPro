import React, { useEffect, useState } from "react";
import Order from "../components/Order";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
 
import { CiCirclePlus } from "react-icons/ci";
import axiosInstance from "@/lib/axiosInstance";





const Orders = () => {
	const navigate = useNavigate();
 let count=1;

 const [Orders,setOrders] = useState([]);
 const [number,setNumber] = useState(0);


//  type Checked = DropdownMenuCheckboxItemProps["checked"];
 
  const [showpending, setShowpending] = React.useState(false)
  const [defaultt, setDefaultt] = React.useState(false)
  const [showcompleted, setShowcompleted] = React.useState(false)
  // const [checkStatusChange, setCheckStatusChange] = React.useState("")
  

 

 useEffect(()=>{
   const handleRequest = async()=>{

      const token = localStorage.getItem("token");
     await axiosInstance.get("/orders/getorders",{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        setOrders(response.data);
        setNumber(response.data.length)
        
     });
   

   }

   handleRequest();

 },[])


 const CheckStatusChange = (data) => {
  if (data == "default") {
    const token = localStorage.getItem("token");
    axiosInstance.get("/orders/getorders",{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        setOrders(response.data);
      });

  } else {
    const token = localStorage.getItem("token");
    axiosInstance.post("/orders/getstatusorders", {
        status: data,
      },{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        setOrders(response.data);
      });
  }
};



	return (
		<div className="w-full h-[calc(100vh-65px)] bg-primary">
		   
       {/* NavBar  */}
			<div className="flex justify-start w-full h-[25%] flex-col items-center pl-8 pr-8 pt-4 pb-4  gap-10">
				{/* 1st row */}
				<div className="flex  w-full justify-between items-center">
         
				 {/* Intro  */}
				<div className=" flex flex-col justify-center w-[20%] gap-2 items-start">		
					<h1 className="text-xl font-bold text-white ">
						Orders
					</h1>
          <div className='text-md  rounded-sm text-gray-300'>Here's a list of <span className="text-xl font-bold text-tertiary">{number} orders</span></div>

				</div>
       
			 {/* Profile */}
			 <button className="flex justify-center items-center text-white bg-secondary text-lg font-semibold rounded-md border-[2px] border-optional pl-2 pr-2 pt-1 pb-1 cursor-pointer hover:text-white hover:bg-optional" type="button" onClick={()=>{navigate('/addorder')}}>Add Orders</button>
			

				</div>

         {/* 2nd row  */}
				<div className="flex w-full justify-start items-center gap-3 ">

         <input type="text" className="border-[1px] w-[25%] rounded-md pt-2 pb-2 pl-3 bg-black text-white border-gray-100 " placeholder="Filter orders..." />
         
	

			 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white bg-black border-[1px] border-dashed pl-3 pr-3 pt-1 pb-1 flex gap-2 rounded-md">
				<CiCirclePlus className="text-white text-lg font-bold"/>
					Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black text-white">
        <DropdownMenuLabel>Options</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
        
         checked={defaultt}
          onCheckedChange={()=>{
            CheckStatusChange("default")
            setShowcompleted(false)
            setShowpending(false)
          }

          }
        >
          Clear
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
        
          checked={showpending}
          onCheckedChange={()=>{
            CheckStatusChange("Pending")
            setShowpending(!showpending)
            setShowcompleted(false)
            
          }

          }
        >
          Pending
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={showcompleted}
          onCheckedChange={()=>{
            CheckStatusChange("Completed")
            setShowcompleted(!showcompleted)
            setShowpending(false)
            
          }
        }
        >
          Completed
        </DropdownMenuCheckboxItem>


      </DropdownMenuContent>

      </DropdownMenu>


	

				

				</div>
			</div>



     <div className=" w-full h-[69%] flex justify-start items-start flex-col pl-8 pr-8 pt-4 pb-4 overflow-hidden mt-10 ">

			<div className=" h-[55px]  w-full border-[1px] border-white rounded-t-md  gap-2">
      
      <div className="w-full grid grid-cols-7 justify-center items-center h-full bg-secondary border-white rounded-t-md gap-2">

       <h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">OrderID</h1>
       <h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">Date</h1>
       <h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">Customer</h1>
       <h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">Destination</h1>
       <h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">Items</h1>
       <h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">Status</h1>
       <h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">Amount</h1>
       </div>
     </div>

      <div className="h-auto w-full overflow-y-scroll border-[1px] border-white scrollbar-hidden ">

			 {Orders.map((item)=>(
				<Order data = {item} count = {count++} key={item.createdAt}/>
			))}
			</div>

		
			
   
		 </div>



		</div>
	);
};

export default Orders;

