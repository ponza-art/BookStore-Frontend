/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');
const nameRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9_ ]{3,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function EditUserInfo({ userInfo, setUserInfo, setShowEdit }) {
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const data = {
    username,
    email,
  };

  const editUserInfo = async () => {
    let isValidUsername = false;
    let isValidEmail = false;

    if (!nameRegex.test(data.username)) {
      setUsernameErrorMsg('Please provide a valid name.');
    } else {
      setUsernameErrorMsg('');
      isValidUsername = true;
    }

    if (!emailRegex.test(data.email)) {
      setEmailErrorMsg('Please enter a valid email.');
    } else {
      setEmailErrorMsg('');
      isValidEmail = true;
    }

    if (!isValidUsername || !isValidEmail) {
      return;
    } else {
      try {
        setIsLoading(true);
        const res = await axios.patch(
          'https://book-store-backend-sigma-one.vercel.app/users/profile',
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);

        setUserInfo(res.data.data.user);

        toast.success('Updated successfully');
      } catch (error) {
        console.log('There is an error Updating data...', error);

        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
        setShowEdit(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editUserInfo();
  };

  return (
    <main>
      <div className="max-w-screen-sm mx-auto">
        <section className="py-16 px-4">
          <h1 className="mb-8 text-center font-semibold text-2xl">
            Edit your information
          </h1>

          <form className="" onSubmit={handleSubmit}>
            <div className="mb-6 flex flex-col gap-2">
              <label>Username</label>
              <div>
                <input
                  type="text"
                  className="w-full border border-stone-200 px-4 py-2 text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <p className="text-sm text-red-500">{usernameErrorMsg}</p>
            </div>
            <div className="mb-6 flex flex-col gap-2">
              <label>Email</label>
              <div>
                <input
                  // type="email"
                  className="w-full border border-stone-200 px-4 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p className="text-sm text-red-500">{emailErrorMsg}</p>
            </div>

            <div className="flex items-center justify-end gap-4 mt-12">
              <button
                className="flex items-center justify-center rounded-md px-4 py-2 border border-slate-600 bg-slate-600 text-white transition-all duration-300  hover:bg-white hover:text-slate-800"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
              <button
                className="flex items-center justify-center rounded-md px-4 py-2 border border-yellow-600 bg-yellow-600 text-white transition-all duration-300  hover:bg-white hover:text-yellow-600"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default EditUserInfo;
