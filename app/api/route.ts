import { NextResponse } from "next/server"

const API_KEY = process.env.API_KEY
if (!API_KEY) {
    throw new Error("API_KEY is not defined in environment variables");
  }
export async function GET() {
   const weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Muncie&days=1&aqi=no&alerts=no`) 
    const quote = await fetch(`https://labs.bible.org/api/?formatting=plain&passage=votd`)
    // const photo = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
    // const schedule = await fetch(`https://api.example.com/schedule`)
    const weatherData = await weather.json()
    const quoteData = await quote.text()
    const data = {weather: weatherData, quote: quoteData}
    return NextResponse.json(data);
}