import {map,tileLayer} from "leaflet"

function setLeafletMap(elementId,geoExtent){
    const leafletMap=map(elementId).setView(geoExtent || [52.35551770,-1.17431970],geoExtent ? 15 : 5)
    const tileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    tileLayer(tileUrl,{attribution}).addTo(leafletMap)
    return leafletMap
}


export default setLeafletMap