import { useEffect } from "react"
import { useState } from "react"
import setLeafletMap from "../../utils/setMap"
import setMarkerLayer from "../../utils/setMarkerLayer"
import "leaflet/dist/leaflet.css"
import "./map.scss"

function Map({List,map,setMap,geoExtent}){
    const [buyLayer,setBuyLayer]=useState()
    const [rentLayer,setRentLayer]=useState()
    const [mapInit,setMapInit]=useState(false)

    useEffect(()=>{
        if(!mapInit){
            const leafletMap=setLeafletMap("map",geoExtent)
            setMap && setMap(leafletMap)
            const[newBuyLayer,newRentLayer]=setMarkerLayer(List,leafletMap)
            setBuyLayer(newBuyLayer)
            setRentLayer(newRentLayer)
            setMapInit(true)
        }
        else{
           buyLayer && map?.removeLayer(buyLayer)
           rentLayer && map?.removeLayer(rentLayer)
           const[newBuyLayer,newRentLayer]=setMarkerLayer(List,map)
           setBuyLayer(newBuyLayer)
           setRentLayer(newRentLayer)
        }
    },[List])

    return(
        <div className="map" id="map">
        </div>
    )
}

export default Map