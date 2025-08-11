import React from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullName = "", width = "w-12", height = "h-12", style = "" }) => {
  return (
    <div
      className={`
        ${width} ${height} ${style} 
        flex items-center justify-center 
        rounded-full font-semibold 
        text-white bg-gray-500
      `}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;




