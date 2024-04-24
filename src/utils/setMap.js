import {map,tileLayer} from "leaflet"

function setLeafletMap(elementId){
    const leafletMap=map(elementId).setView([52.35551770,-1.17431970],5)
    const tileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    tileLayer(tileUrl,{attribution}).addTo(leafletMap)
    return leafletMap
}


export default setLeafletMap