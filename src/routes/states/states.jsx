import React from "react";
// import { US_States } from "../../lib/mockData";
import "./states.css";
import { useNavigate } from "react-router-dom";

const States = () => {
  const navigate = useNavigate();
  const handleStateWise = (stateName) => {
    navigate(`/states/${encodeURIComponent(stateName)}`);
  };

  const US_States = [
    { state: "Alabama", abbreviation: "AL", population: 4921532 },
    { state: "Alaska", abbreviation: "AK", population: 731158 },
    { state: "Arizona", abbreviation: "AZ", population: 7421401 },
    { state: "Arkansas", abbreviation: "AR", population: 3030522 },
    { state: "California", abbreviation: "CA", population: 39368078 },
    { state: "Colorado", abbreviation: "CO", population: 5758736 },
    { state: "Connecticut", abbreviation: "CT", population: 3552825 },
    { state: "Delaware", abbreviation: "DE", population: 973764 },
    { state: "Florida", abbreviation: "FL", population: 21733312 },
    { state: "Georgia", abbreviation: "GA", population: 10710017 },
    { state: "Hawaii", abbreviation: "HI", population: 1421134 },
    { state: "Idaho", abbreviation: "ID", population: 1839106 },
    { state: "Illinois", abbreviation: "IL", population: 12671469 },
    { state: "Indiana", abbreviation: "IN", population: 6785528 },
    { state: "Iowa", abbreviation: "IA", population: 3193079 },
    { state: "Kansas", abbreviation: "KS", population: 2934582 },
    { state: "Kentucky", abbreviation: "KY", population: 4477265 },
    { state: "Louisiana", abbreviation: "LA", population: 4627004 },
    { state: "Maine", abbreviation: "ME", population: 1350141 },
    { state: "Maryland", abbreviation: "MD", population: 6165129 },
    { state: "Massachusetts", abbreviation: "MA", population: 6976597 },
    { state: "Michigan", abbreviation: "MI", population: 9989642 },
    { state: "Minnesota", abbreviation: "MN", population: 5700671 },
    { state: "Mississippi", abbreviation: "MS", population: 2966786 },
    { state: "Missouri", abbreviation: "MO", population: 6154913 },
    { state: "Montana", abbreviation: "MT", population: 1084225 },
    { state: "Nebraska", abbreviation: "NE", population: 1961504 },
    { state: "Nevada", abbreviation: "NV", population: 3138259 },
    { state: "New Hampshire", abbreviation: "NH", population: 1377529 },
    { state: "New Jersey", abbreviation: "NJ", population: 9267130 },
    { state: "New Mexico", abbreviation: "NM", population: 2117522 },
    { state: "New York", abbreviation: "NY", population: 20215751 },
    { state: "North Carolina", abbreviation: "NC", population: 10600823 },
    { state: "North Dakota", abbreviation: "ND", population: 779702 },
    { state: "Ohio", abbreviation: "OH", population: 11747694 },
    { state: "Oklahoma", abbreviation: "OK", population: 3963516 },
    { state: "Oregon", abbreviation: "OR", population: 4318492 },
    { state: "Pennsylvania", abbreviation: "PA", population: 12803056 },
    { state: "Rhode Island", abbreviation: "RI", population: 1059361 },
    { state: "South Carolina", abbreviation: "SC", population: 5277830 },
    { state: "South Dakota", abbreviation: "SD", population: 896581 },
    { state: "Tennessee", abbreviation: "TN", population: 6916897 },
    { state: "Texas", abbreviation: "TX", population: 29945357 },
    { state: "Utah", abbreviation: "UT", population: 3367718 },
    { state: "Vermont", abbreviation: "VT", population: 643077 },
    { state: "Virginia", abbreviation: "VA", population: 8745500 },
    { state: "Washington", abbreviation: "WA", population: 7770483 },
    { state: "West Virginia", abbreviation: "WV", population: 1782954 },
    { state: "Wisconsin", abbreviation: "WI", population: 5854172 },
    { state: "Wyoming", abbreviation: "WY", population: 559678 },
  ];
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
