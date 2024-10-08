import { useState } from 'react';

function AboutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <main className="bg-brand-grey-lighter py-16">
      <section className="mb-8 py-8 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="border rounded-lg bg-white overflow-hidden md:grid md:grid-cols-3">
            <div className="col-span-2 py-16 px-8">
              <p className="font-poppins text-brand-secondary">About Us</p>
              <p className="font-poppins font-semibold text-brand-black text-2xl mb-4">
                What we really do?
              </p>
              <p className="font-poppins">
                We are dedicated to connecting readers with their next great
                read. Whether you are looking for the latest bestseller, a
                timeless classic, or a hidden gem, our carefully curated
                selection offers something for every book lover. With a
                user-friendly platform, we make it easy to discover, purchase,
                and enjoy books from the comfort of your home.
              </p>
            </div>
            <img
              className="h-full w-full object-cover object-center"
              src="/about/reading-1.webp"
              alt="Reading"
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="border rounded-lg bg-white overflow-hidden md:grid md:grid-cols-2">
            <img
              className="h-full w-full object-cover object-center"
              src="/about/reading-4.jpg"
              alt="Reading"
            />

            <div className="py-8 px-8">
              <p className="font-poppins font-semibold text-brand-black text-2xl mb-8">
                Contact Us
              </p>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-sm">
                    Name
                  </label>
                  <div>
                    <input
                      type="text"
                      className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-sm">
                    Email
                  </label>
                  <div>
                    <input
                      type="text"
                      className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-sm">
                    Subject
                  </label>
                  <div>
                    <input
                      type="text"
                      className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-sm">
                    Message
                  </label>
                  <div>
                    <textarea
                      type="text"
                      className="h-32 w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button className="mt-6 flex items-center justify-center gap-1 rounded px-4 py-2 bg-brand-primary text-white transition-all duration-300 hover:bg-brand-primary-darker">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
