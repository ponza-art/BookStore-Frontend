/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CreditCard, BadgeCheck, MessageCircleQuestion } from "lucide-react";
import { PiFileArrowDownDuotone } from "react-icons/pi";

function DetailsPage() {
  const [book, setBook] = useState({});
  console.log(book);

  const { id } = useParams();
  console.log(id);

  const fetchBook = async (id) => {
    try {
      const res = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/book/${id}`
      );
      console.log(res.data);

      setBook(res.data);
    } catch (error) {
      console.log("There is an error loading data...", error);
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, []);

  return (
    <main className="my-[9vh]">
      <section className="py-14">
        <div className="px-6 max-w-screen-2xl mx-auto grid gap-7 md:grid-cols-3 md:items-center lg:grid-cols-4">
          <div className="justify-self-center">
            <div className="carousel w-64">
              <div id="item1" className="carousel-item w-full">
                <img
                  src={book.coverImage}
                  className="w-full"
                  alt="Book Image"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7 md:col-span-2">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-3xl max-w-xl">{book.title}</h1>
              {/* <BadgeCheck className=" h-5 w-5 text-green-500" /> */}
              <span className="badge bg-yellow-600 text-lg ">{book.category}</span>

              <p className="text-md max-w-xl">{book.description}</p>
              <p className="text-gray-700">{book.author} </p>

              <p className="text-xl font-sans font-bold">{book.price}$</p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-center">
              <Link
                to={book.sourcePath}
                target="_blank"
                className="flex items-center justify-center gap-2 font-semibold bg-transparent text-[#4A2C2A] border-2 border-yellow-600 rounded-md px-6 py-2 hover:bg-yellow-600 hover:text-white transition-all duration-300"
              >
                Download
                <PiFileArrowDownDuotone size={28} />
              </Link>

              <Link
                to="/cart"
                className="flex items-center justify-center gap-2 bg-yellow-600 text-white rounded-md px-6 py-2 hover:bg-[#946B3C] transition-all duration-300"
              >
                Add to Cart
              </Link>
            </div>
          </div>

          <div className="md:hidden lg:block">
            <div className="border-l border-t border-r p-4">
              <CreditCard size={48} />
              <div className="mt-1">
                <p className="font-bold">Secure Payment</p>
                <span>100% Secure Payment</span>
              </div>
            </div>

            <div className="border-l border-t border-r p-4">
              <BadgeCheck size={48} />
              <div className="mt-1">
                <p className="font-bold">Money Back Guarantee</p>
                <span>Within 30 Days</span>
              </div>
            </div>

            <div className="border-l border-t border-r border-b p-4">
              <MessageCircleQuestion size={48} />
              <div className="mt-1">
                <p className="font-bold">24/7 Support</p>
                <span>Within 1 Business Day</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DetailsPage;
