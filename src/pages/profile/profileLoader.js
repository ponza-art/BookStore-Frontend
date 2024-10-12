import { getUserData, getUserCreditCards } from '../../services/apiProfile';

const token = localStorage.getItem('token');

export async function profileLoader() {
  const userData = await getUserData(token);
  const creditCards = await getUserCreditCards(token);

  return {
    userData,
    creditCards,
  };
}
