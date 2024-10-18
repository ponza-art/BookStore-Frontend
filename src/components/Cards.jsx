/* eslint-disable react/prop-types */
import { maskNumbers } from '../utils/helpers';
import { FaTrash } from 'react-icons/fa';

function Cards({ card, onDelete }) {
  return (
    <div className="container mx-auto p-4 border-b bg-white shadow-md rounded-lg">
      
      <div className="flex justify-end">
        <button
          className="text-blue-950 hover:text-red-700 transition"
          onClick={() => onDelete(card._id)}
        >
         <FaTrash size={20} />
        </button>
      </div>

   
      <div className="flex flex-col items-center py-4  ">
        
        
        <img
          className=" object-cover mb-4 h-full w-36 object-center "
          src="/profile/credit-card.png"
          alt="Wallet"
        />

 
        <div className="text-center">
          <p className="font-poppins font-semibold text-brand-black mb-1">
            {card.cardholderName}
          </p>
          <p className="font-poppins text-brand-black">
            {maskNumbers(card.cardNumber)}
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Cards;
