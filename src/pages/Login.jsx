import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenEyeIcon from "../../icons/OpenEyeIcon";
import CloseEyeIcon from "../../icons/CloseEyeIcon";

export default function Login() {
  const [eyePassword, useEyePassword] = useState("password");

  const toggleEyePassword = () => {
    useEyePassword(eyePassword === "password" ? "text" : "password");
  };
  return (
    <div style={{ height: "100vh" }} className="flex justify-center">
      <div className="flex items-center justify-center min-h-screen ">
        <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold  text-yellow-800 ">
              {" "}
              Welcome Back
            </span>
            <span className="font-light text-gray-400 mb-8">
              {" "}
              Welcome Back Please enter your details
            </span>
            <form>
            <div className="py-4 relative">
              <label className="mb-2 text-md text-yellow-800" htmlFor="email">
                Email:
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="py-4 relative">
              <label className="mb-2 text-md text-yellow-800" htmlFor="password">
                Password:
              </label>

              <input
                type={eyePassword}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500  "
                name="password"
                id="password"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={toggleEyePassword }
                className="absolute top-1/2 right-3 transform translate-y-1"
              >
                {eyePassword === "password" ? (
                  <CloseEyeIcon />
                ) : (
                  <OpenEyeIcon />
                )}
              </button>
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-4">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md"> remember me</span>
              </div>
              <Link className="font-bold text-md text-yellow-800 hover:underline">
                {" "}
                Forget Password
              </Link>
            </div>
            <input
              type="submit"
              className="w-full text-white p-2 rounded-lg mb-6 bg-brown-200 hover:bg-white hover:cursor-pointer hover:border  hover:text-brown-200 hover:border-brown-200"
              value="Log in"
            />
            <div className="text-center text-gray-400">
              Don't have an account?
              <Link
                to="/signup"
                className="font-bold  text-yellow-800 hover:underline"
              >
                {" "}
                Sign up for free
              </Link>
            </div>
            </form>
          </div>
          <div className="relative">
            <img
              src="/bookloginimage.avif"
              alt="image"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
