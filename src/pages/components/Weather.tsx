import React, { useEffect, useRef, useState } from 'react';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

 
interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  city: string;
  weatherCondition: string;  
}

const Weather: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null); 
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null); 

  const search = async (city: string) => {
    try {
        const NEXT_PUBLIC_API_KEY= "705ffe5518661feab74c37e01c09d2b3"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${NEXT_PUBLIC_API_KEY}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        city: data.name,
        weatherCondition: data.weather[0].main, 
      });
      setError(null);  
    } catch (error: any) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setError(error.message);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Clear':
        return clear_icon;
      case 'Clouds':
        return cloud_icon;
      case 'Drizzle':
        return drizzle_icon;
      case 'Rain':
        return rain_icon;
      case 'Snow':
        return snow_icon;
      default:
        return wind_icon; 
    }
  };

  return (
    <div className="self-center p-10 rounded-lg bg-gradient-to-br from-[#2f4680] to-[#500ae4] flex flex-col items-center">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          className="h-12 border-0 outline-none rounded-full pl-6 text-gray-600 bg-[#ebfffc]"
          placeholder="Search"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
          onClick={() => {
            if (inputRef.current) {
              search(inputRef.current.value);
            }
          }}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}  
      {weatherData ? (
        <>
          
          <p className="text-white text-[80px] leading-[1]">{Math.round(weatherData.temperature)}°C</p>
          <p className="text-white text-[40px]">{weatherData.city}</p>
          <div>
            <p className="text-white">{weatherData.humidity}%</p>
            <span className="text-white">Humidity</span>
          </div>
          <div>
            <p className="text-white">{weatherData.windSpeed} m/s</p>
            <span className="text-white">Wind Speed</span>
          </div>
        </>
      ) : (
        !error && <p className="text-white">Loading...</p>  
      )}
    </div>
  );
};
export default Weather
