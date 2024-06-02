import {marker,layerGroup,icon} from "leaflet"
import getPopupContent from "./getPopupContent"
import { buyMarkerUrl, rentMarkerUrl } from "./constants"

function setMarkerLayer(list,leafletMap){
    const buyMarkerArr=[]
    const rentMarkerArr=[]
    const layerArr=[]
    const buyIcon=icon({iconUrl:buyMarkerUrl,iconSize:[30,30]})
    const rentIcon=icon({iconUrl:rentMarkerUrl,iconSize:[30,30]})

    if(!leafletMap)return[]

    list?.map(item=>{
        switch(item.type){
            case "buy":
                const buyMarker=marker([item.latitude,item.longitude],{icon:buyIcon})
                item.img && buyMarker.bindPopup(getPopupContent(item))
                buyMarkerArr.push(buyMarker)
                break
            case "rent":
                const rentMarker=marker([item.latitude,item.longitude],{icon:rentIcon})
                item.img && rentMarker.bindPopup(getPopupContent(item))
                rentMarkerArr.push(rentMarker)
                break
        }
    })
    if(+buyMarkerArr.length > 0){
        const buyMarkerLayer=layerGroup(buyMarkerArr)
        buyMarkerLayer.addTo(leafletMap)
        layerArr.push(buyMarkerLayer)
    }

    if(+rentMarkerArr.length > 0){
        const rentMarkerLayer=layerGroup(rentMarkerArr)
        rentMarkerLayer.addTo(leafletMap)
        layerArr.push(rentMarkerLayer)
    }

    return layerArr
}

export default setMarkerLayer