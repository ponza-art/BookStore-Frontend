import {
  getUserData,
  getUserCreditCards,
  getUserReviews,
} from '../../services/apiProfile';

const token = localStorage.getItem('token');

export async function profileLoader() {
  const userData = await getUserData(token);
  const creditCards = await getUserCreditCards(token);
  const userReviews = await getUserReviews(token);

  return {
    userData,
    creditCards,
    userReviews,
  };
}
