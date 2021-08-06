import Image from 'next/image';

const Banner = () => {
  return (
    <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
      <Image
        src="https://a0.muscache.com/im/pictures/e4a2a61c-589f-4e49-b3b8-968a6bc23389.jpg?im_w=1920"
        layout="fill"
        objectFit="cover"
        className="object-left xs:object-left-center md:object-center"
      />
      <div className="absolute top-1/3 left-5 md:left-10 lg:left-40">
        <p className="text-5xl xl:text-6xl font-bold  text-white">
          Olympian & <br /> Paralympian <br /> Online <br /> Experiences
        </p>
        <button className="text-black bg-white px-6 py-2 rounded-xl shadow-md mt-6 font-bold hover:shadow-xl active:scale-90 transition">
          Explore now
        </button>
      </div>
    </div>
  );
};

export default Banner;
