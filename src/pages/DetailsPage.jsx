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
      const res = await axios.get(`http://localhost:5000/books/${id}`);
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
    <main>
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
              <h1 className="font-medium text-3xl max-w-xl">
                The Lost Colony (The Long Winter Trilogy Book 3)
                {/* {book.title} */}
              </h1>
              <p className="text-md max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut Excepteur sint occaecat.
                {/* {book.description} */}
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <a className="btn rounded-none px-8" href='https://storage.googleapis.com/iti-final-grad-proj.appspot.com/books/Orwell-1949_1984.pdf?GoogleAccessId=firebase-adminsdk-kwfua%40iti-final-grad-proj.iam.gserviceaccount.com&Expires=16447010400&Signature=NtvtqE79peU%2FklGgQiY%2FRPSlBpu%2F%2Bv2oUNLz%2BawKBpMtnOWtsEDd32BO7hKtwcn7cJriNu2f8jYwZfJlHKtpWlIkC%2BjOZRA4emKro2Lbygv09gW6pUnV4w1lbGMU5B5gUWwQihnyZbqyWBEUBdJ3%2FK5P6qGtvjnQ7kWwdtjWJxOrihZqtTP8U5H0CynxD%2BtcQmrmBlWG7yiVSx5KQFPqlvyfp7MCvFK5PqnuIqAOx4vphr9QF9pgf%2FE8w1%2FRQo3sjxm6CimU0ASwHQewZmDtLwa0DGB4uiBPtdgD4LBfN%2FbwOm9ncejlK5IV3WvWwBnsxyYvBIlArrrT6jESDPS2MQ%3D%3D' target="_blank"
                    rel="noreferrer">
                    View</a>
              <a className="btn btn-neutral rounded-none px-8" href="https://storage.googleapis.com/iti-final-grad-proj.appspot.com/books/Orwell-1949_1984.pdf?GoogleAccessId=firebase-adminsdk-kwfua%40iti-final-grad-proj.iam.gserviceaccount.com&Expires=16447010400&Signature=NtvtqE79peU%2FklGgQiY%2FRPSlBpu%2F%2Bv2oUNLz%2BawKBpMtnOWtsEDd32BO7hKtwcn7cJriNu2f8jYwZfJlHKtpWlIkC%2BjOZRA4emKro2Lbygv09gW6pUnV4w1lbGMU5B5gUWwQihnyZbqyWBEUBdJ3%2FK5P6qGtvjnQ7kWwdtjWJxOrihZqtTP8U5H0CynxD%2BtcQmrmBlWG7yiVSx5KQFPqlvyfp7MCvFK5PqnuIqAOx4vphr9QF9pgf%2FE8w1%2FRQo3sjxm6CimU0ASwHQewZmDtLwa0DGB4uiBPtdgD4LBfN%2FbwOm9ncejlK5IV3WvWwBnsxyYvBIlArrrT6jESDPS2MQ%3D%3D">
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
