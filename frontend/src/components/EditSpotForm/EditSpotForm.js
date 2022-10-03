import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {editSpot, getOneSpot} from "../../store/spots";
import { Modal } from '../../context/Modal';
import "./EditSpotForm.css"

const EditSpotForm = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
//   const spot = useSelector(state => state.spots[spotId])
const spot = useSelector(state => state.spots.singleSpot)
  // const [ownerId, setOwnerId] = useState(spot?.ownerId)
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [errors, setErrors] = useState([]);
  const [disableToggle, setDisableToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const errors = [];
    if (address === '') errors.push("Street address is required")
    if (city === '') errors.push("City is required")
    if (state === '') errors.push("State is required")
    if (country === '') errors.push("Country is required")
    if (lat === '') errors.push("Latitude is not valid")
    if (lng === '') errors.push("'Longitude is not valid'")
    if (name === '' || name.length > 50) errors.push("Valid name required")
    if (description === '') errors.push("Description is required")
    if (price === '') errors.push("Price is required")
    setErrors(errors)

  }, [address, city, state, country, lat, lng, name, description, price])
//   useEffect(() => {
//     dispatch(getOneSpot(spotId))
// }, [dispatch, spotId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const spotInfo = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };
    setErrors([]);
    dispatch(editSpot(spotInfo, spotId))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors([data.errors])
    })
    history.push(`/spots/${spotId}`)
   }

  return (
    <form onSubmit={handleSubmit} className='editForm'>
      <div className='editTitle'>
        {/* <h1 className='createHTitle'>Update Home</h1> */}
      </div>
      <div>
        <h2 className='editSubTitle'>Update Home</h2>
      </div>
      <div>
        {errors.map((error, idx) =>
        <div key={idx} className='editError'>{error}</div>
        )}
      </div>
      <label>
        <input
        className='editName'
        type="text"
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='editAddress'
        type="text"
        placeholder='Address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='editCity'
        type="text"
        placeholder='City'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='editState'
        type="text"
        placeholder='State'
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='editCountry'
        type="text"
        placeholder='Country'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='editLat'
        type="number"
        placeholder='Latitude'
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='editLng'
        type="number"
        placeholder='Longitude'
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
        />
      </label>
      <label>
        <textarea
        className='editDescription'
        type="text"
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='editPrice'
        type="number"
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        />
      </label>
      <button type="submit" className='editSpotBut'>Update Your Home!</button>
    </form>
  )
}

export default EditSpotForm;
