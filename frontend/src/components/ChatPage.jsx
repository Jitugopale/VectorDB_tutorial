import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const ChatPage = () => {
  const [message,setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [chat, setChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChat = async(e)=>{
        e.preventDefault();
        setLoading(true)

        const res = await axios.post(
          "http://localhost:5000/api/chat/chatUser",
          {
            message,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": sessionStorage.getItem("token"),
            },
          }
        );

        const response = res.data;

        if(response.message){
            setResponse(response.message)
            console.log(response.message)
            setChat(true)
            setLoading(false)

        }

        
    }

  return (
    <>
      <div className="chat">
        <div className="flex flex-col items-center justify-center h-dvh">
          <div className="border-2 p-4 rounded-2xl">
            <form>
              <h1 className="font-bold !text-4xl text-center">
                Chat Interface
              </h1>
              <div className="flex flex-col mt-2 mb-2">
                <label htmlFor="message">Users Query :</label>
                <textarea
                  className="border-2 rounded-md"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your query"
                />
              </div>
              <button
                type="submit"
                className="border-2 w-full rounded-md"
                onClick={handleChat}
                disabled={loading}
              >
                {loading ? "Submitting" : "Submit"}
              </button>
              {chat &&
                !loading && (
                  <>
                    <p className="bg-yellow-200">{response}</p>
                  </>
                )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage
