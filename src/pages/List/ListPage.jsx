import Card from "../../Components/NavBar/Card/Card"
import Filter from "../../Components/NavBar/Filter/Filter"
import Map from "../../Components/NavBar/Map/Map"
import { listData } from "../../data/dummyData"
import { useState } from "react"
import "./listPage.scss"
import { popup } from "leaflet"
import getPopupContent from "../../utils/getPopupContent"

function ListPage(){
    
    const [map,setMap]=useState()
    const [filters,setFilters]=useState({type:""})
    const [list,setList]=useState(listData)

    function handleFlyToHouse(houseData){
        const lat=houseData.latitude
        const long=houseData.longitude
        map.flyTo([lat,long],14,{duration:3})
        setTimeout(()=>{
            popup({offset:[0,-8]}).setLatLng([lat,long]).setContent(getPopupContent(houseData)).openOn(map)
        },3000)
    }

    return(
        <div className="listPage-container">
            <div className="listContainer">
                <div className="wrapper">
                <Filter list={listData} setList={setList} setFilters={setFilters}></Filter>
                {list.map(data=><Card handleFlyToHouse={handleFlyToHouse} key={data.id} {...data}></Card>)}
                </div>
            </div>
            <div className="mapContainer">
                <Map List={list} map={map} filters={filters} setMap={setMap}></Map>
            </div>
        </div>
    )
}

export default ListPage