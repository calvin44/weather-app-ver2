import axios from "axios";
import React, { useState, useEffect } from "react";

function Weather(props) {
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [main, setMain] = useState("");
  const [feels, setFeels] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [temp, setTemp] = useState({
    max: 0,
    current: 0,
    low: 0,
  });

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=bae2183dad4c9ecea641d6e6a899efcb`;
  const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  useEffect(() => {
    // call api on render
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
        setIcon(res.data.weather[0].icon);
        setDesc(res.data.weather[0].description);
        setMain(res.data.weather[0].main);
        setVisibility(res.data.visibility);
        setPressure(res.data.main.pressure);
        setWindSpeed(res.data.wind.speed);
        setHumidity(res.data.main.humidity);
        setTemp({
          max: res.data.main.temp_max,
          current: res.data.main.temp,
          min: res.data.main.temp_min,
        });
        setFeels(res.data.main.feels_like);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  function getDay() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let d = new Date();
    let dayName = days[d.getDay()];
    return dayName;
  }

  function capitalize(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }

  function convertCelcius(f) {
    return (f - 273.15).toFixed(2);
  }

  return (
    <div className="card mx-3 weather-body mb-4" style={{ width: "18rem" }}>
      <h3 className="card-title mb-0 py-2 my-3">{capitalize(props.city)}</h3>
      <img
        src={imgURL}
        className="card-img-top my-3 weather-img mx-auto"
        alt="weather icon"
      />

      <div className="container py-3 px- 2 temp-container">
        <div className="row container-fluid mx-auto px-0 py-0">
          <div className="col  ps-0 ">
            <div className="row">
              <div className="col current-temp-container">
                <span className="current-temp ">
                  {convertCelcius(temp.current)}
                </span>
                <span className="ps-1 mt-3 fs-5">°C</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="text-start ps-1 fw-bold fs-4">{getDay()}</p>
              </div>
            </div>
          </div>
          <div className="col px-0 weather-description">
            <span className="me-2 fs-4">{main}</span>
          </div>
        </div>
      </div>

      <div className="container-fluid mx-0">
        <div className="row">
          <div className="col px-0 details-heading">
            <span className="ms-2 my-2 fw-bold fs-5">Weather Details</span>
          </div>
        </div>
        <div className="row px-2 my-3">
          <div className="col-6 px-0 details-data">
            <p className="my-0 text-start">{feels} °C</p>
            <p className="my-0 mt-2 text-start  details-text">
              Temperature Felt
            </p>
          </div>
          <div className="col-6 px-0 details-data">
            <p className="my-0 text-start">{visibility} M</p>
            <p className="my-0 mt-2 text-start  details-text">Visibility</p>
          </div>
        </div>
        <div className="row px-2 my-3">
          <div className="col-6 px-0 details-data">
            <p className="my-0 text-start">{pressure} hPa</p>
            <p className="my-0 mt-2 text-start  details-text">Air Pressure</p>
          </div>
          <div className="col-6 px-0 details-data">
            <p className="my-0 text-start">{windSpeed} km/h</p>
            <p className="my-0 mt-2 text-start  details-text">Wind Speed</p>
          </div>
        </div>
        <div className="row px-2 my-3">
          <div className="col-6 px-0 details-data">
            <p className="my-0 text-start">{humidity}%</p>
            <p className="my-0 mt-2 text-start  details-text">Humidity</p>
          </div>
          <div className="col-6 px-0 details-data">
            <p className="my-0 text-start">{capitalize(desc)}</p>
            <p className="my-0 mt-2 text-start  details-text">Description</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
