import React from "react";
import { US_States } from "../../lib/mockData";
import "./states.css";
import { useNavigate } from "react-router-dom";

const States = () => {
  const navigate = useNavigate();
  const handleStateWise = (stateName) => {
    navigate(`/states/${encodeURIComponent(stateName)}`);
  };
  return (
    <section className="us-states-section">
      <div className="container">
        {US_States.map((entry, indx) => {
          return (
            <div
              className="state-card"
              key={indx}
              onClick={() => {
                handleStateWise(entry.state);
              }}
            >
              <h2>{entry.state}</h2>
              <p>{entry.abbreviation}</p>
              <p>{entry.population}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default States;
