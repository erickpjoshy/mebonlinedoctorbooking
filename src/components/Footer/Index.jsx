import React from 'react';

const Footer = () => {
  return (
    <div className="bg-primary h-[100px]">
      <div className="container mx-auto relative">
        <div className="flex items-center pt-4">
          <i className="fa-solid fa-stethoscope text-white text-2xl mr-1"></i>
          <h1 className="text-white my-0">MeB Doctor</h1>
        </div>
        <p className="text-white text-xs ml-1">Online Doctor Booking Website</p>
        <div className="absolute right-2 bottom-1 text-xs sm:text-sm text-gray-600">
          Designed By Erick Jzz
        </div>
      </div>
    </div>
  );
};

export default Footer;
