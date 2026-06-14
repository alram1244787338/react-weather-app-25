import React from 'react';
import CurrentWeatherDisplay from '../components/CurrentWeather/CurrentWeatherDisplay';
import Footer from '../components/Footer/Footer';
import ForecastDisplay from '../components/Forecast/ForecastDisplay';
import Header from '../components/Header/Header';
import SearchPanel from '../components/Search/SearchPanel';
import Spinner from '../components/ui/Spinner/Spinner';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';
import { useWeatherData } from '../hooks/useWeatherData';

const Home = () => {
  const { weatherData, forecastData, tempUnit, isLoading, isInitial, fetchWeather, changeTempUnit } =
    useWeatherData();
  const search = useSearchSuggestions();

  return (
    <>
      {isLoading && <Spinner />}
      <Header />
      <SearchPanel search={search} onQuery={fetchWeather} />
      {!isInitial && (
        <CurrentWeatherDisplay
          weather={weatherData}
          tempUnit={tempUnit}
          onChangeTempUnit={changeTempUnit}
        />
      )}
      {!isInitial && <ForecastDisplay forecast={forecastData} tempUnit={tempUnit} />}
      <Footer />
    </>
  );
};

export default Home;
