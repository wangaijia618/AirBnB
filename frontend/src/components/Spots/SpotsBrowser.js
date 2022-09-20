// import React from 'react';
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, NavLink } from "react-router-dom";
// import { getAllSpots } from "../../store/spots";
// import "./Spot.css"

// const SpotsBrowser = () => {
//     const spotsObj = useSelector((state) => state.spots)
//     const spots = Object.values(spotsObj)
//     // console.log('spots: ', spots)

//     const dispatch = useDispatch();

//     // async function load () {
//     //    return await dispatch(getSpots());
//     // }


//     useEffect(() => {
//         //load()
//         dispatch(getAllSpots());
//     }, [dispatch]);



//     if (!spots) return null

//     return (
//         <>
//             <div className='test'>

//                 {spots.map(spot => (
//                     <div key={spot.id} className='getAllSpot-container'>
//                         {/* {console.log("spot.previewImage: ", spot.previewImage)} */}
//                         <div className='image_container'>
//                             {/* <NavLink to={`/spots/${spot.id}`}>
//                                 <img className="image_in_getAllSpot" src={spot.previewImage} alt="Vacation Property" />
//                             </NavLink> */}
//                         </div>

//                         <div className='getAllSpot_Second_Container'>
//                             <div>
//                                 <div className='getAllSpot-name'>{spot.name}</div>
//                                 <div className='getAllSpot_city_state'>{spot.city}, {spot.state} </div>
//                                 <div className="price_container">
//                                 <div className='getAllSpot_price'>{`$${spot.price}`} </div> <div className="night" > night</div>
//                                 </div>
//                             </div>
//                             <div className='getAllSpot-avgRating'>
//                                 <i className="fa-solid fa-star"></i>
//                                 {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}
//                             </div>
//                         </div>
//                     </div>



//                 ))}
//             </div>
//             <footer className='footer_container'>
//                 <div>
//                     © 2022 WonderlandBnB, Inc. · Privacy · Terms · Sitemap
//                 </div>
//                 <div>
//                 <i className="fa-solid fa-globe"></i> English(US)   $ USD
//                 </div>
//             </footer>
//         </>
//     );
// };

// export default SpotsBrowser;
