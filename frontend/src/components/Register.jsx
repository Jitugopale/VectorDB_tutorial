import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [response,setResponse] = useState(null);

    const handleRegister = async(e)=>{
        e.preventDefault();

        const res = await axios.post("http://localhost:5000/api/auth/register",{
            name,email,password,phoneNo
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })

        const response = res.data;

        if(response.message === "User created successfully"){
            setResponse(response.message)
            console.log(response.message)

            navigate('/login')
        }

        
    }

  return (
    <>
      <div className="register">
        <div className="flex flex-col justify-center items-center h-dvh">
          <div className="border-2 p-5 rounded-2xl">
            <form onSubmit={handleRegister}>
              <div>
                <h1 className="!text-4xl font-bold text-center mb-3">
                  RegisterPage
                </h1>
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-md"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="password">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="border border-gray-300 rounded-md"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="phoneNo">
                  PhoneNo<span className="text-red-500">*</span>
                </label>
                <input
                  value={phoneNo}
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter your phoneNo"
                  className="border border-gray-300 rounded-md"
                  onChange={(e)=>setPhoneNo(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="border border-gray-700 w-full mt-2 rounded-md"
              >
                Submit
              </button>
              <div className="mt-2">
                <span>
                  Already Registered?{" "}
                  <Link to="/login" className="text-blue-800">
                    Go to Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register
