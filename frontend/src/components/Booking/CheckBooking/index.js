
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from 'react-date-range';
import { thunkLoadBookingsOfSpot } from "../../../store/bookingReducer";
import { getDaysArray } from "../../../Util/functions";
import './CheckBooking.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


function CheckBooking({ spotId }) {
  const dispatch = useDispatch();
  const spotBookings = useSelector(state => state.booking)
  useEffect(() => {
    dispatch(thunkLoadBookingsOfSpot(spotId));
  }, [dispatch]);
  // console.log("spotBookings!!!",spotBookings);
  const arrBooking = Object.values(spotBookings)

  let disabledDates = []
  for (let booking of arrBooking) {
    disabledDates = disabledDates.concat(getDaysArray(booking.startDate, booking.endDate));
  }

  const startDate = new Date();
  const endDate = new Date()
  const nextMonth = new Date(startDate.getTime() + (33 * (24) * 60 * 60 * 1000))

  return (
    <>
      <div className="reservation-calendar-container">
        <div className="reservation-calendar">
          <Calendar className="check-Calendar"
            minDate={new Date()}
            disabledDates={disabledDates}
            color='#ff385c'
          />
        </div>
        <div className="reservation-calendar">
          <Calendar className="check-Calendar"
            minDate={new Date()}
            shownDate={nextMonth}
            disabledDates={disabledDates}
            color='#ff385c'
          />
        </div>
      </div>
    </>
  );
}

export default CheckBooking;
