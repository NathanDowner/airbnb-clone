import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InforCard from '../components/InfoCard';

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
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        dynamic={false}
        placeholder={`${location} | ${range} | ${numGuests} guest${
          numGuests > 1 ? 's' : ''
        }`}
      />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numGuests} guest
            {numGuests > 1 ? 's' : ''}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:flex space-x-3 whitespace-nowrap">
            {filters.map((filter) => (
              <p key={filter} className="button">
                {filter.label}
              </p>
            ))}
          </div>

          {/* Search Results */}
          <div className="flex flex-col">
            {searchResults.map((result, idx) => (
              <InforCard key={idx} {...result} />
            ))}
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
