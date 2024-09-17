"use client";

import PanelBox from "../components/common/PanelBox";
import InputField from "../components/common/InputField";
import PasswordField from "../components/common/PasswordField";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginValidations, setLoginValidations] = useState(false);

  // Handle validations
  useEffect(() => {
    if (userEmail.length > 3 && password.length > 3) setLoginValidations(true);
    else setLoginValidations(false);
  }, [userEmail, password]);

  const Login = async () => {
    if (!loginValidations) return;

    const payload = {
      email: userEmail,
      password: password,
    };
    console.log("payload => ", payload);
  };

  return (
    <div className="bg-white text-black w-full h-screen pt-[68px]">
      <div className="flex flex-col h-full justify-center items-center">
        <PanelBox>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full">
              <h2 className="text-center text-[1.5rem] font-semibold">
                Welcome to Login
              </h2>
              <h3 className="text-center text-[14px] mb-2">
                Don't have an account?
                <span
                  className="cursor-pointer font-semibold"
                  onClick={() => router.push("/register")}
                >
                  {" "}
                  Register
                </span>
              </h3>
              <hr className="mb-4" />
            </div>
            <div className="w-full">
              <InputField
                label="Email"
                placeholder="Enter email"
                type="email"
                getInputValue={setUserEmail}
              />
              <PasswordField
                label="Password"
                placeholder="Enter password"
                className='mt-2'
                getPasswordVal={setPassword}
              />
            </div>
            <Button
              className="mt-5"
              label="Login"
              disabled={!loginValidations}
              onClick={Login}
            />
          </div>
        </PanelBox>
      </div>
    </div>
  );
}
