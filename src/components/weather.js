import axios from "axios";
import React, { useState, useEffect } from "react";

function Weather(props) {
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [temp, setTemp] = useState(0);
  const [feels, setFeels] = useState("");

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=bae2183dad4c9ecea641d6e6a899efcb`;
  const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  useEffect(() => {
    setInterval(() => {
      // call api every 10 seconds
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setIcon(res.data.weather[0].icon);
          setDesc(res.data.weather[0].desc);
          setTemp(res.data.main.temp);
          setFeels(res.data.main.feels_like);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 10000);
  });

  function capitalize(a) {
    let word = a.split(" ");
    for (let i = 0; i < word.length; i++) {
      word[i] = word[i][0].toUpperCase() + word[i].slice(1);
    }
    return word.join(" ");
  }

  function convertCelcius(f) {
    return (f - 273.15).toFixed(2);
  }

  return (
    <div className="card mx-3 weather-body mb-4" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title mb-0">{capitalize(props.city)}</h5>
        <img
          src={imgURL}
          className="card-img-top my-3 weather-img"
          alt="weather icon"
        />
        <p className="card-text mb-0">{desc}</p>
        <p className="card-text mb-0">{convertCelcius(temp)} °C</p>
        <p className="card-text mt-2">
          Feels Like <br />
          {convertCelcius(feels)} °C
        </p>
      </div>
    </div>
  );
}

export default Weather;
