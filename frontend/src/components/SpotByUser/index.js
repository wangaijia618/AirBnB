import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editSpot, removeSpot, allSpotsUser } from "../../store/spots";
import SpotBox from "../SpotBox"
import "./SpotByUser.css"
//  console.log("12456879")

const SpotByUser = () => {

    // console.log("beginning")
    const history = useHistory()

    const dispatch = useDispatch();

    const spotObj = useSelector(state => state.spots.allSpots)
    // console.log("spotObj: ", spotObj)
    const spots = Object.values(spotObj)
    // console.log("spot: ", spots)

    const user = useSelector(state => state.session.user)
    const filter = spots.filter(spot => spot?.ownerId === user?.id)
    // console.log("filter: ", filter)
    // console.log("spots: ", spots)

    useEffect(() => {
        dispatch(allSpotsUser())
    }, [dispatch])

    if (!user) {
        alert("You need to log in first to manage your spot !")
        history.push("/")
    }

    // if (!filter) return alert("You need to log in first to manage your spot !")
    // return filter.length ? (
    //     <>
    //         {spots.map(spot =>
    //             <div className='SpotOwner_Container' key={spot.id}>
    //                 <div>
    //                     <NavLink to={`/spots/${spot.id}`}>
    //                         <img className='SpotOwner_img' src={spot.previewImage} alt="Vacation Property" />
    //                     </NavLink>
    //                 </div>
    //                 <div className='SpotOwner_Second_Container'>
    //                     <div className='SpotOwner_Price_and_Star'>
    //                         <div className='SpotOwner_Price'>{`$${spot.price}`} / night</div>
    //                         <div><i className="fa-solid fa-star"></i> {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
    //                     </div>
    //                     <div className='SpotOwner_Name'><i className="fa-solid fa-house"></i>Hotel Name: {spot.name}</div>
    //                     <div className='SpotOwner_Address'><i className="fa-solid fa-location-dot"></i> Hotel Address: {spot.address}, {spot.city}, {spot.state}, {spot.country}</div>
    //                     {/* <div>{spot.city}, {spot.state}, {spot.country} </div> */}
    //                     <div className='SpotOwner_Description'><i className="fa-solid fa-file-lines"></i> Description: {spot.description}</div>
    //                     <button className="SpotOwner_Link_Edit" onClick={() => dispatch(editSpot(spot.id))}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
    //                     <button className='SpotOwner_Delete_button' onClick={()=> dispatch(removeSpot(spot.id))}> <i className="fa-solid fa-trash-can"></i> Delete</button>
    //                 </div>
    //             </div>
    //         )}

    //     </>
    // ) :
    //     <>
    //         <h1 className='no_spot_found'>You currently have no any spot to host !</h1>

    //     </>
    return filter.length?(
        <>
        <div className='my_spots_title'>My Spots</div>
        <div className='emptyBordercurrent'/>
        <div className='my_spots'>
        {filter.map((spot) => (
          <SpotBox key={spot?.id} spot={spot}/>
          ))}
          </div>

          </>
      )
      :(
        <>
                 <h1 className='no_spot_found'>You currently have no spot !</h1>

             </>
             )


    }



export default SpotByUser;
