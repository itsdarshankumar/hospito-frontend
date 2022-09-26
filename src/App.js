import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentindex, setCurrentIndex] = useState(null);
  const [currentDepth, setCurrentDepth] = useState(0);
  const url = "https://hospito-assginment.herokuapp.com/api/frontend";
  console.log(currentindex);
  console.log(visible);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);
  console.log(data);

  return (
    <div className="App">
      {data.map((states, stateIndex) => (
        <div className="panel-heading">
          <h4 className="panel-title" key={stateIndex + 1}>
            <button
              onClick={() => {
                if (visible && Math.trunc(currentindex) !== stateIndex + 1) {
                  setVisible(true);
                } else {
                  setVisible(!visible);
                }
                setCurrentIndex(stateIndex + 1);
                setCurrentDepth(0);
              }}
            >
              {states.name}
            </button>
          </h4>

          <div
            className={
              visible &&
              stateIndex + 1 === Math.floor(currentindex) &&
              currentDepth >= 0
                ? "panel-collapse"
                : "panel-collapse panel-close"
            }
          >
            {states.cities.map((city, cityIndex) => (
              <div>
                <ul className="list-group">
                  <li
                    className="list-group-item list-group-item-primary"
                    key={stateIndex + 1 + (cityIndex + 1) / 10.0}
                    onClick={() => {
                      if (
                        currentindex ===
                        stateIndex + 1 + (cityIndex + 1) / 10.0
                      ) {
                        setCurrentIndex(stateIndex + 1)
                      } else {
                        setCurrentIndex(
                          stateIndex + 1 + (cityIndex + 1) / 10.0
                        );
                      }

                      setCurrentDepth(1);
                    }}
                  >
                    {city.name}
                  </li>
                </ul>
                <div
                  className={
                    visible &&
                    Math.floor(currentindex) ===
                      currentindex - (cityIndex + 1) / 10 &&
                    currentDepth >= 1
                      ? "panel-collapse"
                      : "panel-collapse panel-close"
                  }
                >
                  {city.towns.map((towns, townIndex) => (
                    <ul className="list-group">
                      <li
                        className="list-group-item list-group-item-secondary"
                        key={cityIndex + 1 + (townIndex + 1) / 10.0}
                      >
                        {towns.name}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
