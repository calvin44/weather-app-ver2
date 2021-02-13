import React, { useState, useEffect } from "react";
import WeatherCard from "./weather-card";
import { myContext } from "./state";
import { Link } from "react-router-dom";
import axios from "axios";

export default function App() {
  // state hook to store user input
  const [userInput, setUserInput] = useState("");
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    // query city data from database
    axios
      .get("http://localhost:1000/")
      .then((res) => {
        console.log(res.data);
        res.data.forEach((e) => {
          setCityList((prev) => [...prev, e.city]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const redirectLink = (city) => {
    return `/weather/${city}`;
  };

  const print = (a) => {
    console.log("print something" + a);
  };

  const mapInput = (e) => {
    setUserInput(e.target.value);
  };

  const addCity = (event) => {
    // prevent form from submitting
    event.preventDefault();
    console.log(userInput);

    // push data
    axios({
      method: "post",
      url: "http://localhost:1000/push/",
      data: {
        City: userInput,
      },
    });

    // reload page start fetching
    window.location.reload();

    // clear user input automaticcally
    setUserInput("");

    console.log(cityList);
  };

  return (
    <div className="container-fluid app-container">
      <div className="container text-center">
        <h1 className="app-name my-4">Weather App</h1>
        {/* <h2>{cityList}</h2> */}
        <div className="input-group center-item">
          <form onSubmit={addCity}>
            <input
              onChange={mapInput}
              type="text"
              className="form-control text-center"
              placeholder="Username"
              value={userInput}
            />
          </form>
        </div>
        <myContext.Provider value={{ print }}>
          <div className="city-list">
            {cityList.map((item, index) => (
              <Link className="disable-link" to={redirectLink(item)}>
                <WeatherCard city={item} key={index} />
              </Link>
            ))}
          </div>
        </myContext.Provider>
      </div>
    </div>
  );
}
