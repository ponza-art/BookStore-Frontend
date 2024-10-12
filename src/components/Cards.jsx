/* eslint-disable react/prop-types */
import { maskNumbers } from '../utils/helpers';

function Cards({ card }) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center border-b py-4">
      <img
        className="h-full w-full object-cover object-center"
        src="/profile/credit-card.png"
        alt="Wallet"
      />
      <div className="col-span-2">
        <p className="font-poppins font-semibold text-brand-black mb-1">
          {card.cardholderName}
        </p>
        <p className="font-poppins text-brand-black">
          {maskNumbers(card.cardNumber)}
        </p>
      </div>
    </div>
  );
}

export default Cards;
