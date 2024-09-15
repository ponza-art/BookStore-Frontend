import React, { useState } from "react";
import CloseEyeIcon from "../../icons/CloseEyeIcon";
import OpenEyeIcon from "../../icons/OpenEyeIcon";
import { Link, useNavigate } from "react-router-dom";
import { UsersShemasign } from "../interface/UserShema";
import axios from "axios";
import ErrorInput from "../components/ErrorInput";
import Input from "../components/Input";
export default function Registration() {
  const [eyePassword, setEyePassword] = useState("password");
  const toggleEyePassword = () => {
    setEyePassword(eyePassword === "password" ? "text" : "password");
  };

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    username: null,
    email: null,
    password: null,
  });
  const navigate = useNavigate();

  const Register = async (e) => {
    try {
      e.preventDefault();
      const { error, value } = UsersShemasign.validate(
        { username: form.username, email: form.email, password: form.password },
        { abortEarly: false }
      );
      if (error) {
        const errors = error.details.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        console.log(errors);
        setErrorState(errors);
      } else {
        setErrorState({ username: null, email: null, password: null });
        const response = await axios.post(
          "http://localhost:5000/users/register",
          {
            username: value.username,
            email: value.email,
            password: value.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("An error occurred:", err);
      if (err.response && err.response.data && err.response.data.message) {
        // Check if the error is about a duplicate email
        if (err.response.data.message.includes("Invalid Email")) {
          setErrorState({ ...errorState, email: "This email is already registered." });
        } else {
          // Handle other types of errors returned by the server
          setErrorState({ ...errorState, general: "Registration failed. Please try again." });
        }
      } else {
        // Generic error handling for network issues
        setErrorState({ ...errorState, general: "A network error occurred. Please try again later." });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    
  };
 const handleOnBLur=(e)=>{
  const { name, value } = e.target;

    //setForm({ ...form, [name]: value });
  const { error } = UsersShemasign.validate(
    { ...form, [name]: value },
    { abortEarly: false }
  );

  if (error) {
    const errors = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});
    setErrorState(errors);
  } else {
    setErrorState({ ...errorState, [name]: null });
  }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center justify-center min-h-screen ">
        <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold  text-yellow-800 ">
              {" "}
              Register
            </span>
            <span className="font-light text-gray-400 mb-5">
              {" "}
              Create your account. It's free and only take a minute
            </span>
            <form onSubmit={Register}>
              {errorState.username ? (
                <ErrorInput
                  value={form.username}
                  onChanges={handleChange}
                  Error={errorState.username}
                  text="User Name"
                  placeHolder="UserName "
                  htmlFor="username"
                  name="username"
                  id="username"
                  type="text"
                  onBlur={handleOnBLur}
                />
              ) : (
                <Input
                  value={form.username}
                  onChanges={handleChange}
                  text="User Name"
                  placeHolder="UserName "
                  htmlFor="username"
                  name="username"
                  id="username"
                  type="text"
                  onBlur={handleOnBLur}

                />
              )}
              {errorState.email ? (
                <ErrorInput
                  value={form.email}
                  onChanges={handleChange}
                  Error={errorState.email}
                  text=" Email"
                  placeHolder="Email"
                  htmlFor="email"
                  name="email"
                  id="email"
                  type="text"
                  onBlur={handleOnBLur}
                />
              ) : (
                <Input
                  value={form.email}
                  onChanges={handleChange}
                  text=" Email"
                  placeHolder="Email"
                  htmlFor="email"
                  name="email"
                  id="email"
                  eyePassword={eyePassword}
                  type="text"
                  onBlur={handleOnBLur}
                />
              )}
              {errorState.password ? (
                <div className="relative">
                  <ErrorInput
                    value={form.password}
                    onChanges={handleChange}
                    Error={errorState.password}
                    text="Password"
                    placeHolder="Password"
                    htmlFor="password"
                    name="password"
                    id="password"
                    type={eyePassword}
                    onBlur={handleOnBLur}
                  />
                  <button
                    type="button"
                    onClick={toggleEyePassword}
                    className="absolute top-1/2 right-3 transform -translate-y-1"
                  >
                    {eyePassword === "password" ? (
                      <CloseEyeIcon />
                    ) : (
                      <OpenEyeIcon />
                    )}
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    value={form.password}
                    onChanges={handleChange}
                    text="Password"
                    placeHolder="Password"
                    htmlFor="password"
                    name="password"
                    id="password"
                    type={eyePassword}
                    onBlur={handleOnBLur}
                  />
                  <button
                    type="button"
                    onClick={toggleEyePassword}
                    className="absolute top-1/2 right-3 transform translate-y-1"
                  >
                    {eyePassword === "password" ? (
                      <CloseEyeIcon />
                    ) : (
                      <OpenEyeIcon />
                    )}
                  </button>
                </div>
              )}

              <div className="flex  w-full py-4">
                <div className="mr-4">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-md">
                    {" "}
                    I accept the{" "}
                    <Link to="#" className="text-yellow-800">
                      Terms of use & Privacy Policy
                    </Link>{" "}
                  </span>
                </div>
              </div>
              <input
                type="submit"
                className="w-full text-black p-2 rounded-lg mb-6 bg-brown-200 hover:bg-white hover:cursor-pointer hover:border  hover:text-black hover:border-brown-200"
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
  );
}
