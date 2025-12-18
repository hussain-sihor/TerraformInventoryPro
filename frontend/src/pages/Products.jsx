import React, { useEffect, useState} from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CiCirclePlus } from "react-icons/ci";
import axiosInstance from "@/lib/axiosInstance";

// getCategoryProducts

const Products = () => {
	const navigate = useNavigate(); 
	let count = 1;

	const [products, setProducts] = useState([]);
	const [number, setNumber] = useState(0);
	const [categories, setCategories] = useState([]);
  
	const [showHigh, setShowHigh] = useState(false);
	const [defaultt, setDefaultt] = useState(false);
	const [showLow, setShowLow] = useState(false);
	const [showMidium, setShowMidium] = useState(false);
	const [showOut, setShowOut] = useState(false);
	const [flag, setFlag] = useState(false);
  
	const checkProductChange = (data) => {

		if (data == "default") {
			console.log("hureggg");
			const token = localStorage.getItem("token");
			axiosInstance.get("/products/getproducts",{headers: {
				Authorization: `Bearer ${token}`,
			},}).then((response) => {
					setProducts(response.data);
				});
		} else {
			const token = localStorage.getItem("token");
			axiosInstance.post("/products/getstatusproducts", {
					status: data,
				},{headers: {
					Authorization: `Bearer ${token}`,
				},}).then((response) => {
					setProducts(response.data);
				});
			console.log(data);
		}
	};

	const checkCategoryChange = (data) => {
		const token = localStorage.getItem("token");
		axiosInstance.post("/products/getcategoryproducts", {
				category: data,
			},{headers:{Authorization:`Bearer ${token}`}})
			.then((response) => {
				setProducts(response.data);
			});
	};

	const handleDelete = async(id) =>{
			const token = localStorage.getItem("token");
			 await axiosInstance.delete(`/products/deleteproduct/${id}`,{
				headers:{
					Authorization:`Bearer ${token}`
				}
			 }).then((response)=>{
				setFlag(!flag);
				console.log(response);
			 })
		}

	useEffect(() => {
		const handelRequest = async()=>{
        
			try{
			const token = localStorage.getItem("token");
			await	axiosInstance.get("/products/getproducts",{headers:{Authorization:`Bearer ${token}`}}).then((response) => {
				setProducts(response.data);
				setNumber(response.data.length);
			});

			 await axiosInstance.get("/categories/getcategories",{headers:{Authorization:`Bearer ${token}`}})
			.then((response) => {
				setCategories(response.data);
			});


			}catch(error){
				console.log(error);
			}
		}



		handelRequest();
			
		
	}, [flag]);

	return (
		<div className="w-full h-[calc(100vh-65px)] bg-primary">
			{/* NavBar  */}
			<div className="flex justify-start w-full h-[25%] flex-col items-center pl-8 pr-8 pt-4 pb-4 gap-10">

				{/* 1st row */}
				<div className="flex  w-full justify-between items-center">
					{/* Intro  */}
					<div className=" flex flex-col justify-center w-[20%] gap-2 items-start">
						<h1 className="text-xl font-bold text-white ">Welcome back!</h1>
						<div className="text-md  rounded-sm text-gray-300">
							Here's a list of{" "}
							<span className="text-xl font-bold text-tertiary">{number} {" "} products</span>
						</div>
					</div>

					{/* Button */}
					<button className="flex justify-center items-center text-white bg-secondary text-lg font-semibold rounded-md border-[2px] border-optional pl-2 pr-2 pt-1 pb-1 cursor-pointer hover:text-white hover:bg-optional" type="button" onClick={()=>{navigate('/addproduct')}}>Add Products</button>
				</div>

				{/* 2nd row  */}
				<div className="flex w-full justify-start items-center gap-3 ">
					<input
						type="text"
						className="border-[1px] w-[25%] rounded-md pt-2 pb-2 pl-3 bg-black text-white border-gray-100 "
						placeholder="Filter products..."
					/>



					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="text-white bg-black border-[1px] border-dashed pl-3 pr-3 pt-1 pb-1 flex gap-2 rounded-md">
								<CiCirclePlus className="text-white text-lg font-bold" />
								Status
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56 bg-black text-white">
							<DropdownMenuLabel>Options</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuCheckboxItem
								checked={defaultt}
								onCheckedChange={() => {
									checkProductChange("default");
									setShowOut(false);
									setShowMidium(false);
									setShowHigh(false);
									setShowLow(false);
								}}
							>
								Clear
							</DropdownMenuCheckboxItem>

							<DropdownMenuCheckboxItem
								checked={showOut}
								onCheckedChange={() => {
									checkProductChange("Out of Stock");
									setShowOut(!showOut);
									setShowMidium(false);
									setShowHigh(false);
									setShowLow(false);
								}}
							>
								Out Of Stock
							</DropdownMenuCheckboxItem>

							<DropdownMenuCheckboxItem
								checked={showLow}
								onCheckedChange={() => {
									checkProductChange("Low");
									setShowLow(!showLow);
									setShowMidium(false);
									setShowHigh(false);
									setShowOut(false);
								}}
							>
								Low
							</DropdownMenuCheckboxItem>

							<DropdownMenuCheckboxItem
								checked={showMidium}
								onCheckedChange={() => {
									setShowMidium(!showMidium);
									checkProductChange("Mid");
									setShowOut(false);
									setShowHigh(false);
									setShowLow(false);
								}}
							>
								Midium
							</DropdownMenuCheckboxItem>

							<DropdownMenuCheckboxItem
								checked={showHigh}
								onCheckedChange={() => {
									checkProductChange("High");
									setShowHigh(!showHigh);
									setShowMidium(false);
									setShowOut(false);
									setShowLow(false);
								}}
							>
								High
							</DropdownMenuCheckboxItem>

						</DropdownMenuContent>
					</DropdownMenu>


					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="text-white bg-black border-[1px] border-dashed pl-3 pr-3 pt-1 pb-1 flex gap-2 rounded-md">
								<CiCirclePlus className="text-white text-lg font-bold" />
								Categories
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-56 bg-black text-white">
							<DropdownMenuLabel>Options</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuCheckboxItem
								onCheckedChange={() => {
									checkProductChange("default");
								}}
							>
								Clear
							</DropdownMenuCheckboxItem>

							{categories.map((item) => (
								<DropdownMenuCheckboxItem
									onCheckedChange={() => {
										checkCategoryChange(item.name);
									}}
									key={item._id}
								>
									{item.name}
								</DropdownMenuCheckboxItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className=" w-full h-[68%] flex justify-start items-start flex-col pl-8 pr-8 pt-4 pb-4 overflow-hidden mt-10">

				<div className=" h-[55px] grid grid-cols-9 w-full border-[1px] border-white rounded-t-md  gap-2 bg-secondary">
					<h1 className="grid col-span-4 justify-center items-center text-gray-300 text-md">
						Name
					</h1>
					<h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">
						Price
					</h1>
					<h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">
						Quantity
					</h1>
					<h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">
						Minimum
					</h1>
					<h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">
						Status
					</h1>
					<h1 className="grid col-span-1 justify-center items-center text-gray-300 text-md">
						Value
					</h1>

					{/* <h1 className="bg-gray-100">heloo</h1> */}
				</div>

				<div className="h-auto w-full overflow-y-scroll border-[1px] border-white scrollbar-hidden">
					{products.map((item) => (
						<Product data={item} count={count++} key={item._id} handleDelete={handleDelete}/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Products;
