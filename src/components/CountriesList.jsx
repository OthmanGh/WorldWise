import React from 'react';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import styles from './CountriesList.module.css';
import { useCities } from '../contexts/CitiesContext';

const CountriesList = () => {
  const { isLoading, cities } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.some((el) => el.country === city.country)) {
      arr.push({
        country: city.country,
        emoji: city.emoji,
      });
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountriesList;
