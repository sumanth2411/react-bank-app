import React from "react";
import "./Filter.css";

const Filter = (props) => {
  const options = ["firstName", "lastName"].map((key) => (
    <option key={key} value={key}>
        {key}
    </option>
  ));

  
  const search = () => {
    const sortByValue = document.querySelector("select[name='sortBy']").value;
    const directionValue = document.querySelector("select[name='direction']").value;

    if (directionValue !== "Direction") {
      props.setDirection(directionValue);
    }
    if (sortByValue !== "Sort By") {
      props.setSortBy(sortByValue);
    }
  };

  
  const reset = () => {
    document.querySelector("select[name='sortBy']").value = "Sort By";
    document.querySelector("select[name='direction']").value = "Direction";
  };

  return (
    <div className="filter-container">
      <div className="input-container">
        <label>Sort By:</label>
        <select name="sortBy">
          <option selected>Sort By</option>
          {options}
        </select>
      </div>
      <div className="input-container">
        <label>Direction:</label>
        <select name="direction">
          <option selected>Direction</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="input-container">
        <button type="button" onClick={search}>
          Search
        </button>
      </div>
      <div className="input-container">
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
