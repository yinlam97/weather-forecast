import React, { useState, useEffect } from "react";
import CustomCard from "components/CustomCard/CustomCard";
import "./Home.scss";
import axios from "axios";
import { Typography } from "@mui/material";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurretLocation, setCurrentUserLocation] = useState({
    lat: 3.01,
    long: 101.4,
  });
  useEffect(() => {
    fetchWeatherData();
    // get user current position
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  async function fetchWeatherData() {
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${userCurretLocation.lat}&longitude=${userCurretLocation.long}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore`
      );
      if (res) {
        setIsLoading(false);
        let dateArr = res.data.daily.time;
        let weatherCodeArr = res.data.daily.weathercode;
        let minTempArr = res.data.daily.temperature_2m_min;
        let maxTempArr = res.data.daily.temperature_2m_max;
        let _weatherData = [];
        //combine list into list of json
        dateArr.forEach((date, idx) => {
          _weatherData.push({
            date: date,
            weatherCode: weatherCodeArr[idx],
            minTemp: minTempArr[idx],
            maxTemp: maxTempArr[idx],
          });
        });
        setWeatherData(_weatherData);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }
  function success(pos) {
    var crd = pos.coords;
    setCurrentUserLocation({
      let: parseFloat(crd.latitude).toFixed(2),
      long: parseFloat(crd.longitude).toFixed(2),
    });
  }
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="home-container">
          <div className="left-section">
            <Typography variant="h2" color={"white"}>
              Today`s Weather
            </Typography>
            <CustomCard weatherData={weatherData[0]} variant="lg" />
          </div>
          <div className="right-section">
            {weatherData.map((item) => {
              return <CustomCard weatherData={item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
