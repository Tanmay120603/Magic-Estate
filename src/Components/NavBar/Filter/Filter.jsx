import { propertyTypes, userTypes } from "../../../utils/constants"
import "./filter.scss"

function Filter({list,setList,setFilters}){


    function handleChange(e){
        setFilters({[e.target.name]:e.target.value})
        if(!(e.target.value)){
            setList(list)
            return
        }
        setList(list.filter(item=>item.type===e.target.value))
    }


    return(
        <div className="filter-container">
            <h1>Search results for <span>London</span></h1>
            <div className="top-filter-section">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" placeholder="City Location" />
            </div>
            <div className="bottom-filter-section">
            <div>
            <label htmlFor="type">Type</label><select id="type" name="type" onChange={handleChange}>
                <option value="">any</option>
                {userTypes.map(userType=><option value={userType}>{userType}</option>)}
            </select>
            </div>
            <div>
            <label htmlFor="property">Property</label><select id="property">
                <option value="">any</option>
                {propertyTypes.map(propertyType=><option value={propertyType}>{propertyType}</option>)}
            </select>
            </div>
            <div>
            <label htmlFor="minPrice">Min Price</label>
            <input type="number" id="minPrice" placeholder="any" min={0} max={10000000000} />
            </div>
            <div>
            <label htmlFor="maxPrice">Max Price</label>
            <input type="number" id="maxPrice" placeholder="any" min={0} max={10000000000} />
            </div>
            <div>
            <label htmlFor="bedroom">Bedroom</label>
            <input type="number" id="bedroom" placeholder="any" min={0} max={10000000000} />
            </div>
            <button><img src="/search.png"></img></button>
            </div>
        </div>
    )
}

export default Filter