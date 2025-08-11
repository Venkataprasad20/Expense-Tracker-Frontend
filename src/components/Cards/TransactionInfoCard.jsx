// import React from 'react';
// import {
//   LuUtensils,
//   LuTrendingUp,
//   LuTrendingDown,
//   LuTrash2,
// } from "react-icons/lu";

// const TransactionInfoCard = ({
//   title,
//   icon,
//   date,
//   amount,
//   type,
//   hideDeleteBtn,
//   onDelete,
// }) => {
//   const getAmountStyles = () =>
//     type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

//   return (
//     <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
//       <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
//         {typeof icon === 'string' && icon.startsWith('http') ? (
//           <img src={icon} alt="icon" className="w-6 h-6 object-contain" />
//         ) : typeof icon === 'string' ? (
//           <span>{icon}</span>
//         ) : (
//           icon || <LuUtensils />
//         )}
//       </div>

//       <div className='flex-1 flex items-center justify-between'>
//         <div>
//           <p className='text-sm text-gray-700 font-medium'>{title}</p>
//           <p className='text-xs text-gray-400 mt-1'>{date}</p>
//         </div>

//         <div className='flex items-center gap-2'>
//           {!hideDeleteBtn && (
//             <button
//               className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
//               onClick={onDelete}
//             >
//               <LuTrash2 size={18} />
//             </button>
//           )}

//           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
//             <h6 className='text-xs font-medium'>
//               {type === "income" ? "+" : "-"} ₹{amount}
//             </h6>
//             {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TransactionInfoCard;


// components/Cards/TransactionInfoCard.jsx
import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuWallet,
} from "react-icons/lu";

/**
 * Add any icon names your backend might send to this map.
 * Example: backend sends icon: "LuWallet" -> it will render LuWallet component.
 */
const iconMap = {
  LuUtensils: <LuUtensils className="text-xl" />,
  LuTrendingUp: <LuTrendingUp className="text-xl" />,
  LuTrendingDown: <LuTrendingDown className="text-xl" />,
  LuWallet: <LuWallet className="text-xl" />,
};

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type = "income",
  hideDeleteBtn = false,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount ?? 0);

  const renderIcon = () => {
    // If parent passed an actual React element (e.g. <LuTrendingUp />)
    if (React.isValidElement(icon)) return icon;

    // If it's a string
    if (typeof icon === "string") {
      // image URL
      if (icon.startsWith("http") || icon.startsWith("data:")) {
        return <img src={icon} alt="icon" className="w-6 h-6 object-contain" />;
      }

      // mapped React icon by name
      if (iconMap[icon]) {
        return iconMap[icon];
      }

      // short string or emoji (e.g. "💰" or "$")
      if (icon.length <= 4) {
        return <span className="text-xl">{icon}</span>;
      }

      // fallback: show the raw text (useful if backend sends a label)
      return <span className="text-sm">{icon}</span>;
    }

    // fallback icon component
    return <LuUtensils className="text-xl" />;
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {renderIcon()}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title ?? "Untitled"}</p>
          <p className="text-xs text-gray-400 mt-1">{date ?? "No date"}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              aria-label="Delete transaction"
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} {formattedAmount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
