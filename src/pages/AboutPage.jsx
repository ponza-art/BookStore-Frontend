import { useState } from 'react';

function AboutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <main>
      <div className=" max-w-screen-lg mx-auto">
        <section className="py-16 px-4">
          <h1 className="text-center text-4xl font-semibold mt-14 mb-20">
            About Us
          </h1>

          <div className="flex flex-col items-start gap-14 mb-32">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                What we really do?
              </h2>
              <p>
                We are dedicated to connecting readers with their next great
                read. Whether you are looking for the latest bestseller, a
                timeless classic, or a hidden gem, our carefully curated
                selection offers something for every book lover. With a
                user-friendly platform, we make it easy to discover, purchase,
                and enjoy books from the comfort of your home.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p>
                We believe in the transformative power of reading. Our vision is
                to foster a global community of readers who are inspired,
                informed, and empowered through literature. We strive to make
                reading more accessible to everyone, offering a seamless online
                shopping experience and delivering books to your doorstep with
                convenience and care.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 items-center justify-center mb-32">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/avatar.png"
                alt="avatar"
                className="h-32 w-32 rounded-full object-cover object-center"
              />
              <p className="text-lg font-medium">Safaa Samir</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/avatar.png"
                alt="avatar"
                className="h-32 w-32 rounded-full object-cover object-center"
              />
              <p className="text-lg font-medium">Samah Amen</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/avatar.png"
                alt="avatar"
                className="h-32 w-32 rounded-full object-cover object-center"
              />
              <p className="text-lg font-medium">Pinob Hanee</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/avatar.png"
                alt="avatar"
                className="h-32 w-32 rounded-full object-cover object-center"
              />
              <p className="text-lg font-medium">Mohamed Halabia</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/avatar.png"
                alt="avatar"
                className="h-32 w-32 rounded-full object-cover object-center"
              />
              <p className="text-lg font-medium">Ahmed Hosny</p>
            </div>
          </div>

          <div>
            <h2 className="text-center text-4xl font-semibold mb-20">
              Contact Us
            </h2>
            <div className="max-w-md mx-auto">
              <form>
                <div className="mb-6 flex flex-col gap-2">
                  <label>Name</label>
                  <div>
                    <input
                      type="text"
                      className="w-full border border-stone-200 px-4 py-2 text-sm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6 flex flex-col gap-2">
                  <label>Email</label>
                  <div>
                    <input
                      type="text"
                      className="w-full border border-stone-200 px-4 py-2 text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6 flex flex-col gap-2">
                  <label>Subject</label>
                  <div>
                    <input
                      type="text"
                      className="w-full border border-stone-200 px-4 py-2 text-sm"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6 flex flex-col gap-2">
                  <label>Message</label>
                  <div>
                    <textarea
                      type="text"
                      className="h-32 w-full border border-stone-200 px-4 py-2 text-sm"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button className="flex items-center justify-center rounded-md px-4 py-2 border border-yellow-600 bg-yellow-600 text-white transition-all duration-300  hover:bg-white hover:text-yellow-600">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;
