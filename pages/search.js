import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
import { useState } from 'react';
import {
  CurrencyPoundIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  StarIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid';

const filters = [
  { label: 'Cancellation Flexibility', icon: <ExclamationCircleIcon /> },
  { label: 'Rating', sortKey: 'rating', icon: <StarIcon /> },
  { label: 'Price', sortKey: 'price', icon: <CurrencyPoundIcon /> },
  { label: 'Rooms and Beds', icon: <StarIcon /> },
  { label: 'More Filters', icon: <InformationCircleIcon /> },
];

const sortState = {
  Off: 0,
  Ascending: 1,
  Descending: 2,
};

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sorts, setSorts] = useState({
    rating: sortState.Off,
    price: sortState.Off,
  });

  function handleSort(sortKey) {
    console.log(sortKey);
    setSorts((prev) => ({ ...prev, [sortKey]: (prev[sortKey] + 1) % 3 }));
  }

  function replaceLondon(textConainingLondon) {
    return textConainingLondon.replace('London', location);
  }

  function handleCardSelection(selection) {
    setSelectedLocation(selection);
  }

  return (
    <div>
      <Head>
        <title>Airbnb Clone | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        dynamic={false}
        placeholder={`${location} | ${formattedStartDate} - ${formattedEndDate} | ${numGuests} guest${
          numGuests > 1 ? 's' : ''
        }`}
      />

      <main className="flex flex-col-reverse xl:flex-row">
        <section className="flex-grow pt-14 px-6 max-w-5xl">
          <p className="text-xs">
            <span className="text-red-400">{searchResults.length}</span> stays -{' '}
            <span className="inline-block p-1 rounded-lg bg-red-400 text-white cursor-pointer">
              {formattedStartDate}
            </span>{' '}
            -{' '}
            <span className="inline-block p-1 rounded-lg bg-red-400 text-white cursor-pointer">
              {formattedEndDate}
            </span>{' '}
            for <span className="text-red-400">{numGuests}</span> guest
            {numGuests > 1 ? 's' : ''}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:flex space-x-3 whitespace-nowrap pb-6">
            {filters.map((filter) => (
              <div
                onClick={() => handleSort(filter.sortKey)}
                className="button flex"
              >
                <span className="h-6 w-6 text-red-400">{filter.icon}</span>
                <p className="mx-1" key={filter.label}>
                  {filter.label}
                </p>
                {/* {sorts[filter.sortKey] !== sortState.Off && (
                  <span className="h-6 w-6 text-red-400">
                    {sorts[filter.sortKey] === sortState.Ascending ? (
                      <SortAscendingIcon />
                    ) : (
                      <SortDescendingIcon />
                    )}
                  </span>
                )} */}
              </div>
            ))}
          </div>

          {/* Search Results */}
          <div className="flex flex-col">
            {searchResults.map((result, idx) => (
              <InfoCard
                key={idx}
                index={idx}
                isSelected={selectedLocation?.title === result.title}
                result={{ ...result, location: replaceLondon(result.location) }}
                onClick={handleCardSelection}
              />
            ))}
          </div>
        </section>

        <section className=" relative hidden xl:block flex-grow xl:min-w-[600px]">
          <div className="sticky top-0 pt-[92px] mt-[-92px] h-[100vh] w-full">
            <Map
              searchResults={searchResults}
              selectedLocation={selectedLocation}
              onSelectLocation={handleCardSelection}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch(`https://links.papareact.com/isz`).then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
