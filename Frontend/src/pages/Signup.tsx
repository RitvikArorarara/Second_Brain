import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "../icons/Home";
import { SignupIcon  } from "../icons/SignupIcon";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("Signed up");
  }

  return (
    <>
      <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
          <Input
            reference={usernameRef}
            placeholder="Username"
            type="text"
          ></Input>
          <Input
            reference={passwordRef}
            placeholder="Password"
            type="password"
          ></Input>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-purple-500">
              Sign in
            </Link>
          </p>

          <div className="flex justify-center pt-4">
            <Button
              loading={false}
              variant="primary"
              text="Sign up"
              fullWidth={true}
              onClick={signup}
              startIcon={<SignupIcon />}
            ></Button>
          </div>
          <p className="flex justify-center pt-4">
            <Link to="/" className="text-purple-800">
              <Home></Home>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
