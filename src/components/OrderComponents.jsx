import { Link } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
import PayButton from "./PayButton";
export default function OrderComponents({
  calculateTotalPrice,
  // handleClick,
  createOrder,
  isLoading,
}) {
  const { getUserCartItems, cartItems } = useCartContext();
  console.log(calculateTotalPrice().toFixed(2));

  return cartItems.length > 0 ? (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-gray-900 ">Order summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Original price
            </dt>
            <dd className="text-base font-medium text-gray-900 ">
              {calculateTotalPrice().toFixed(2)} EGP
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Savings</dt>
            <dd className="text-base font-medium text-green-600">
              -299.00 EGP
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Store Pickup
            </dt>
            <dd className="text-base font-medium text-gray-900 ">99 EGP</dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Tax</dt>
            <dd className="text-base font-medium text-gray-900 ">799 EGP</dd>
          </dl>
        </div>
        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base font-bold text-gray-900 ">Total</dt>
          <dd className="text-base font-bold text-gray-900 ">
            {calculateTotalPrice().toFixed(2)} EGP
          </dd>
        </dl>
      </div>
      
      <PayButton/>
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-500"> or </span>
        <Link
          to={"/books"}
          title=""
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
        >
          Discover More
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Link>
      </div>
    </div>
  ) : (
    // <div className="flex items-center justify-center m-5">
    //   <div className="border shadow-2xl p-10">
    //     <h1 className="text-3xl text-brown-200 font-bold mb-3">Checkout</h1>
    //     <p className="font-bold text-black mb-3">
    //       Hi Bob, please review your items and press the confirm checkout button
    //       to place your order.
    //     </p>
    //     <hr />
    //     {cartItems.map((book) => {
    //       return (
    //         <div
    //           key={book.bookId._id}
    //           className="flex justify-between items-start py-3 cursor-pointer "
    //           onClick={handleClick}
    //         >
    //           <div className="flex">
    //             <div className="h-44 w-32">
    //               <img
    //                 src={book.bookId.coverImage}
    //                 alt="book"
    //                 className="w-full h-full rounded-md"
    //               />
    //             </div>
    //             <h2 className="text-xl mt-3 ml-3">{book.bookId.title}</h2>
    //           </div>
    //           <p className="text-xl font-bold mt-3 mr-3">
    //             ${book.bookId.price}
    //           </p>
    //         </div>
    //       );
    //     })}
    //     <hr />
    //     <div>
    //       <div className="flex justify-between my-5">
    //         <p className="text-xl font-bold">Total:</p>
    //         <p className="text-xl font-bold">${calculateTotalPrice()}</p>
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="flex items-end justify-end mt-5">
    //       <button
    //         onClick={createOrder}
    //         disabled={isLoading}
    //         className={`btn px-8 w-52 font-bold rounded-md  ${
    //           isLoading
    //             ? "bg-slate-700 text-white cursor-not-allowed"
    //             : "bg-brown-200 hover:bg-white hover:border-brown-200"
    //         } `}
    //       >
    //         {isLoading ? "CheckoutLoading..." : "Confirm Checkout"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center justify-center m-5">
      <p className="text-xl">No order Found </p>
    </div>
  );
}
