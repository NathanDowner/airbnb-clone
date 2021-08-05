import Image from 'next/image';
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';

const Header = ({ transparent }) => {
  // const containerStyle = transparent ? 'fixed top-0 z-50 grid grid-cols-3 p-5 md:px-20 lg:px-40 w-full' :
  return (
    <header
      className={`fixed top-0 z-50 grid grid-cols-3 p-5 md:px-20 lg:px-40 w-full transition duration-200 ${
        transparent ? '' : 'bg-white shadow-md'
      }`}
    >
      {/* Left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle */}
      <div className="flex items-center md:border-2 md:shadow-sm rounded-full py-2 bg-white">
        <input
          className="pl-5 bg-transparent outline-none flex-grow"
          type="text"
          placeholder="Start your search"
        />
        <SearchIcon className="hidden md:inline-flex md:mx-2 h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
      </div>

      {/* Right */}
      <div
        className={`flex space-x-4 items-center justify-end ${
          transparent ? 'text-white' : 'text-gray-500'
        }`}
      >
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer bg-white text-gray-500 transition duration-200">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
