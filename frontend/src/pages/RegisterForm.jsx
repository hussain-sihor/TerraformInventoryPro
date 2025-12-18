import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { RiGitRepositoryFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";

const LoginForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [position, setPosition] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
		const res = await axiosInstance.post("/users/register", {
				email,
				password,
        phone,
        position,
        name
			})
			if(res.status == 200){
				localStorage.setItem("token",res.data.token);
		   toast.success("User Created Successfully", toastOptions);
		  navigate('/login');
		  }
		  }
			catch(err){
		   toast.error(err.response.data.message, toastOptions);
		  }
	};

	const toastOptions = {
		position: "bottom-right",
		theme: "dark",
		pauseOnHover: false,
		draggable: true,
		autoClose: 4000,
	};

	return (
		<div className="w-full h-[calc(100vh-65px)] flex justify-center items-center bg-primary">
			<div className="w-[45vw] h-[80vh] flex justify-center items-center  py-5  flex-col gap-5  rounded-xl bg-secondary border-2 border-white">
				<form
					//handelSubmit funct from react-hook-form which needs userdefined function
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-[5vh] justify-center "
				>
					{/* Name  */}
					<div>
						<div className="flex justify-center items-center gap-3">
							<input
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
								type="text"
								placeholder="Enter name"
								className=" p-3 w-[70%]  bg-white rounded-lg border-[3px] border-gray-900 shadow-sm shadow-optional placeholder-gray-900"
							></input>
							<FaUser className="text-xl text-white" />
						</div>
					</div>

					{/* Email  */}
					<div>
						<div className="flex justify-center items-center gap-3">
							<input
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								placeholder="Enter email"
								className=" p-3 w-[70%]  bg-white rounded-lg border-[3px] border-gray-900 shadow-sm shadow-optional placeholder-gray-900"
							></input>
							<MdEmail className="text-xl text-white" />
						</div>
					</div>


					{/* Phone  */}
					<div>
						<div className="flex justify-center items-center gap-3">
							<input
								value={phone}
								onChange={(e) => {
									setPhone(e.target.value);
								}}
								type="phone"
								placeholder="Enter phone number"
								className=" p-3 w-[70%]  bg-white rounded-lg border-[3px] border-gray-900 shadow-sm shadow-optional placeholder-gray-900"
							></input>
							<FaPhoneAlt className="text-xl text-white" />
						</div>
					</div>

					{/* position  */}
					<div>
						<div className="flex justify-center items-center gap-3">
							<input
								value={position}
								onChange={(e) => {
									setPosition(e.target.value);
								}}
								type="text"
								placeholder="Enter position"
								className=" p-3 w-[70%]  bg-white rounded-lg border-[3px] border-gray-900 shadow-sm shadow-optional placeholder-gray-900"
							></input>
							<RiGitRepositoryFill className="text-xl text-white" />
						</div>
					</div>

					{/* Password  */}
					<div>
						<div className="flex justify-center items-center gap-3">
							<input
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type="password"
								placeholder="Enter password"
								className=" p-3 w-[70%]  bg-white rounded-lg border-[3px] border-gray-900 shadow-sm shadow-optional placeholder-gray-900"
							></input>
							<RiLockPasswordFill className="text-xl text-white" />
						</div>
					</div>

					{/* Button  */}
					<div className="flex justify-center items-center gap-3">
						<button className="px-4 py-2 w-[30%] bg-tertiary text-lg text-white rounded-md font-semibold hover:bg-optional border-2 border-white">
							Lets go
						</button>
					</div>
				</form>

				<div className="text-white">
					{/* Navigate links */}

					<a href="/login">
						Already have an account?{" "}
						<span className="text-optional text-lg font-medium ">
							Sign In Here
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
