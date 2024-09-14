import React, { useState } from 'react'
import CloseEyeIcon from '../../icons/CloseEyeIcon'
import OpenEyeIcon from '../../icons/OpenEyeIcon'
import { Link } from "react-router-dom";
export default function Registration() {
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
              Register
            </span>
            <span className="font-light text-gray-400 mb-8">
              {" "}
              Create your account. It's free and only take a minute
            </span>
            <form>
            <div className="py-4 relative">
              <label class="mb-2 text-md text-yellow-800" for="email">
                User Name:
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="username"
                id="username"
                placeholder="User Nane"
              />
            </div>
            <div className="py-4 relative">
              <label class="mb-2 text-md text-yellow-800" for="email">
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
              <label class="mb-2 text-md text-yellow-800" for="password">
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
            <div className="flex  w-full py-4">
              <div className="mr-4">
                <input type="checkbox" name="ch" id="ch" class="mr-2" />
                <span className="text-md"> I accept the <Link to="#" className='text-yellow-800' >Terms of use & Privacy Policy</Link> </span>
              </div>
              
            </div>
            <input
              type="submit"
              className="w-full text-white p-2 rounded-lg mb-6 bg-brown-200 hover:bg-white hover:cursor-pointer hover:border  hover:text-brown-200 hover:border-brown-200"
              value="Register Now"
            />
            <div className="text-center text-gray-400">
              I already have an account?
              <Link
                to="/login"
                className="font-bold  text-yellow-800 hover:underline"
              >
                {" "}
                Log in
              </Link>
            </div>
            </form>
          </div>
          <div className="relative">
            <img
              src="/bookloginimage.avif"
              alt="image"
              className="w-[450px] h-full hidden rounded-r-2xl md:block object-fill"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
