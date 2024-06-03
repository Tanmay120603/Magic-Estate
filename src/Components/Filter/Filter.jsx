import { propertyTypes, userTypes } from "../../utils/constants"
import { useQueryClient } from "@tanstack/react-query"
import "./filter.scss"
import { toast } from "react-toastify"
import { useState } from "react"
import AutoComplete from "../AutoComplete/AutoComplete"

function Filter({filterParams,setFilterParams,setSearchParams}){
    const queryClient=useQueryClient()
    const [searchedAddress,setSearchedAddress]=useState(filterParams.address)

    function handleChange(e){
        setFilterParams({...filterParams,[e.target.name]:e.target.value})
    }    

    function handleSearch(e){
        e.preventDefault()
        if(filterParams.minPrice > filterParams.maxPrice)return toast.error("Min price can't be greater than max price",{autoClose:2000})
        setSearchedAddress(filterParams.address)
        setSearchParams(filterParams)
        queryClient.invalidateQueries({queryKey:["posts"]})
    }

    return(
        <form className="filter-container" onSubmit={handleSearch}>
            <h1>Search results for <span>{searchedAddress || "N/A"}</span></h1>
            <div className="top-filter-section">
            <label htmlFor="address">Address</label>
            <AutoComplete filterParams={filterParams} setFilterParams={setFilterParams} reqEndPoint={import.meta.env.VITE_SERVER_ENDPOINT+"api/posts/autocomplete"}></AutoComplete>
            </div>
            <div className="bottom-filter-section">
            <div>
            <label htmlFor="type">Type</label>
            <select id="type" name="type" onChange={handleChange} defaultValue={filterParams.type}>
                <option value="">any</option>
                {userTypes.map((userType,index)=><option key={index} value={userType}>{userType}</option>)}
            </select>
            </div>
            <div>
            <label htmlFor="property">Property</label><select id="property" defaultValue={filterParams.property} name="property" onChange={handleChange}>
                <option value="">any</option>
                {propertyTypes.map((propertyType,index)=><option key={index} value={propertyType}>{propertyType}</option>)}
            </select>
            </div>
            <div>
            <label htmlFor="minPrice">Min Price</label>
            <input type="number" name="minPrice" id="minPrice" placeholder="any" defaultValue={filterParams.minPrice} min={0} max={10000000000} onChange={handleChange} />
            </div>
            <div>
            <label htmlFor="maxPrice">Max Price</label>
            <input type="number" id="maxPrice" name="maxPrice" placeholder="any" defaultValue={filterParams.maxPrice} min={0} max={10000000000} onChange={handleChange} />
            </div>
            <div>
            <label htmlFor="bedroom">Bedroom</label>
            <input type="number" name="bedroom" id="bedroom" placeholder="any" defaultValue={filterParams.bedroom} min={0} max={10000000000} onChange={handleChange} />
            </div>
            <button onClick={handleSearch}><img src="/search.png"></img></button>
            </div>
        </form>
    )
}

export default Filter