"use client"
import Image from "next/image";
import { useEffect, useState } from 'react';
import { data } from './type/type';
export default function Home() {
  

  const [data, setData] = useState<data>();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
  const [lastFetchedDate, setLastFetchedDate] = useState(
    new Date().toDateString()
  );
  // const [weatherData, setWeatherData] = useState(null);


    const fetchData = async () => {
      try {
        const response = await fetch('/api/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
        setLastFetchedDate(new Date().toDateString());
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      // Check if a new day has started
      if (new Date().toDateString() !== lastFetchedDate) {
        fetchData();
      }
    }, 1000); 
    return () => clearInterval(intervalId);
  }, [lastFetchedDate]);
  console.log(data);

  return (
    <main className="font-[family-name:var(--font-geist-sans)] min-h-screen p-3 sm:p-6 bg-gray-950">
      <div className="h-screen flex flex-col text-white gap-4">
        {/* Info Board Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-1">
          {/* Weather Card */}
          <div className="bg-gray-900/80 rounded-lg shadow-lg p-3 sm:p-4 border border-gray-800">
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] text-center font-semibold mb-2 sm:mb-4">Weather</h2>
            {data ? (
              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[clamp(2rem,5vw,4rem)] font-bold">
                      {data.weather.current.temp_f}°F
                    </div>
                    <div className="text-[clamp(0.875rem,1.5vw,1.25rem)] text-gray-400 flex gap-2">
                      Feels like <p className='font-bold text-white'>{data.weather.current.feelslike_f}°F</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[clamp(1rem,1.5vw,1.5rem)] text-gray-400">
                      {currentTime}
                    </p>
                    <p className="text-[clamp(0.875rem,1.2vw,1.25rem)] text-gray-400">
                      {data.weather.location.name}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-[clamp(0.875rem,1.5vw,1.25rem)]">
                  <div>
                    <span className="text-gray-400">Highs: </span>
                    <span>{data.weather.forecast.forecastday[0].day.maxtemp_f}°F</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Lows: </span>
                    <span>{data.weather.forecast.forecastday[0].day.mintemp_f}°F</span>
                  </div>
                </div>
                <div className="text-[clamp(0.875rem,1.5vw,1.25rem)] text-gray-400">
                  {data.weather.current.condition.text}
                </div>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-700 rounded w-24"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
              </div>
            )}
          </div>

          {/* Quote Card */}
          <div className="bg-gray-900/80 rounded-lg shadow-lg p-3 sm:p-4 border border-gray-800">
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] text-center font-semibold mb-2 sm:mb-4">Verse of the Day</h2>
            {data ? (
              <div className="h-[calc(100%-3rem)] flex items-center justify-center">
                <p className="text-center text-[clamp(0.875rem,1.5vw,1.7rem)] text-pretty italic">
                  &#34; {data.quote} &#34;
                </p>
              </div>
            ) : (
              <div className="animate-pulse h-16 bg-gray-700 rounded w-full"></div>
            )}
          </div>

          {/* Photo Card */}
          <div className="bg-gray-900/80 rounded-lg shadow-lg p-3 sm:p-4 border border-gray-800">
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] text-center font-semibold mb-2 sm:mb-4">Photo of the Day</h2>
            <div className="flex items-center justify-center h-[29rem]">
              <div className="relative w-full h-full min-h-[200px] overflow-hidden rounded-lg">
                <Image 
                  src="https://drive.usercontent.google.com/download?id=1FsIoegD4Gt4NHSK0NM3ufkwyFO41K9Rx&export=view&authuser=0"
                  alt="Photo of the Day"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Schedule Section */}
        <div className="bg-gray-900/80 rounded-lg shadow-lg p-4 sm:p-6 border border-gray-800 flex-1">
          <h2 className="text-[clamp(1.25rem,3vw,2rem)] font-semibold mb-4 sm:mb-6">Team Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 h-[calc(100%-4rem)]">
            {/* Schedule Cards */}
            {[1, 2, 3, 4, 5].map((person) => (
              <div key={person} className="border border-gray-800 rounded-lg p-3 sm:p-4 bg-gray-900/50">
                <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-medium mb-2 sm:mb-3">
                  Person {person}
                </h3>
                {/* Schedule component will go here */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
