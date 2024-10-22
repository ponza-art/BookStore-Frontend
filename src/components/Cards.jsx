/* eslint-disable react/prop-types */
import { maskNumbers } from '../utils/helpers';
import { FaTrash } from 'react-icons/fa';

function Cards({ card, onDelete }) {
  return (
    <div className="container mx-auto p-4 border-b bg-white  rounded-lg">
      
      {/* <div className="flex justify-end">
        <button
          className="text-blue-950 hover:text-red-700 transition"
          onClick={() => onDelete(card._id)}
        >
         <FaTrash size={20} />
        </button>
      </div> */}

      <div className="relative flex flex-col items-center py-4">
        
        <img
          className="object-cover h-auto w-96 rounded-lg"
          src="/profile/credit-card.png"
          alt="Credit Card"
        />


             {/* <div className="flex justify-end"> */}
            
        <button
          className="text-white hover:text-red-700 transition absolute top-5 right-2"
          onClick={() => onDelete(card._id)}
        >
         <FaTrash size={15} />
        </button>
      {/* </div> */}  
        <p className="absolute bottom-8 left-8 text-white text-xl font-semibold">
          {card.cardholderName}
        </p>

        <p className="absolute bottom-20 left-8 text-white text-lg font-mono tracking-widest">
          {maskNumbers(card.cardNumber)}
        </p>
        
        <p className="absolute bottom-14 items-center text-white text-sm font-semibold">
        {card.expiryDate}
        </p>

      </div>
      
    </div>
  );
}

export default Cards;

