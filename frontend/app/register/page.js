"use client";

import PanelBox from "../components/common/PanelBox";
import InputField from "../components/common/InputField";
import PasswordField from "../components/common/PasswordField";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { useRouter } from "next/navigation";

import { apiRequest } from "../utils/api";

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginValidations, setLoginValidations] = useState(false);

  // Handle validations
  useEffect(() => {
    if (userEmail.length > 3 && password.length > 3 && userName.length > 3)
      setLoginValidations(true);
    else setLoginValidations(false);
  }, [userName, userEmail, password]);

  const Register = async () => {
    if (!loginValidations) return;
    setLoginValidations(false)

    const payload = {
      name: userName,
      email: userEmail,
      password: password,
    };

    const newUser = await apiRequest("/register", "POST", payload);
    // console.log('newUser =>', newUser)
    if (newUser?.authorisation) {
      const {
        authorisation: {
          token: {
            original: { authorisation: token },
          },
        },
      } = newUser;
      localStorage.setItem("token", token.token);
      localStorage.setItem("userName", newUser?.user.name);
      router.push('articles')
    }
  };

  return (
    <div className="bg-white text-black w-full h-screen pt-[68px]">
      <div className="flex flex-col h-full justify-center items-center">
        <PanelBox>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full">
              <h2 className="text-center text-[1.5rem] font-semibold">
                Welcome to Register
              </h2>
              <h3 className="text-center text-[14px] mb-2">
                Already have an account?
                <span
                  className="cursor-pointer font-semibold"
                  onClick={() => router.push("/login")}
                >
                  {" "}
                  Login
                </span>
              </h3>
              <hr className="mb-4" />
            </div>
            <div className="w-full">
              <InputField
                label="Username"
                placeholder="Enter name"
                type="text"
                getInputValue={setUserName}
              />
              <InputField
                label="Email"
                placeholder="Enter email"
                type="email"
                className="mt-2"
                getInputValue={setUserEmail}
              />
              <PasswordField
                label="Password"
                placeholder="Enter password"
                className="mt-2"
                getPasswordVal={setPassword}
              />
            </div>
            <Button
              className="mt-5"
              label="Register"
              disabled={!loginValidations}
              onClick={Register}
            />
          </div>
        </PanelBox>
      </div>
    </div>
  );
}
