import { getUserCart } from '../../services/apiCart';

export async function cartLoader() {
  const userCart = await getUserCart();

  return {
    userCart,
  };
}

export default cartLoader;
