
import './App.css'
import ChatPage from './components/ChatPage';
import Login from './components/Login';
import OTPLogin from './components/OTPLogin';
import Register from './components/Register'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/otp-login" element={<OTPLogin/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
