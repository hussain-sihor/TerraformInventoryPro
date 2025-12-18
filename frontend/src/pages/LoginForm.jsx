import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";



const LoginForm = () => {
  const navigate = useNavigate();

	const [email,setEmail] = useState("temp@gmail.com");
	const [password,setPassword] = useState("12345");

	const toastOptions = {
		position: "bottom-right",
		theme: "dark",
		pauseOnHover: false,
		draggable: true,
		autoClose: 4000,
	};

	const handleSubmit = async (e) => {
		  e.preventDefault();
		  try{
		  const res = await axiosInstance.post("/users/login",{email:email,password:password} )
		
		  if(res.status == 200){
				localStorage.setItem("token",res.data.token);
		   toast.success("Sign In Successfully", toastOptions);
		    navigate('/dashboard');
		  }
		  }
			catch(err){
		   toast.error(err.response.data.message, toastOptions);
		  }
		 
		 
		 };

	return (
		<div className="w-full h-[calc(100vh-65px)] flex justify-center items-center bg-primary">
			<div className="w-[45vw] h-[65vh] flex justify-center items-center  py-5  flex-col gap-5  rounded-xl bg-secondary border-2 border-white">
	
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-[5vh] justify-center "
				>
			
					{/* Email  */}
					<div>
						<div className="flex justify-center items-center gap-3">
						{/* <label htmlFor="email" className="font-semibold text-white">
										Email :
									</label> */}
							<input
							  value={email}
							  onChange={(e)=>{setEmail(e.target.value)}}
								type="email"
								placeholder="Enter email"
								className=" p-3 w-[70%]  bg-white rounded-lg border-[3px] border-gray-900 shadow-sm shadow-optional placeholder-gray-900"
							></input>
							<MdEmail className="text-xl text-white" />
						</div>
					</div>
					{/* Password  */}
					<div>
						<div className="flex justify-center items-center gap-3">
						{/* <label htmlFor="password" className="font-semibold text-white">
										Password :
									</label> */}
							<input
							value={password}
							onChange={(e)=>{setPassword(e.target.value)}}
								type="password"
								placeholder="Enter password"
								className="p-3 w-[70%]  bg-white rounded-lg border-[3px] border-gray-900 shadow-sm shadow-optional placeholder-gray-900"
							></input>
							<RiLockPasswordFill className="text-xl text-white" />
						</div>
					</div>
					{/* Button  */}
					<div className="flex justify-center items-center gap-3">
						<button className="px-4 py-2 w-[30%] bg-tertiary text-lg text-white rounded-md font-semibold hover:bg-optional border-2 border-white">
							Sign In
						</button>
					</div>
				</form>

				<div className="text-white">
					{/* Navigate links */}
					
						<a href="/register">
							Don't have an account?{" "}
							<span className="text-optional text-lg font-medium ">
								Register Here
							</span>
						</a>
				
					
					
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
