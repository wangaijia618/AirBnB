
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkAddBookingToSpot } from "../../../store/bookingReducer";
import './CreateBooking.css'

function CreateBooking({ spot }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [hasSubmitted, setHasSubmitted] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { spotId } = useParams();
  let numOfNight = parseInt((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const bookingPayload = { id: spotId, startDate, endDate }
    if(startDate>=endDate){
      window.alert("Please choose a valid date!")
      return
    }

    let createdBooking = await dispatch(thunkAddBookingToSpot(bookingPayload)).catch(async (res) => {

      const data = await res.json();
      if (!sessionUser?.hasOwnProperty('id')) {
        window.alert("Please log in or sign up first!")
        history.push(`/`)
      }

      if (data && data.errors) {
        setErrors([data.errors.startDate])
        setErrors([data.errors.endDate])
        setErrors(data.errors)
      };
      // console.log("data.errors!!!", data.errors)
      // console.log("errors+++", errors)
    });

    if (createdBooking) {
      history.push(`/bookings/current`)
    }
  }

  return (
    <>
      <form className="booking-create-form-container" onSubmit={handleSubmit}>
        <div className="booking-create-form">
          <div className="reservation-inputs-container">

            <div className="reservation-container-checkin-outer">
              <div className="reservation-container-checkin">
                <label htmlFor="checkin-input" className="booking-words">CHECK-IN </label>
                <input type="date" className="reservation-input"
                  id="reservation-checkin-input" placeholder="Check-in"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={`${new Date().toLocaleDateString('en-ca')}`} />
              </div>
            </div>

            <div className="reservation-container-checkout-outer">
              <div className="reservation-container-checkout">
                <label htmlFor="reservation-checkout-input" className="booking-words">CHECKOUT</label>
                <input type="date" className="reservation-input"
                  id="reservation-checkout-input" placeholder="Check-out"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={`${new Date(new Date(startDate).getTime() + (1000 * 3600 * 48)).toLocaleDateString('en-ca')}`}
                />
              </div>
            </div>

          </div>

          <div className="reservation-guests-input-container" >
            <label htmlFor="reservation-guests-input" className="booking-words">GUESTS</label>
            <br></br>
            <span className="units-suffix">
              <input type="number" className="reservation-input"
                placeholder="1" min="1" max="6" />
              <span className="booking-words">{'          guests'}</span>
            </span>

          </div>
        </div>

        {hasSubmitted && (!!errors?.length || errors?.endDate || errors?.startDate) && <div>
          <ul>
            {<li>Sorry those date slots are not available.</li>}
          </ul>
        </div>}

        <button
          className="booking-create-button"
          type="submit">Reserve</button>

      </form>
      <div className="booking-create-notes">You won't be charged yet</div>

      <div>
        <div className='price-calculation-listing'>
          <span>
            <span>${spot.price}</span>
            <span> x </span>
            <span id="number-of-night"> {numOfNight}</span>
            <span>   nights</span>
          </span>
          <span>${spot.price * numOfNight}</span>
        </div>

        <div className='price-calculation-listing'>
          <span>Service fee</span>
          <span>$200</span>
        </div>

        <div className='price-calculation-listing-bottom price-calculation-listing' >
          <span>Cleaning fee</span>
          <span>$100</span>
        </div>

        <hr></hr>

        <div className='price-calculation-listing' id="price-calculation-result">
          <span>Total before taxes</span>
          <span>${spot.price * numOfNight + 300}</span>
        </div>
      </div>
    </>
  );
}

export default CreateBooking;
