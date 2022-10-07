import React, { useState, useEffect } from "react";
import CustomCard from "components/CustomCard/CustomCard";
import "../Home/Home.scss";
import axios from "axios";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

function HourlyForcast() {
  let { dateParam } = useParams();
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
        `https://api.open-meteo.com/v1/forecast?latitude=${userCurretLocation.lat}&longitude=${userCurretLocation.long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=${dateParam}&end_date=${dateParam}`
      );
      if (res) {
        setIsLoading(false);
        let weatherCodeArr = res.data.hourly.weathercode;
        let tempArr = res.data.hourly.temperature_2m;
        let timeArr = res.data.hourly.time;
        let _weatherData = [];
        //combine list into list of json
        weatherCodeArr.forEach((code, idx) => {
          _weatherData.push({
            weatherCode: code,
            temp: tempArr[idx],
            time: timeArr[idx],
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
              {dateParam + "`s Forecast Weather"}
            </Typography>
          </div>
          <div className="right-section">
            {weatherData.map((item) => {
              return <CustomCard weatherData={item} variant="not-clickable" />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default HourlyForcast;
