import {map,tileLayer} from "leaflet"

function setLeafletMap(elementId,geoExtent){
    const leafletMap=map(elementId).setView(geoExtent || [20.5937, 78.9629],geoExtent ? 15 : 5)
    const tileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    tileLayer(tileUrl,{attribution}).addTo(leafletMap)
    return leafletMap
}


export default setLeafletMap