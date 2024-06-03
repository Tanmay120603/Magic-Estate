import { useEffect,useState } from "react"
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css"
import "@maptiler/geocoding-control/style.css"
import getCurrentLocation from "../../utils/getCurrentLocation";
import "./mapTiler.scss";

function MapTiler({handleDone,latLng}){

    const [marker,setMarker]=useState()
    const [accessLocation,setAccessLocation]=useState(null)
    const[loading,setLoading]=useState(true)
    maptilersdk.config.apiKey=import.meta.env.VITE_MAPTILER_API_KEY

    useEffect(()=>{
       if(!accessLocation && loading){
        return getCurrentLocation(setAccessLocation,setLoading)
       }

       //Intialization of map
       const map=new maptilersdk.Map({
        container:"map",
        style:maptilersdk.MapStyle.STREETS,
        center: accessLocation || [78.9629,20.5937],
        zoom:4
       })

       //Adding draggable marker on map
       const marker=new maptilersdk.Marker({draggable:true}).setLngLat(accessLocation || [78.9629,20.5937]).addTo(map)
       
       //Adding search by area name control to map and on pick setting new picked location to the marker by pick event
       const gc=new GeocodingControl({country:"IN",marker:false,markerOnSelected:false})
       gc.addEventListener("pick",({detail})=>{marker.setLngLat(detail.center)})
       
       map.addControl(gc,"top-left")
       setMarker(marker)
    },[loading])

    if(loading){
        return(
            <div>Loading...</div>
        )
    }

    return(
        <div id="map" className="maptiler-map">
            <button className="maptiler-done-button" onClick={()=>handleDone(marker)}>Done</button>
        </div>
    )
}

export default MapTiler