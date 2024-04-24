import { useEffect } from "react"
import { useState } from "react"
import setLeafletMap from "../../../utils/setMap"
import setMarkerLayer from "../../../utils/setMarkerLayer"
import "leaflet/dist/leaflet.css"
import "./map.scss"

function Map({List,map,setMap,filters}){
    const [buyLayer,setBuyLayer]=useState()
    const [rentLayer,setRentLayer]=useState()

    useEffect(()=>{
        if(!map){
            const leafletMap=setLeafletMap("map")
            setMap(leafletMap)
            const[newBuyLayer,newRentLayer]=setMarkerLayer(List,leafletMap)
            setBuyLayer(newBuyLayer)
            setRentLayer(newRentLayer)
        }
        else{
           buyLayer && map.removeLayer(buyLayer)
           rentLayer && map.removeLayer(rentLayer)
           const[newBuyLayer,newRentLayer]=setMarkerLayer(List,map)
           setBuyLayer(newBuyLayer)
           setRentLayer(newRentLayer)
        }
    },[filters])

    return(
        <div className="map" id="map">
        </div>
    )
}

export default Map