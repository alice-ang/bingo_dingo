/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import {
  DirectionsResult,
  LatLngLiteral,
  libraries,
  MapOptions,
  Point,
} from '@/lib';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = {
  lat: 37.774546,
  lng: -122.433523,
};

type Props = {
  control: Control<FieldValues>;
  rules?: RegisterOptions;
  name: string;
  markers?: google.maps.DirectionsWaypoint[];
  onMapChange?: (point: Point) => void;
};

export const MapContainer = ({
  rules,
  onMapChange,
  control,
  name,
  markers,
}: Props) => {
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
  const onUnmount = useCallback(() => (mapRef.current = undefined), []);
  if (isLoaded === false) {
    return <div>Map not loading</div>;
  }

  const fetchDirections = (newMark: LatLngLiteral) => {
    if (!mapRef && !markers) {
      return;
    }
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: markers?.[0].location ?? marker ?? newMark,
        waypoints: markers,
        destination: newMark,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          setDirections(response);
        }
      }
    );
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
          zoom={14}
          center={center}
          options={options}
          onLoad={onLoad}
          onClick={(e: google.maps.MapMouseEvent) => {
            if (e.latLng != null) {
              if (onMapChange) {
                onMapChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              }
              onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });

              fetchDirections({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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
          {markers != undefined &&
            markers.length > 0 &&
            markers.map((marker, i) => (
              <MarkerF position={marker.location as LatLngLiteral} key={i} />
            ))}
          {marker && <MarkerF position={marker} />}
        </GoogleMap>
      )}
    />
  );
};
