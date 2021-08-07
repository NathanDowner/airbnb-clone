import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InforCard from '../components/InfoCard';
import Map from '../components/Map';

const filters = [
  { label: 'Cancellation Flexibility' },
  { label: 'Types of Places' },
  { label: 'Price' },
  { label: 'Rooms and Beds' },
  { label: 'More Filters' },
];

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');

  function replaceLondon(textConainingLondon) {
    return textConainingLondon.replace('London', location);
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
              <p key={filter.label} className="button">
                {filter.label}
              </p>
            ))}
          </div>

          {/* Search Results */}
          <div className="flex flex-col">
            {searchResults.map((result, idx) => (
              <InforCard
                key={idx}
                index={idx}
                {...result}
                location={replaceLondon(result.location)}
              />
            ))}
          </div>
        </section>

        <section className=" relative hidden xl:block flex-grow xl:min-w-[600px]">
          <div className="sticky top-0 pt-[92px] mt-[-92px] h-[100vh] w-full">
            <Map searchResults={searchResults} />
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
