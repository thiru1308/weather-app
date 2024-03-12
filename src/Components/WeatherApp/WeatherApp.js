import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import axios from "axios";

const WeatherApp = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: cloud_icon,
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {}, []);

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8a6e5f9008062604ba3cf5445261dd5d&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = cloud_icon;
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = clear_icon;
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = rain_icon;
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = drizzle_icon;
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = snow_icon;
          } else {
            imagePath = cloud_icon;
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name!!");
          } else {
            setError("");
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="search-icon">
          <img src={search_icon} alt="" onClick={handleClick} />
        </div>
      </div>
      <div className="error">
        <p>{error}</p>
      </div>
      <div className="weather-image">
        <img src={data.image} alt="" />
      </div>
      <div className="weather-temp">{data.celcius}°c</div>
      <div className="weather-location">{data.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{data.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{data.speed} km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
