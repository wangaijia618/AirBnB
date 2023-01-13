import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editSpot, removeSpot, allSpotsUser } from "../../store/spots";
import SpotBoxWithButton from "../SpotBox/SpotBoxWithButton"
import "./SpotByUser.css"

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
    return filter.length?(
        <>
        <div className='my_spots_title'>My Spots</div>
        <div className='emptyBordercurrent'/>
        <div className='my_spots'>
        {filter.map((spot) => (
            <>
          <SpotBoxWithButton key={spot?.id} spot={spot}/>
           </>
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
