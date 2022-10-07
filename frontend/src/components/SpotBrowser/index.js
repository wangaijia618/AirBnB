import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {allSpotsArray,getAllSpots} from '../../store/spots';
import "./SpotBrowser.css";
import SpotBox from '../SpotBox';
// import CreateReviewModal from '../CreateReviewModal'
const SpotBrowser = () => {
  const dispatch = useDispatch();
  // const spotsObj = useSelector(allSpotsArray);
  const spotsObj = useSelector ((state => state.spots.allSpots))
  const spots = Object.values(spotsObj)
  useEffect(() => {
    // dispatch(getAllSpots())
  dispatch(getAllSpots())
  },[dispatch])

  if (!spots) return null;

  return (

      <>

      <div className='outer-container'>
        {spots.map(spot => (
          <div className='most-inner-container'>
          <SpotBox key={spot?.id} spot={spot}/>
          </div>
        )   //?id resolve id undefined issue, better all use ?
          )}

      </div>
    </>

  )
}


export default SpotBrowser;
