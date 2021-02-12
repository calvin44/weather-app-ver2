// import React, { useContext } from "react";
// import { myContext } from "./state";

export default function WeatherCard(props) {
  // const { print } = useContext(myContext);
  // console.log(print);

  // const capitalize = (a) => {
  //   if (a === null) {
  //     return "";
  //   } else {
  //     return a.charAt(0).toUpperCase() + a.slice(1);
  //   }
  // };

  return (
    <div className="weather-card mx-auto py-2 my-2 bg-light">
      <div className="ms-2">
        <div className="center-item">
          <div className="my-0">
            <p className="my-0">17 C</p>
          </div>
          <div className="center-vertical pt-1 ms-2">
            <p className="weather-card-description my-0">Span</p>
          </div>
        </div>
        <p className="my-0 py-0 weather-card-city">{props.city}</p>
      </div>
      <div className="me-3">
        <span>icon</span>
      </div>
    </div>
  );
}
