import { useState, useEffect } from 'react';
import { useLoaderData, useActionData, useNavigation } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import UpdateUserData from '../../components/UpdateUserData';
import Cards from '../../components/Cards';
import AddCreditCard from '../../components/AddCreditCard';
import ReviewedBook from '../../components/ReviewedBook';
import Loader from '../../components/Loader';

function ProfilePage() {
  const { userData, creditCards, userReviews } = useLoaderData();
  console.log(userReviews);
  const actionData = useActionData();

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const [showEdit, setShowEdit] = useState(false);
  const [showAddCreditCard, setShowAddCreditCard] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setShowEdit(false);
      setShowAddCreditCard(false);
    }
  }, [actionData]);

  const renderedCards = creditCards.data.cards.map((card) => {
    return <Cards key={card._id} card={card} />;
  });

  return (
    <main className="font-poppins text-brand-black">
      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-6">
          <h1 className="font-poppins font-semibold text-brand-black text-3xl text-center mb-8 md:mb-2">
            Your Profile
          </h1>
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-0">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center h-32 w-32 rounded-full border-2">
                  <span className="font-poppins font-semibold text-brand-black text-4xl">
                    {userData.data.user.username[0]}
                  </span>
                </div>
                <h1 className="font-poppins font-semibold text-brand-black text-2xl">
                  {userData.data.user.username}
                </h1>
              </div>
            )}

            {showEdit ? (
              <UpdateUserData userData={userData} setShowEdit={setShowEdit} />
            ) : (
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  <div className="flex flex-col justify-center p-4 md:h-80">
                    <div className="flex items-center gap-3 border-b py-2">
                      <p className="font-poppins font-semibold text-brand-black">
                        Name:
                      </p>
                      <p className="font-poppins text-brand-black">
                        {userData.data.user.username}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border-b py-2">
                      <p className="font-poppins font-semibold text-brand-black">
                        Email:
                      </p>
                      <p className="font-poppins text-brand-black">
                        {userData.data.user.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <p className="font-poppins font-semibold text-brand-black">
                        Status:
                      </p>
                      {userData.data.user.status ? (
                        <p className="font-poppins text-green-500">
                          You are allowed to review
                        </p>
                      ) : (
                        <p className="font-poppins text-red-500">
                          You are not allowed to review
                        </p>
                      )}
                    </div>

                    <button
                      className="mt-4 ml-auto text-base text-blue-500 hover:text-blue-600 hover:underline"
                      onClick={() => setShowEdit(true)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-grey-lighter">
        <div className="max-w-screen-lg mx-auto px-6">
          <h2 className="font-poppins font-semibold text-brand-black text-3xl text-center mb-10">
            Your Wallet
          </h2>

          <div className="bg-white max-w-screen-sm mx-auto px-4 rounded border-t border-b">
            {isLoading ? <Loader /> : <div> {renderedCards}</div>}

            {showAddCreditCard ? (
              <AddCreditCard setShowAddCreditCard={setShowAddCreditCard} />
            ) : (
              <div className="grid grid-cols-3 gap-4 items-center border-b py-4">
                <div className="h-full w-full flex items-center justify-center border-2 border-dashed p-6 rounded">
                  <CirclePlus color="gray" />
                </div>
                <div className="col-span-2">
                  <button
                    className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
                    onClick={() => setShowAddCreditCard(true)}
                  >
                    Add a payment method
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-6">
          <h2 className="font-poppins font-semibold text-brand-black text-3xl text-center mb-10">
            Your Reviews
          </h2>

          {userReviews.length === 0 ? (
            <p className="font-poppins text-lg text-gray-500 text-center mb-4">
              You have not reviewed any book yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {userReviews.map((review) => {
                return <ReviewedBook key={review._id} review={review} />;
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
