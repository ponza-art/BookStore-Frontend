/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CreditCard, BadgeCheck, MessageCircleQuestion } from 'lucide-react';

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
      console.log('There is an error loading data...', error);
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, []);

  return (
    <main style={{ marginBottom: "11.1vh" }}>
      <section className="py-14">
        <div className="px-6 max-w-screen-2xl mx-auto grid gap-7 md:grid-cols-3 md:items-center lg:grid-cols-4">
          <div className="justify-self-center">
            <div className="carousel w-64">
              <div id="item1" className="carousel-item w-full">
                <img src="/book-1.jpg" className="w-full" alt="Book Image" />
              </div>
              <div id="item2" className="carousel-item w-full">
                <img src="/book-2.jpg" className="w-full" alt="Book Image" />
              </div>
            </div>

            <div className="flex w-full justify-center gap-2 py-2">
              <a href="#item1" className="btn btn-xs">
                1
              </a>
              <a href="#item2" className="btn btn-xs">
                2
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-7 md:col-span-2">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-3xl max-w-xl">{book.title}</h1>
              <p className="text-md max-w-xl">{book.description}</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <a className="btn btn-outline rounded-none px-8"
                href={book.sourcePath}
                target="_blank" rel="noreferrer">
                View
              </a>

              <a
                href={book.sourcePath}
                download
                className="btn btn-neutral rounded-none px-8"
              >
                Download
              </a>

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
