import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OpenEyeIcon from "../../icons/OpenEyeIcon";
import CloseEyeIcon from "../../icons/CloseEyeIcon";
import { UsersShemalogin } from "../interface/UserShema";
import Input from "../components/Input";
import ErrorInput from "../components/ErrorInput";
import axios from "axios";
import { UserContext } from "../hooks/UserContext";

export default function Login() {
  const [eyePassword, useEyePassword] = useState("password");
  const { setUserInfo } = useContext(UserContext);
  const toggleEyePassword = () => {
    useEyePassword(eyePassword === "password" ? "text" : "password");
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
  const Login = async (e) => {
    try {
      e.preventDefault();

      // Validate the form data using Joi schema
      const { error, value } = UsersShemalogin.validate(
        { email: form.email, password: form.password },
        { abortEarly: false }
      );

      if (error) {
        // Handle validation errors
        const errors = error.details.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        console.log(errors);
        setErrorState(errors);
      } else {
        // Clear validation errors if form is valid
        setErrorState({ email: null, password: null });

        try {
          // Send data to the backend for login
          const response = await axios.post(
            "http://localhost:5000/users/login",
            {
              email: value.email,
              password: value.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Handle successful login response
          console.log(response.data);
          const Data = response.data.data;
          localStorage.setItem("token", Data.user.token);
          localStorage.setItem("user", JSON.stringify(Data.user));

          const userData = JSON.parse(localStorage.getItem("user"));

          setUserInfo(userData);
          navigate("/", { replace: true });
        } catch (err) {
          // Handle backend errors
          console.error("An error occurred:", err);

          if (err.response && err.response.data && err.response.data.message) {
            // Check if the error is related to invalid email or password
            if (
              err.response.data.message.includes("Incorrect Email or Password")
            ) {
              setErrorState({
                email: "Email not found",
                password: "Password not Correct",
              });
            } else {
              setErrorState({
                email: "Login failed. Please try again.",
                password: null,
              });
            }
          } else {
            // Generic error handling for network issues or unknown errors
            setErrorState({
              email: "A network error occurred. Please try again later.",
              password: null,
            });
          }
        }
      }
    } catch (e) {
      console.error("An unexpected error occurred:", e);
      setErrorState({
        email: "An unexpected error occurred. Please try again.",
        password: null,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  const handleOnBLur = (e) => {
    const { name, value } = e.target;

    //setForm({ ...form, [name]: value });
    const { error } = UsersShemalogin.validate(
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
            <form onSubmit={Login}>
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
                    className="absolute top-1/2 right-3 transform  -translate-y-4 md:-translate-y-1  "
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
                    className="absolute top-1/2 right-3 transform translate-y-1 "
                  >
                    {eyePassword === "password" ? (
                      <CloseEyeIcon />
                    ) : (
                      <OpenEyeIcon />
                    )}
                  </button>
                </div>
              )}
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
