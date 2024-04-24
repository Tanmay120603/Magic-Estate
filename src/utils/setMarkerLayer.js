import {marker,layerGroup,icon} from "leaflet"
import getPopupContent from "./getPopupContent"
import { buyMarkerUrl, rentMarkerUrl } from "./constants"

function setMarkerLayer(list,leafletMap){
    const buyMarkerArr=[]
    const rentMarkerArr=[]
    const layerArr=[]
    const buyIcon=icon({iconUrl:buyMarkerUrl,iconSize:[30,30]})
    const rentIcon=icon({iconUrl:rentMarkerUrl,iconSize:[30,30]})

    list?.map(item=>{
        switch(item.type){
            case "buy":
                buyMarkerArr.push(marker([item.latitude,item.longitude],{icon:buyIcon}).bindPopup(getPopupContent(item)))
                break
            case "rent":
                rentMarkerArr.push(marker([item.latitude,item.longitude],{icon:rentIcon}).bindPopup(getPopupContent(item)))
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