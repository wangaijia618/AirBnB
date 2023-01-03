import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkLoadFilteredSpot } from "../../../store/filterReducer";
import './IndexFilter.css'


function IndexFilter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [hasSubmitted, setHasSubmitted] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const filteredSpotsPayload = { minPrice, maxPrice }
    // console.log('filteredSpotsPayload!!!', filteredSpotsPayload)

    let filteredSpots = await dispatch(thunkLoadFilteredSpot(filteredSpotsPayload))
    const filterSpotsArr = Object.values(filteredSpots.spots)

    // console.log('filterSpotsArr!!!!!!!!!!!!', filterSpotsArr)
    // console.log('filteredSpots!!!!!!!!!!!!', filteredSpots)

    if (filteredSpots) {
      history.push(`/spotss/filter`)
    }
  }

  return (


    <div
      className="filter-outer-container">
      <div className="filter-inner-container">

        <h2 className="filter-index-title">Filter</h2>
        <hr></hr>

        <form onSubmit={handleSubmit}
          className="filter-form-container">

          <div className="filter-input-div-container">
            <div className="filter-price-container">
              <div className="filter-price-text">Minimum Price</div>
              <span className="filter-dollar-sign">$</span>
              <input type="number" className="filter-price-input"
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="10" min="1" max="1000+" />
            </div>

            <div className="filter-price-container">
              <div className="filter-price-text">Maximum Price</div>
              <span className="filter-dollar-sign">$</span>
              <input type="number" className="filter-price-input"
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="1000+" min="1" max="1000" />
            </div>

          </div>
          <button
            className="filter-create-button"
            type="submit">Apply</button>

        </form>

      </div>
    </div>
  );
}

export default IndexFilter;
