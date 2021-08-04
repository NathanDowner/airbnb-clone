import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData }) {
  return (
    <div className="">
      <Head>
        <title>Let's build</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section>
          <h2 className="text-4xl font-semibold pb-5 pt-6">Explore Nearby</h2>

          {/* Pull data from a server - API endpoints */}
          {/* '?' is called optional chcaining incaase the data is not avaialable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, distance, location }, idx) => (
              <SmallCard
                key={idx}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData,
    },
  };
}
