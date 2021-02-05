import React, { useState } from "react";
import Weather from "./weather";

function App() {
  const [userInput, setUserInput] = useState("");
  const [weatherData, setweatherData] = useState(["london"]);
  // const [error, setError] = useState(false);

  function handleInput(e) {
    setUserInput(e.target.value);
  }

  function generateWeather(e) {
    e.preventDefault();
    setweatherData((prev) => [...prev, userInput]);
    setUserInput("");
    console.log(weatherData);
  }

  // function handleError() {
  //   setError(true);
  //   console.log(error);
  // }

  return (
    <div className="App text-center container-fluid">
      <div className="mx-auto">
        <div className="heading">
          <h1>Weather App</h1>
        </div>
        <div className="input-group center-item   mb-3">
          <form onSubmit={generateWeather}>
            <input
              onChange={handleInput}
              type="text"
              className="form-control  text-center"
              placeholder="Enter City Name"
              value={userInput}
            />
          </form>
        </div>
        <div className="weather-card">
          {weatherData.map((city, index) => {
            return <Weather city={city} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
