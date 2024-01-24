import React, { useState, useEffect } from 'react';
import './css/style.css';

export default function Tempapp() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=db61ac8fd361e35e46c046094ea71891`;
        const response = await fetch(api);
        if (response.ok) {
          const resJson = await response.json();
          setCity(resJson); // Update the city (temperature) data
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchWeatherData();
  }, [search]);

  return (
    <>
      <div className="box">
        <h1>Welcome to the weather app</h1>
        <div className="searchbar">
          <input
            className="inputfield"
            type="search"
            placeholder="Enter place"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {!city ? (
          <p>Nothing to display</p>
        ) : (
          <div className="info">
            <i className="fa-sharp fa-solid fa-street-view"></i>
            <h2 className='location'>{search}</h2>
            <p className='Temprature'>{city.main.temp}°C</p>
            <span className='windInfo'>
            <p className='weather-des'>Wind Speed: {city.wind.speed} m/s </p>
            <p>Wind Direction: {city.wind.deg}</p> 
            </span>
            
          </div>
        )}
      </div>
    </>
  );
}
