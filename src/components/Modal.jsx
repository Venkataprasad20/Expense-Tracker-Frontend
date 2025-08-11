import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4'>
      <div className='relative w-full max-w-2xl bg-white text-black rounded-lg shadow-lg'>

        {/* Modal Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <h3 className='text-lg font-semibold'>
            {title}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className='p-4'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

