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
            <h2 className="text-6xl font-bold text-gray-800 text-wrap">
              Welcome to
            </h2>
            <h1 className="text-8xl font-bold text-purple-800 text-wrap">
              The Second Brain
            </h1>
            <p className="text-4xl text-gray-800 font-semibold text-end">
              Your personal knowledge base
            </p>
            <div className="flex justify-center items-center gap-10 mt-10">
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
