import { useEffect, useState } from "react";
import AddImage from "../components/AddImage";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
const Addproduct = () => {

	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		theme: "dark",
		pauseOnHover: false,
		draggable: true,
		autoClose: 4000,
	};
	const [categories,setCategories] = useState([]);
	const [image,setImage] = useState();
  

// GET CATEGORIES AND USER INFO
	useEffect(() => {
		const getCategories = async () => {
			const token = localStorage.getItem("token");

			await axiosInstance
				.get("/categories/getcategories", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					if(response.status == 400){return};

					
					setData({ ...data, category: response.data[0].name });
					
					// console.log(response.data.length,"REEEE");
					// console.log(response.data[0].name,"REEEE");
					setCategories(response.data);
				});
		};

		const getUserInfo = async () => {
			const token = localStorage.getItem("token");
			await axiosInstance
				.get("/users/getuser", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setEmployee(response.data.user);
				});
		};

		getCategories();
		getUserInfo();
	}, []);

	
	const supplier = [
		"LOréal India Pvt Ltd,A-Wing,8th Floor,Marathon Futurex",
		"Hindustan Pencils New delhi",
		"Adiddas Mega factory East-Mumbai",
		"Lg Twin Tower,128,Yeoui-Daero,Yeongdeungpo-Gu, Seoul,07336",
		"402,4th Floor,Supreme Chambers,17/18 Shah Industrial Estate,Veera Desai Road,Andheri West,Mumbai 400058,",
	];
  const [employee,setEmployee] = useState({});	

	const [data, setData] = useState({
		name: "",
		category: categories ? categories[0]:"",
    desc:"",
    quantity:0,
    price:0,
    supplier: supplier ? supplier[0] : "",
    level:0,
		status:"Out of Stock"
	});

	const saveImage = (src)=>{
		setImage(src);
	}

	const handleSubmit = async(event) => {
		event.preventDefault();
		console.log(data);
    
		if(parseInt(data.quantity) == 0){
			data.status = "Out of Stock";
		}
		else if(parseInt(data.quantity) < parseInt(data.level)){
			data.status = "Low";
		}
		else if(parseInt(data.quantity) < parseInt((data.level) * 2) ){
			data.status = "Mid";
		}
		else{
			data.status = "High";
		}
		try{
				const token = localStorage.getItem("token");
				await axiosInstance.post("/products/addproduct", {
					name:data.name,
					category:data.category,
					desc:data.desc,
					quantity:data.quantity,
					price:data.price,
					supplier:data.supplier,
					level:data.level,
					author:employee._id,
					photo:image,
					status:data.status},{headers:{Authorization:`Bearer ${token}`}})
				.then((response) => {
					if(response.status==200){
						setData({		
							name: "",
							category: "",
							desc:"",
							quantity:"",
							price:"",
							supplier:"",
							level:"",
						 })
						 toast.success("Product added successfully",toastOptions);
							navigate("/products")
					}
				});

			}catch(error){
					console.log(error);
					toast.error(error.response.data.message,toastOptions);
			
			}
		
	};

	return (
		<div className="w-full h-[calc(100vh-65px)] flex justify-start items-start bg-primary flex-col pl-8 pr-8 pt-4 pb-4 ">
		<div className="w-full h-[8%] ">
			<h1 className="text-xl font-bold text-white">Add product</h1>
		</div>

    <div className="h-[92%] w-full flex justify-center items-center overflow-hidden">

			<div className="w-[75vw] h-[100%] flex justify-start items-start pl-5 pr-5 pt-4 pb-4  flex-col gap-5 rounded-xl shadow-gray-900 shadow-md max-sm:w-[80%] max-sm:h-[55vh] border-dashed border-[2px] border-tertiary">
				<div
					className="flex flex-col gap-4 w-full h-full justify-center items-between  rounded-xl"
				>
					<div className="flex gap-6">
						<div className="flex flex-col gap-1 w-[50%] text-gray-300">
							<label htmlFor="name" className="font-semibold">
								Product Name :
							</label>
							<input
								value={data.name}
								onChange={(e) => setData({ ...data, name: e.target.value })}
								type="text"
								className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
							/>
						</div>

						<div className="flex flex-col gap-1 w-[50%] text-gray-300">
							<label htmlFor="category" className="font-semibold">
								Category :
							</label>
							<select
								value={data.category}
								onChange={(e) => setData({ ...data, category: e.target.value })}
								name="category"
								className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
							>
								{categories.map((item,index) => (
									<option value={item.name} key={index}>{item.name}</option>
								))}
							</select>
						</div>
					</div>

          <div className="flex flex-col gap-1 text-gray-300">
          <label htmlFor="desc" className="font-semibold">
								Product Description :
							</label>
           <textarea value={data.desc}
								onChange={(e) => setData({ ...data, desc: e.target.value })}
								type="text" rows={2} className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"></textarea>
          </div>

         {/* PHOTOS  */}
				 <AddImage handleImage={saveImage}/>
				
				 
				

         <div className="flex gap-6">
						<div className="flex flex-col gap-1 w-[50%] text-gray-300">
							<label htmlFor="quantity" className="font-semibold">
								Quantity Available :
							</label>
							<input
								value={data.quantity}
								onChange={(e) => setData({ ...data, quantity: e.target.value })}
								type="text"
								className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
							/>
						</div>

            <div className="flex flex-col gap-1 w-[50%] text-gray-300">
							<label htmlFor="price" className="font-semibold">
								Unit Price :
							</label>
							<input
								value={data.price}
								onChange={(e) => setData({ ...data, price: e.target.value })}
								type="text"
								className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
							/>
						</div>
					</div>

          <div className="flex gap-6">

          <div className="flex flex-col gap-1 w-[50%] text-gray-300">
							<label htmlFor="supplier" className="font-semibold">
								Supplier :
							</label>
							<select
								value={data.supplier}
								onChange={(e) => setData({ ...data, supplier: e.target.value })}
								name="category"
								className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
							>
								{supplier.map((item) => (
									<option value={item} key={item}>{item}</option>
								))}
							</select>
						</div>

						<div className="flex flex-col gap-1 w-[50%] text-gray-300">
							<label htmlFor="name" className="font-semibold">
								Reorder level :
							</label>
							<input
								value={data.level}
								onChange={(e) => setData({ ...data, level: e.target.value })}
								type="number"
								className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
							/>
						</div>

						
					</div>

          <div className="flex gap-6 items-center">
						<div className="flex flex-col gap-1 w-[30%]">
            <button
						onClick={handleSubmit}
						className="pl-1 pr-1 pt-1 pb-1 rounded-md font-semibold border-[1px]
						border-white bg-white text-black text-lg hover:bg-gray-300"
					>
						Save
					</button>
          </div>
          <div className="flex w-[70%] justify-start items-center">
						<div className="font-semibold text-white capitalize justify-start items-center ">Author: <span className="text-lg text-optional">{employee.name}</span></div>
						</div>
					

						
					</div>
				</div>
			</div>
			</div>
		</div>
	);
};

export default Addproduct;
