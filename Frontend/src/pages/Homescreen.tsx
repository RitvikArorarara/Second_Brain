import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import brain from "../icons/brain.png";
import { SigninIcon } from "../icons/SigninIcon";
import { SignupIcon } from "../icons/SignupIcon";

export function Homescreen() {
  const navigate = useNavigate();

  return (
    <>
    
      <div className="p-4 min-h-screen">
        <div className="flex justify-center items-center h-screen flex-wrap">
          <img
            src={brain}
            alt="Brain"
            className="w-1/2 h-1/2 object-contain text-purple-600"
          />
          <div className="flex flex-col justify-start w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800">Welcome to</h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-indigo-700">The Second Brain</h1>
          <p className="text-xl md:text-2xl text-slate-600 mt-4">Your personal knowledge base</p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div>
                <Button
                  variant="primary"
                  text="Sign in"
                  onClick={() => {
                    navigate("/signin");
                  }}
                  startIcon={<SigninIcon />}
                  
                />
              </div>
              <div>
                <Button
                  variant="primary"
                  text="Sign up"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  startIcon={<SignupIcon />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
