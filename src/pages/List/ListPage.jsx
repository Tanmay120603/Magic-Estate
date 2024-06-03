import { useState } from "react"
import "./listPage.scss"
import { popup } from "leaflet"
import getPopupContent from "../../utils/getPopupContent"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ShimmerPostList } from "react-shimmer-effects"
import getQueryParamString from "../../utils/getQueryParamString"
import { useSearchParams } from "react-router-dom"
import {Card,Filter,Map,Loader} from "../../Components/"

function ListPage(){
    
    const [searchParams,setSearchParams]=useSearchParams()
    const [filterParams,setFilterParams]=useState(Object.fromEntries(searchParams.entries()))
    const [map,setMap]=useState()
    const {isPending,error,data:posts,isFetching}=useQuery({
        queryKey:["posts"],
        queryFn:async()=>{
            const filterQuery=getQueryParamString(filterParams)
            const response=await axios.get(import.meta.env.VITE_SERVER_ENDPOINT+"/api/posts"+filterQuery)
            return response.data
        },staleTime:0
    })

    function handleFlyToHouse(houseData){
        const lat=houseData.latitude
        const long=houseData.longitude
        map.flyTo([lat,long],14,{duration:3})
        setTimeout(()=>{
            popup({offset:[0,-8]}).setLatLng([lat,long]).setContent(getPopupContent(houseData)).openOn(map)
        },3000)
    }

    if(isPending)return<ShimmerPostList></ShimmerPostList>

    if(error)return<div>{error.response.data.message}</div>

    return(
        <>
        {isFetching && <Loader></Loader>}
        <div className="listPage-container">
            <div className="listContainer">
                <div className="wrapper">
                <Filter list={posts} filterParams={filterParams} setSearchParams={setSearchParams} setFilterParams={setFilterParams}></Filter>
                {posts.length==0 && <div className="no-result-container">
                    <img src="/no-results.png" alt="no-results"/>
                    <span>No match found</span>
                </div>}  
                {posts.map(post=><Card handleFlyToHouse={handleFlyToHouse} key={post["_id"]} {...post}></Card>)}
                </div>
            </div>
            <div className="mapContainer">
                <Map List={posts} map={map} setMap={setMap}></Map>
            </div>
        </div>
        </>
    )
}

export default ListPage