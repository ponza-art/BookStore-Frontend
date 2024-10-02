import axios from 'axios';

export async function getUserCart() {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.get(
      'https://book-store-backend-sigma-one.vercel.app/cart',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    throw Error('Failed getting cart item', error);
  }
}

export async function deleteCartItem(id) {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.delete(
      `https://book-store-backend-sigma-one.vercel.app/cart/remove-item/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          bookId: id,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log('Error deleting item', error);
  }
}
