import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';

import ReactMapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

const mapStyleUrl = 'mapbox://styles/nathandowner/cks0u66ro2sea17pdpony3oy7';

const Map = ({ searchResults, selectedLocation, onSelectLocation }) => {
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const coords = searchResults.map(({ lat, long }) => ({
    latitude: lat,
    longitude: long,
  }));
  const center = getCenter(coords);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 12,
  });

  useEffect(() => {
    if (selectedLocation) {
      setViewport((prev) => ({
        ...prev,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.long,
      }));
    }
  }, [selectedLocation]);

  function handleSelection(selection) {
    onSelectLocation(selection);
  }

  return (
    <ReactMapGL
      mapStyle={mapStyleUrl}
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(viewport) => setViewport(viewport)}
      {...viewport}
      transitionDuration={1000}
      transitionInterpolator={new FlyToInterpolator()}
      className="map-popup"
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat} offsetTop={-20}>
            <p
              onClick={() => handleSelection(result)}
              className="cursor-pointer text-2xl"
              aria-label="push-pin"
              role="img"
            >
              🏠
            </p>
          </Marker>
          {/* Pop up for clicking on marker */}
          {Boolean(selectedLocation) &&
          selectedLocation.long === result.long ? (
            <Popup
              onClose={() => handleSelection(null)}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
              anchor="top"
              className="map-popup"
            >
              <div className="z-40  flex flex-col relative top-4 rounded-2xl bg-white max-w-[300px]">
                <div className="relative flex-grow h-28 ">
                  <Image
                    src={selectedLocation.img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                  />
                </div>
                <div className="p-2">
                  <h1>{selectedLocation.title}</h1>
                  <div className="border-b w-10 pt-2" p-0 />
                  <p className="text-sm text-gray-500">
                    {selectedLocation.description}
                  </p>
                  <div className="flex justify-between">
                    <p className="flex items-center">
                      <StarIcon className="h-5 text-red-400" />
                      {selectedLocation.star}
                    </p>
                    <div className="text-lg font-semibold">
                      {selectedLocation.price}
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
