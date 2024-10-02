import { deleteCartItem } from '../../services/apiCart';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const { bookId } = data;
  console.log(bookId);

  await deleteCartItem(bookId);

  return null;
}
