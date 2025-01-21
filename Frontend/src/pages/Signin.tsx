import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {BACKEND_URL} from "../config";
import { useNavigate, Link } from "react-router-dom";
import { useRef } from "react";
import { Home } from "../icons/Home";
import { SigninIcon } from "../icons/SigninIcon";


export function SignIn() {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    localStorage.setItem("username", response.data.username);
    navigate("/dashboard");
  }
  return (
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
          Have no account?{" "}
          <Link to="/signup" className="text-purple-500">
            Sign up
          </Link>
        </p>
        <div className="flex justify-center pt-4">
          <Button
            loading={false}
            variant="primary"
            text="Sign in"
            fullWidth={true}
            onClick={signin}
            startIcon={<SigninIcon />}
          ></Button>
        </div>
        <p className="flex justify-center pt-4">
          <Link to="/" className="text-purple-800">
            <Home></Home>
          </Link>
        </p>
      </div>
    </div>
  );
}
