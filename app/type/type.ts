export interface WeatherData {
    location: {
      name: string;
    };
    current: {
      temp_f: number;
      condition: {
        text: string;
      };
      feelslike_f: number;
    };
    forecast: {
      forecastday: {
        day: {
          maxtemp_f: number;
          mintemp_f: number;
        };
      }[];
    };
  }
 export interface data {
    weather: WeatherData;
    quote: string;
  }