import { useState } from "react"
import "./searchBar.scss"
import { userTypes } from "../../../utils/constants"

function SearchBar(){

    const [query,setQuery]=useState({
        minPrice:0,
        maxPrice:0,
        location:"",
        type:"buy"
    })

    function handleSwitch(userType){
        setQuery({...query,type:userType})
    }

    return(
        <div className="form-container">
        <div className="upper-portion">
            {userTypes.map(userType=><button className={`${query.type == userType ? "activeType" : "" }`} onClick={()=>handleSwitch(userType)}>{userType}</button>)}
        </div>
         <form>
            <input type="text" placeholder="City Location" />
            <input type="number" min={0} max={10000000000} placeholder="Min price"/>
            <input type="number" min={0} max={10000000000} placeholder="Max price"/>
            <button onClick={(e)=>e.preventDefault()}><img src="/search.png"></img></button>
    </form>
    </div>
    )
}

export default SearchBar