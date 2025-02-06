import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Dashboard} from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import {Homescreen} from "./pages/Homescreen";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          if(localStorage.getItem("token")){
            <Route path="/dashboard" element={<Dashboard />} />
          }else{
            <Route path="/" element={<Homescreen />} />
          }
         
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
