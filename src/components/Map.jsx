import React from 'react';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      <h1>Map</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>

      <button
        onClick={() => {
          setSearchParams({
            lat: 20,
            lng: 50,
          });
        }}
      >
        Change pos
      </button>
    </div>
  );
};

export default Map;
