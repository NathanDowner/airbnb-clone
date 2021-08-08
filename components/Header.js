import Image from 'next/image';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';
import AuthMenu from './AuthMenu';

const Header = ({ transparent, dynamic, placeholder }) => {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numGuests, setNumGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };

  function handleSelectRange(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const resetInput = () => setSearchInput('');

  function handleSearch() {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numGuests,
      },
    });
  }

  return (
    <header
      className={`${
        dynamic ? 'fixed' : 'sticky'
      } top-0 z-50 grid grid-cols-3 p-5 md:px-10 lg:px-40 w-full transition duration-200 ${
        dynamic
          ? transparent
            ? ''
            : 'bg-white shadow-md'
          : 'shadow-md bg-white'
      }`}
    >
      {/* Left */}
      <div
        onClick={() => router.replace('/')}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle */}
      <div className="flex items-center">
        <SearchIcon className="sm:hidden h-6 mr-4 text-white cursor-pointer ml-auto inline-block bg-red-400 flex-shrink-0 p-1 rounded-full" />
        <div className="hidden flex-grow flex-shrink sm:flex items-center border-2 md:shadow-sm rounded-full py-2 bg-white">
          <input
            input={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-5 bg-transparent outline-none flex-grow text-xs sm:text-lg md:pr-0"
            type="text"
            placeholder={placeholder ?? 'Start your search'}
          />
          <SearchIcon className="hidden md:inline-flex md:mx-2 h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
        </div>
      </div>

      {/* Right */}
      <div
        className={`flex space-x-4 items-center justify-end ${
          transparent ? 'text-white' : 'text-gray-500'
        }`}
      >
        <p className="hidden md:inline cursor-pointer ml-2 nav-item-hover ">
          Become a host
        </p>
        <GlobeAltIcon className="h-6 cursor-pointer flex-shrink-0" />
        <AuthMenu />
      </div>
      {Boolean(searchInput) && (
        <div className="flex flex-col col-span-3 mx-auto mt-2 bg-white rounded-lg pt-2">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelectRange}
          />
          <div className="flex items-center border-b mb-2">
            <h2 className="text-2xl font-semibold flex-grow pl-2">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
              value={numGuests}
              min={1}
              onChange={(e) => setNumGuests(e.target.value)}
            />
          </div>
          <div className="flex mb-2">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={handleSearch} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  transparent: PropTypes.bool,
  dynamic: PropTypes.bool,
  placeholder: PropTypes.string,
};

Header.defaultProps = {
  dynamic: false,
};

export default Header;
