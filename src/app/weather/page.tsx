"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cloud, Sun, Sprout, Leaf } from "lucide-react";

const WeatherPage = () => {
  const [weather, setWeather] = useState<null | {
    city: string;
    temp: number;
    humidity: number;
    condition: string;
  }>(null);

  const [suggestions, setSuggestions] = useState<
    { name: string; soil_type: string }[]
  >([]);

  const cropData = {
    Apple: {
      min_temp: 15,
      max_temp: 24,
      min_humid: 50,
      max_humid: 80,
      soil_type: "Well-drained loamy soil, sandy loam",
    },
    Banana: {
      min_temp: 26,
      max_temp: 30,
      min_humid: 75,
      max_humid: 85,
      soil_type: "Rich loamy soil",
    },
    Cotton: {
      min_temp: 25,
      max_temp: 35,
      min_humid: 50,
      max_humid: 70,
      soil_type: "Black soil, sandy loam",
    },
    Rice: {
      min_temp: 22,
      max_temp: 32,
      min_humid: 70,
      max_humid: 96,
      soil_type: "Clayey loam, alluvial soil",
    },
  };

  const suggestCrops = (temp: number, humid: number) => {
    const filtered = Object.entries(cropData)
      .filter(
        ([_, v]) =>
          temp >= v.min_temp &&
          temp <= v.max_temp &&
          humid >= v.min_humid &&
          humid <= v.max_humid
      )
      .map(([name, v]) => ({ name, soil_type: v.soil_type }));

    setSuggestions(filtered);
  };

  const getWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);
        const data = await res.json();

        const weatherInfo = {
          city: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].description,
        };

        setWeather(weatherInfo);
        suggestCrops(weatherInfo.temp, weatherInfo.humidity);
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-emerald-100 to-green-50">
      <div className="flex-1 container mx-auto px-6 py-8">
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50/90 to-white/90 backdrop-blur-sm">
          <CardHeader className="bg-green-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold text-green-800">
                  Weather & Crop Suggestions
                </h2>
              </div>
              <Button
                onClick={getWeather}
                variant="outline"
                className="border-green-200 hover:bg-green-50 text-green-700"
              >
                <Sun className="w-4 h-4 mr-2" />
                Get Weather Info
              </Button>
            </div>
            {weather && (
              <Badge
                variant="outline"
                className="w-fit border-green-200 text-green-700"
              >
                {`${weather.city}: ${weather.condition}, ${weather.temp}°C, Humidity: ${weather.humidity}%`}
              </Badge>
            )}
          </CardHeader>

          <CardContent className="pt-6">
            {suggestions.length > 0 ? (
              <ScrollArea className="h-[300px] rounded-md border border-green-100">
                <div className="p-4 space-y-4">
                  {suggestions.map((crop, i) => (
                    <Card
                      key={i}
                      className="border-green-100 hover:bg-green-50 transition-colors"
                    >
                      <CardContent className="p-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Sprout className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-600">
                              Crop
                            </p>
                            <p className="text-lg font-semibold text-green-800">
                              {crop.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="text-sm font-medium text-green-600">
                              Soil Type
                            </p>
                            <p className="text-lg text-green-800">
                              {crop.soil_type}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : weather ? (
              <p className="text-red-500 text-center py-4">
                No suitable crops found for current weather.
              </p>
            ) : (
              <p className="text-center text-green-600/80 py-4">
                Click the button to get weather information and crop
                suggestions.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="w-full border-t border-green-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">FarmLife</span>
          </div>
          <span className="text-sm text-green-700">
            © 2025 FarmLife. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
};

export default WeatherPage;
