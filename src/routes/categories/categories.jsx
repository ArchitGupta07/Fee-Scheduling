import React from "react";
import "./categories.css";
import { useNavigate, useParams } from "react-router-dom";
import { stateInsuranceCoverage } from "../../lib/mockData";

const Categories = () => {
  const { stateName } = useParams();
  const navigate = useNavigate();

  // Get the list of diseases for the state
  console.log(stateName);

  const categories = stateName ? stateInsuranceCoverage[stateName] : [];

  const handleViewButton = (category) => {
    // navigate(
    //   `/fee/${encodeURIComponent(stateName)}?disease=${encodeURIComponent(
    //     disease.toLowerCase()
    //   )}`
    // );
    console.log(category, stateName);
    navigate(
      `/fee/${encodeURIComponent(stateName)}/${encodeURIComponent(
        category.toLowerCase()
      )}`
    );
  };

  return (
    <section className="categories-section">
      <div className="categories-table">
        {categories.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category}</td>
                  <td>
                    <button
                      onClick={() => {
                        // Handle file viewing action here
                        // alert(`Viewing file for ${disease} in ${stateName}`);
                        handleViewButton(category);
                      }}
                    >
                      View File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for this state.</p>
        )}
      </div>
    </section>
  );
};

export default Categories;
