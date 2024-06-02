import axios from "axios"
import {useState,useRef} from "react"
import getQueryParamString from "../../../utils/getQueryParamString"
import "./autoComplete.scss"
import {ClipLoader} from "react-spinners"

function AutoComplete({reqEndPoint,setFilterParams,filterParams}){

    const [autoCompleteAddressList,setAutoCompleteAddressList]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const searchFieldRef=useRef()


    function handleClick(e,autoCompleteAddress){
        setFilterParams({...filterParams,address:autoCompleteAddress?.address})
        searchFieldRef.current.value=autoCompleteAddress?.address
        setAutoCompleteAddressList([])
    }

    function handleCancel(){
        searchFieldRef.current.value=""
        setFilterParams({...filterParams,address:""})
        autoCompleteAddressList[0] && setAutoCompleteAddressList([])
    }

    const debounceComplete=function handleAutoComplete(){
        let timeOutId

        return function(e){
        if(e.target.value.length < 2) return autoCompleteAddressList[0] && setAutoCompleteAddressList([])
        if(timeOutId)clearTimeout(timeOutId)
        timeOutId=setTimeout(async()=>{
        setIsLoading(true)
        setFilterParams({...filterParams,[e.target.name]:e.target.value})
        try{
           const response=await axios.get(reqEndPoint+getQueryParamString({...filterParams,[e.target.name]:e.target.value}),{withCredentials:true})
           setAutoCompleteAddressList(response.data)
        }
        catch(err){
            console.log(err.message)
        }
        finally{
            setIsLoading(false)
        }
    },500)
    }
    }()

    return(
        <div className="input-autocomplete-container">
          <input ref={searchFieldRef} className="autoCompleteField" type="text" id="address" name="address" defaultValue={filterParams.address} placeholder="Address" onChange={debounceComplete} />
          {isLoading && <span className="loading-autocomplete"><ClipLoader size={16}></ClipLoader></span>}
          {filterParams.address && !isLoading && <span onClick={handleCancel} className="cancel-text">X</span>}
          <div className="autocomplete-container">
          {autoCompleteAddressList.map(autoCompleteAddress=><span key={autoCompleteAddress["_id"]} onClick={(e)=>handleClick(e,autoCompleteAddress)}>{autoCompleteAddress?.address}</span>)}
          </div>
        </div>
    )
}

export default AutoComplete