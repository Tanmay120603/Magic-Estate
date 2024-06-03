import { useRef,useEffect } from "react"
import "./uploadWidget.scss";

function UploadWidget({setValue,widgetConfig,buttonText="Upload"}){
    const cloudinaryRef=useRef()
    const uploadRef=useRef()

    useEffect(()=>{
        cloudinaryRef.current=window.cloudinary
        uploadRef.current=cloudinaryRef.current?.createUploadWidget(widgetConfig,function(error,result){
            if(!error && result.event==="success"){
                setValue(result.info.secure_url)
            }
        })
    },[])

    return(
        <>
            <button type="button" className="upload-button" onClick={()=>uploadRef.current.open()}>{buttonText}</button>
        </>
    )
}

export default UploadWidget