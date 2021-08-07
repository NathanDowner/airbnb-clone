import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

const mapStyleUrl = 'mapbox://styles/nathandowner/cks0u66ro2sea17pdpony3oy7';

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const coords = searchResults.map(({ lat, long }) => ({
    latitude: lat,
    longitude: long,
  }));
  const center = getCenter(coords);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longidude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle={mapStyleUrl}
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(viewport) => setViewport(viewport)}
      {...viewport}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat} offsetTop={-20}>
            <p
              onMouseEnter={() => setSelectedLocation(result)}
              onMouseLeave={() => {
                () => setSelectedLocation(null);
              }}
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl"
              aria-label="push-pin"
              role="img"
            >
              📌
            </p>
          </Marker>
          {/* Pop up for clicking on marker */}
          {selectedLocation && selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation(null)}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
