import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const OTPLogin = () => {

    const navigate = useNavigate();
    const [phoneNo,setPhoneNo] = useState("");
    const [otpSent,setOtpSent] = useState(false);
    const [otp,setOtp] = useState("");
    const [token, setToken]= useState("");
    const [response,setResponse] = useState(null);

    const handleSentOTP = async(e)=>{
        e.preventDefault();

        const res = await axios.post("http://localhost:5000/api/auth/otp-sent",{
            phoneNo
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })

        const response = res.data;

        if(response.message === "OTP Sent Sucessfully"){
            setResponse(response.message)
            console.log(response.message)
            setToken(response.token)
            setOtpSent(true)

        }

        
    }
    const handleVerifyOTP = async(e)=>{
        e.preventDefault();

        const res = await axios.post("http://localhost:5000/api/auth/otp-verify",{
            otp
        },{
            headers:{
                "Content-Type":"application/json",
                "auth-token":token
            }
        })

        const response = res.data;

        if(response.message === "Login Successful"){
            setResponse(response.message)
            console.log(response.message)
            sessionStorage.setItem('token',response.token)

            navigate('/chat')
        }

        
    }

  return (
    <>
      <div className="otp">
        <div className="flex flex-col justify-center items-center h-dvh">
          <div className="border-2 p-5 rounded-2xl">
            <form onSubmit={handleSentOTP}>
              <div>
                <h1 className="!text-4xl font-bold text-center mb-3">
                  OTP Based LoginPage
                </h1>
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="phoneNo">
                  Phone No<span className="text-red-500">*</span>
                </label>
                <input
                  value={phoneNo}
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter your phoneNo"
                  className="border border-gray-300 rounded-md"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="border border-gray-700 w-full mt-2 rounded-md"
              >
                Submit
              </button>
              {otpSent && (
                <>
                  <div className="text-green-500 mt-2 text-center">
                    <h1>OTP Sent Successfully</h1>
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="border border-gray-700 w-full mt-2 rounded-md" onClick={handleVerifyOTP}>
                      Verify OTP
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPLogin
