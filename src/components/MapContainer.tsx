import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useMemo, useRef } from 'react';

import { MapOptions } from '@/lib';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = {
  lat: 37.774546,
  lng: -122.433523,
};

export const MapContainer = () => {
  const mapRef = useRef<GoogleMap>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });
  const options = useMemo<MapOptions>(
    () => ({
      // mapId: 'b181cac70f27f5e6',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  if (isLoaded === false) {
    return <div>Map not loading</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
      options={options}
      onLoad={onLoad}
    >
      {/* <HeatmapLayer data={data} /> */}
    </GoogleMap>
  );
};
