import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      className=" navbar px-10"
      style={{ backgroundColor: "#dab26d" }}
    >
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-80 p-2 shadow gap-4 "
          >
            <li>
              <Link
                className="font-bold text-xl hover:text-yellow-600 hover:bg-transparent focus:bg-transparent focus:text-yellow-600 active:bg-transparent active:text-yellow-600"
                to={"#"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-xl  hover:text-yellow-600  hover:bg-transparent focus:bg-transparent focus:text-yellow-600 "
                to={"#"}
              >
                Categries
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-xl  hover:text-yellow-600  hover:bg-transparent focus:bg-transparent focus:text-yellow-600"
                to={"#"}
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <Link className=" bg-inherit  text-xl ps-3" to={"#"}>
          <img src="bookstore.png" width={"67"} />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="gap-10 menu-horizontal px-1  ">
          <li>
            <Link className="font-bold text-xl hover:bg-transparent hover:text-white focus:text-white ">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-bold text-xl  hover:bg-transparent hover:text-white focus:text-white  ">
              Categries
            </Link>
          </li>
          <li>
            <Link className="font-bold text-xl hover:bg-transparent hover:text-white focus:text-white ">
              Shop
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end font-bold text-xl flex ">
        <ul className=" flex  gap-8 items-center">
          <li>
            {" "}
            <Link
              className="hover:text-white focus:text-white active:text-white"
              to={"/login"}
            >
              Log in
            </Link>{" "}
          </li>
          <div className="dropdown dropdown-end " tabIndex={0} role="button">
            <li className=" font-serif text-xl w-10 h-10 flex items-center justify-center rounded-full bg-white text-black px-3 avatar">
              S
            </li>

            <ul
              tabIndex={0}
              className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="font-bold text-xl hover:text-yellow-600 hover:bg-transparent focus:bg-transparent focus:text-yellow-600 active:bg-transparent active:text-yellow-600">
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </ul>{" "}
      </div>

      {
        //////
      }
    </div>
  );
}

export default Header;
