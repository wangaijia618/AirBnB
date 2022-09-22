import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addSpot, createImage} from "../../store/spots";
import "./CreateSpot.css"

const CreateNewSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('')
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const errors = [];
    if (lng > 180 || lng < -180) errors.push("Longitude is not valid (Between -180 & 180)")
    if (lat > 90 || lat < -90) errors.push("Latitude is not valid (Between -90 & 90)")
    if (!image.endsWith('.jpg') && !image.endsWith('.png') && !image.endsWith('.jpeg')) {
      errors.push('Provide a valid image url')
    }
    setErrors(errors)
  }, [address, city, state, country, lat, lng, name, description, price, image])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
     if (errors.length > 0) return
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
    const spot = await dispatch(addSpot(spotInfo)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors([data.errors])
    })
    dispatch(createImage({previewImage: true, url: image}, spot.id))
    history.push(`/spots/${spot.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className='createForm'>
      <div className='createBox'>
      <div className='createTitle'>
        <h1 className='createHTitle'>Welcome to AirDnd</h1>
      </div>
      <div>
        <h2 className='createSubTitle'>Host Your Home</h2>
      </div>
      <div>
        {isSubmitted && errors?.length > 0 &&
        <ul>
          {errors.map((error, idx) =>
            <div key={idx} className='createError'>{error}</div>
            )}
            </ul>
            }
      </div>
        </div>
        <div className='createText'>
      <label>
        <input
        className='createName'
        type="text"
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createAddress'
        type="text"
        placeholder='Address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createCity'
        type="text"
        placeholder='City'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createState'
        type="text"
        placeholder='State'
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createCountry'
        type="text"
        placeholder='Country'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createLat'
        type="number"
        placeholder='Latitude'
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createLng'
        type="number"
        placeholder='Longitude'
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createDescription'
        type="text"
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createPrice'
        type="number"
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createImage'
        type="url"
        placeholder='Image Url (Must end with .jpg/.jpeg/.png)'
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        />
      </label>
      </div>
      <div className='createDivBut'>
      <button type="submit" disabled={isSubmitted && errors.length > 0} className='signUpButton'>Host Your Home!</button>
      </div>
    </form>
  )
}

export default CreateNewSpot;
