 import React from 'react'
import Weather from './components/Weather'

 
  
 const index = () => {
  const handleSearch = (value: string) => {
    console.log('Searching for:', value);

  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mt-5">Weather App</h1>
      
      <Weather/>
    </div>
  );
 }
 
 export default index
 