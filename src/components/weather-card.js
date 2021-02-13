import axios from "axios";
import React, { useEffect } from "react";
// import { myContext } from "./state";

export default function WeatherCard(props) {
  const [temp, setTemp] = React.useState(0);
  const [desc, setDesc] = React.useState("");
  const [icon, setIcon] = React.useState("");

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=bae2183dad4c9ecea641d6e6a899efcb`;
  const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const capitalize = (a) => {
    if (a === null) {
      return "";
    } else {
      return a.charAt(0).toUpperCase() + a.slice(1);
    }
  };

  function convertCelcius(f) {
    return (f - 273.15).toFixed(0);
  }

  useEffect(() => {
    axios.get(url).then((res) => {
      console.log(res.data);
      setTemp(res.data.main.temp);
      setDesc(res.data.weather[0].main);
      setIcon(res.data.weather[0].icon);
    });
  }, []);

  return (
    <div className="weather-card bg-white mx-auto mt-4 py-3 fs-4 my-2">
      <div className="ms-3">
        <div className="center-item">
          <div className="my-0">
            <p className="my-0">{convertCelcius(temp)}°C</p>
          </div>
          <div className="center-vertical pt-1 ms-2">
            <p className="weather-card-description my-0">{desc}</p>
          </div>
        </div>
        <p className="my-0 py-0 weather-card-city">{capitalize(props.city)}</p>
      </div>
      <div className="text-center">
        <img className="weather-icon" src={imgURL} alt="weather-icon" />
      </div>
    </div>
  );
}
