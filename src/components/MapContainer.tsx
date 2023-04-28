/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { DirectionsResult, LatLngLiteral, libraries, MapOptions } from '@/lib';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = {
  lat: 58.3902782,
  lng: 13.8461208,
};

type Props = {
  control: Control<FieldValues>;
  rules?: RegisterOptions;
  name: string;
  markers?: google.maps.LatLngLiteral[];
};

export const MapContainer = ({ rules, control, name, markers }: Props) => {
  const mapRef = useRef<GoogleMap>();
  const [marker, setMarker] = useState<LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<DirectionsResult>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    [libraries]: libraries,
  });

  const options = useMemo<MapOptions>(
    () => ({
      // mapId: 'b181cac70f27f5e6',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
    console.log('unmount');
  }, []);
  if (isLoaded === false) {
    return <div>Map not loading</div>;
  }

  const fetchDirections = () => {
    if (!mapRef && !markers) {
      return;
    }
    if (markers && marker) {
      console.log(markers);
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: markers?.[0],
          waypoints: markers.map((point) => ({
            location: new google.maps.LatLng(point.lat, point.lng),
          })),
          destination: marker,
          travelMode: google.maps.TravelMode.WALKING,
        },
        (response, status) => {
          if (status === 'OK' && response) {
            setDirections(response);
          }
        }
      );
    }
  };

  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { onChange, ref } }) => (
        <GoogleMap
          ref={ref}
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={center}
          options={options}
          onLoad={onLoad}
          onClick={(e: google.maps.MapMouseEvent) => {
            if (e.latLng != null) {
              onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              fetchDirections();
            }
          }}
          onUnmount={onUnmount}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#1976D2',
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {/* {markers &&
            markers.map((marker, i) => (
              <MarkerF
                position={marker}
                key={i}
                label={(i + 1).toString()}
                draggable
              />
            ))} */}

          {/* {marker && <MarkerF position={marker} />} */}
        </GoogleMap>
      )}
    />
  );
};
