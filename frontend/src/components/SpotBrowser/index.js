import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {allSpotsArray,getAllSpots} from '../../store/spots';
import "./SpotBrowser.css";
import SpotBox from '../SpotBox';

const SpotBrowser = () => {
  const dispatch = useDispatch();
  // const spotsObj = useSelector(allSpotsArray);
  const spots = useSelector(state => Object.values(state.spots))
  useEffect(() => {
    dispatch(getAllSpots())
  //  dispatch(getAllSpots(spotsObj))
  },[dispatch])

  return (

      <>
      <div className='firstDiv'></div>
      <div className='spotBox'>
        {spots?.map(spot => (
          <SpotBox key={spot.id} spot={spot}/>
        )
          )}
      </div>
    </>

  )
}


export default SpotBrowser;
