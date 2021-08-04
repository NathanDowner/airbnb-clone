import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Let's build</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <h1>Let's build Airbnb</h1>
    </div>
  );
}
