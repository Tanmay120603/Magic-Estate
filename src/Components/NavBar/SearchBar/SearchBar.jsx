import "./searchBar.scss"
import { userTypes } from "../../../utils/constants"
import { useNavigate, useSearchParams } from "react-router-dom"
import getQueryParamString from "../../../utils/getQueryParamString"
import { toast } from "react-toastify"

function SearchBar(){

    const [searchParams,setSearchParams]=useSearchParams({
        minPrice:0,
        maxPrice:0,
        address:"",
        type:"buy"
    })
    const navigate=useNavigate()
    const searchParamsObj=Object.fromEntries(searchParams.entries())

    function handleSwitch(userType){
        setSearchParams({...searchParamsObj,type:userType})
    }

    function handleChange(e){
        setSearchParams({...searchParamsObj,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        if(searchParamsObj.minPrice > searchParamsObj.maxPrice)return toast.error("Min price can't be greater than max price",{autoClose:2000})
        navigate(`/list${getQueryParamString(searchParamsObj)}`)
    }

    return(
        <div className="form-container">
        <div className="upper-portion">
            {userTypes.map((userType,index)=><button key={index} className={`${searchParams.get("type") == userType ? "activeType" : "" }`} onClick={()=>handleSwitch(userType)}>{userType}</button>)}
        </div>
         <form onSubmit={handleSubmit}>
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="number" name="minPrice" min={0} max={10000000000} placeholder="Min price" onChange={handleChange}/>
            <input type="number" name="maxPrice" min={0} max={10000000000} placeholder="Max price" onChange={handleChange}/>
            <button><img src="/search.png"></img></button>
    </form>
    </div>
    )
}

export default SearchBar