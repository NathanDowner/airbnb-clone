import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData, cardsData }) {
  const mainRef = useRef(null);
  const [makeTransparent, setMakeTransparent] = useState(false);

  function callback(entries) {
    const [entry] = entries;
    setMakeTransparent(!entry.isIntersecting);
  }

  useEffect(() => {
    console.log(mainRef.current);
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    });
    if (mainRef.current) {
      observer.observe(mainRef.current);
    }
    return () => {
      if (mainRef.current) observer.unobserve(mainRef.current);
    };
  }, [mainRef]);
  return (
    <div className="">
      <Head>
        <title>Let's build</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header transparent={makeTransparent} />
      <Banner />

      <main ref={mainRef} className="max-w-7xl mx-auto px-8 sm:px-16">
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

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-x-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }, idx) => (
              <MediumCard key={idx} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );

  const cardsData = await fetch('https://links.papareact.com/zp1').then(
    (resp) => resp.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
