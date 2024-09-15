import React from "react";

export default function HomeHeader() {
  return (
    <div>
      <div className="text-center my-5 mt-10 mb-20">
        {" "}
        <h1 className="text-3xl font-semibold">
          Discover Read &{" "}
          <h2 className="text-red-500 inline-block">Download</h2> Books{" "}
        </h1>
      </div>
      {
        //cover Div
      }
      <div
        className=" parentDiv grid grid-cols-12 gap-4  mx-2 lg:mx-auto mt-20 container "
        style={{ width: "90vw" }}
      >
        <div className="xl:col-span-3 col-span-2 grid grid-cols-12 xl:me-10 lg:me-5 me-20 ">
          <div className=" col-span-6 mt-12 transition-transform duration-1000 ease-in-out hover:-translate-y-4 hidden xl:block ">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-10.jpg"
              alt="photo"
            />
          </div>
          <div className="xl:col-span-6 col-span-12 ms-11 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-5.jpg"
              alt="photo"
            />
          </div>
          <div className="col-span-6 mt-20 transition-transform duration-1000 ease-in-out hover:-translate-y-4 hidden xl:block ">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-6.jpg"
              alt="photo"
            />
          </div>
          <div className="xl:col-span-6 col-span-12  ms-10 mt-7 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-9.jpg"
              alt="photo"
            />
          </div>
        </div>
        {
          //second div
        }

        <div className="lg:col-span-6 md:col-span-9  col-span-12 grid grid-cols-12 relative">
          <div className="col-span-4 relative z-10 transition-transform duration-1000 ease-in-out hover:-translate-y-4 h-28 ">
            <img
              className="relative ml-12"
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-1.png"
            />
          </div>
          <div className=" h-28 col-span-4 relative z-30 transform scale-110 translate-y-2 md:translate-y-1 md:translate-x-7 ease-in-out transition-transform duration-1000 hover:-translate-y-4 ">
            <img
              className="relative"
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-11.jpg"
            />
          </div>
          <div className=" h-28 col-span-4 relative z-10 transition-transform duration-1000 ease-in-out hover:-translate-y-4 mb-60">
            <img
              className="relative "
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-2.png"
            />
          </div>
        </div>

        {
          ///third div
        }
        <div className="lg:col-span-3 col-span-1 grid grid-cols-12 xl:ms-20 lg:ms-10 ms-0">
          <div className=" lg:col-span-6 col-span-12 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block ">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-7.jpg"
              alt="photo"
              
            />
          </div>
          <div className="col-span-6 mt-10 ms-11 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-24  hidden lg:block  ">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-4.jpg"
              alt="photo"
            />
          </div>
          <div className="lg:col-span-6 col-span-12  mt-14 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block  ">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-3.jpg"
              alt="photo"
            />
          </div>
          <div className="col-span-6 mt-28 ms-10 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden lg:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-8.jpg"
              alt="photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
