import { HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';

const InforCard = ({ index, result, onClick, isSelected }) => {
  const { img, location, title, description, star, price, total } = result;

  function handleClick() {
    onClick(result);
  }

  return (
    <div
      onClick={handleClick}
      className={`flex py-7 px-2 mb-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition ease-out rounded-2xl first:border-t animate-dropIn ${
        isSelected ? 'bg-red-100 animate-breathe' : ''
      }`}
      style={{ '--order': index, animationDelay: 'calc(var(--order) * 100ms)' }}
    >
      <div className="relative h-52 w-40 md:w-80 flex-shrink-0">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="">{location}</p>
          <HeartIcon className="h-7 cursor-pointer hover:animate-wiggle hover:text-red-400 transition duration-200" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>

          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforCard;
