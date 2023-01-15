import {Link} from 'react-router-dom';
import "./SpotBox.css"
import {removeSpot} from '../../store/spots'
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import  EditSpotModal  from '../EditSpotForm'

const SpotBoxWithButton = ({spot}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.spots.allSpots)
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(removeSpot(spot.id))
        history.push("/")
      }
      console.log("allSpotssssssss", spots)
  return (
      <>
          <div className='spotBox'>
          <Link key={spot?.id} className='eachSpot' to={`/spots/${spot?.id}`}>
          {/* <Link className='eachSpot' to={`/spots/${spot?.id}`}> */}
          <div className='imgDiv'>
           <img className='imgSpot' src={spot?.previewImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="Image Not Available"/>
           </div>
           <div className='locationReviews'>
           <div key={spot?.id} className='citySpot'>{spot?.city}, {spot?.state}</div>
           {/* <div className='citySpot'>{spot?.city}, {spot?.state}</div> */}
           <div className='starSpot'>
           <div className="fa-solid fa-star"/>
           {spot?.avgRating}</div>
           </div>
           <div className='priceNight'>
           <div className='priceSpot'>${spot?.price}</div>
           <div className='nightSpot'>night</div>
           </div>
           </Link>
           <div className='editDeleteSpot'>
            {Object.values(spots).map((spot) => (
            <EditSpotModal spot={spot} key={spot.id}/>))}

              <button type="button" onClick={handleDelete} className='deleteButton'>Delete Spot</button>
            </div>
           </div>
    </>
  )
}

export default SpotBoxWithButton;
