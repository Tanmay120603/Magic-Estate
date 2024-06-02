import { toast } from "react-toastify";

function getCurrentLocation(setAccessLocation,setLoading){
    function success(position){
        const longitude=position.coords.longitude
        const latitude=position.coords.latitude
        setAccessLocation([longitude,latitude])
        setLoading(false)
    }

    function error(){
       setAccessLocation(null)
       toast.error(`You have denied the location access`,{autoClose:2000})
       setLoading(false)
    }

    if(!navigator.geolocation){
         setAccessLocation(null)
         toast.error("Your browser doesn't support current location feature",{autoClose:2000})
         setLoading(false)
    }
    else{
        navigator.geolocation.getCurrentPosition(success,error,{enableHighAccuracy:true})
    }
}

export default getCurrentLocation