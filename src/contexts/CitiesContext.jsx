import { createContext, useContext, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case 'city/create':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unkown option');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({
          type: 'loading',
        });

        const res = await fetch(`${BASE_URL}/cities`);

        const data = await res.json();

        dispatch({
          type: 'cities/loaded',
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error Loading data...',
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    try {
      dispatch({
        type: 'loading',
      });

      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await res.json();

      dispatch({
        type: 'city/loaded',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error Loading data...',
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({
        type: 'loading',
      });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/josn',
        },
      });
      const data = await res.json();

      dispatch({
        type: 'city/create',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error Creating City...',
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({
        type: 'loading',
      });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({
        type: 'cities/deleted',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error Deleting City...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const values = useContext(CitiesContext);
  return values;
}

export { CitiesProvider, useCities };
