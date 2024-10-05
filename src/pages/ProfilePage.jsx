import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserRound, Mail, Circle } from 'lucide-react';
import EditUserInfo from '../components/EditUserInfo';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  console.log(userInfo);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          'https://book-store-backend-sigma-one.vercel.app/users/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);

        setUserInfo(res.data.data.user);
      } catch (error) {
        console.log('There is an error loading data...', error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserInfo();
  }, []);

  if (showEdit) {
    return (
      <EditUserInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setShowEdit={setShowEdit}
      />
    );
  }

  return (
    <main>
      <div className=" max-w-screen-sm mx-auto">
        <section className="py-16 px-4">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <img src="/loader.gif" alt="Loading..." className="h-32 w-32" />
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center h-32 w-32 rounded-full border-2">
                  <span className="text-4xl font-semibold">
                    {userInfo.username && userInfo.username[0]}
                  </span>
                </div>
                <h1 className="text-3xl font-semibold">{userInfo?.username}</h1>
              </div>

              <div className="mt-8 flex flex-col">
                <div className="flex items-center gap-6 border-b py-4">
                  <UserRound color="gray" size={24} />
                  <span className="text-lg">{userInfo?.username}</span>
                </div>
                <div className="flex items-center gap-6 border-b py-4">
                  <Mail color="gray" size={24} />
                  <span className="text-lg">{userInfo?.email}</span>
                </div>
                <div className="flex items-center gap-6 border-b py-4">
                  <Circle
                    color={userInfo?.status ? 'green' : 'red'}
                    fill={userInfo?.status ? 'green' : 'red'}
                    size={24}
                  />
                  <span className="text-lg">
                    {userInfo?.status
                      ? 'You are allowed to review'
                      : 'You are not allowed to review'}
                  </span>
                </div>
              </div>

              <button
                className="ml-auto mt-8 flex items-center justify-center rounded-md px-4 py-2 border border-yellow-600 bg-yellow-600 text-white transition-all duration-300  hover:bg-white hover:text-yellow-600"
                onClick={() => setShowEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
