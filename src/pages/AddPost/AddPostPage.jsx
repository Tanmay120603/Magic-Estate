import {useContext,useState} from "react"
import getAddressFromLatAndLng from "../../utils/getAddressFromLatAndLng"
import { toast } from "react-toastify"
import { addPostInputFields, propertyTypes, userTypes,addPostInitialValues, petAllowance, utilitiesPolicy, depositPolicy } from "../../utils/constants"
import { useFormik,Form } from "formik"
import { addPostValidationSchema } from "../../utils/validationSchema"
import axios from "axios"
import "./addPostPage.scss"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { UserAuthContext } from "../../Context/UserAuth"
import {Loader,TextEditor,MapTiler,Select,UploadWidget} from "../../Components/"

function AddPostPage(){

    const [openSelectMap,setOpenSelectMap]=useState(false)
    const [locationDetails,setLocationDetails]=useState(null)
    const [showDialog,setShowDialog]=useState(false)
    const navigate=useNavigate()
    const {userAuth}=useContext(UserAuthContext)
    const queryClient=useQueryClient()
    const {errors,touched,handleChange,handleBlur,handleSubmit,values,isSubmitting,setSubmitting}=useFormik({initialValues:addPostInitialValues,onSubmit:(values)=>{
        handleAddPost(values)
    },validationSchema:addPostValidationSchema})

    async function handleAddPost(values){
        if(values.type==="buy")values.deposit=undefined
        if(!locationDetails){
            toast.error("Please set the address",{autoClose:2000})
            return setSubmitting(false)
        }
        try{
            const response=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/api/posts",{...values,...locationDetails})
            queryClient.invalidateQueries({queryKey:[userAuth.username,"createdPost"]})
            navigate(`/list/${response.data["postID"]}`)
        }
        catch(err){
            toast.error(err.response.data.message,{autoClose:2000})
        }
        finally{
            setSubmitting(false)
        }
    }

    async function handleDone(marker){
        setOpenSelectMap(false)
        setSubmitting(true)
        const {lng,lat}=marker.getLngLat()
        try{
        const res=await getAddressFromLatAndLng(lng,lat)
        setLocationDetails(res)
        setShowDialog(true)
        }
        catch(err){
            toast.error(`${err.message} is caused please select location again`,{autoClose:2000})
        }
        finally{
            setSubmitting(false)
        }
     }

     function handleEditorChange(value){
        values.desc=value
     }

     function handleDialogSubmit(e){
        if(locationDetails.address === "")return
        setShowDialog(false)
     }

     function setImages(imageUrl){
        values.images.push(imageUrl)
     }

    return(
        <div className="addPostPage-container">
        {isSubmitting && <Loader></Loader>}
        <Form onSubmit={handleSubmit} className="add-post-form">
            <div className="all-textField-container">
            {addPostInputFields.map((inputField,index)=><div key={index} className="addPost-inputField">
            <label htmlFor={inputField.id}>{inputField.labelText}</label>
            <input name={inputField.name} onChange={handleChange} onBlur={handleBlur} type={inputField.type} id={inputField.id}/>
            {touched[inputField.name] && errors[inputField.name] && <p className="addPost-error">{errors[inputField.name]}</p>}
            </div>)}
            </div>
            <div className="addPost-editor">    
            <label>Description</label>
            <TextEditor handleChange={handleEditorChange}></TextEditor>
            {errors["desc"] && touched["desc"] && <p className="addPost-error">{errors["desc"]}</p>}
            </div>

            <div className="select-container">
            
            <div className="addPost-select">
            <Select optionValues={userTypes} handleChange={handleChange} handleBlur={handleBlur} selectId={"type"} selectName={"type"} labelText={"Type"} defaultOption={"Please select type"}></Select>
            {errors["type"] && touched["type"] && <p className="addPost-error">{errors["type"]}</p>}
            </div>
            
            <div className="addPost-select">
            <Select optionValues={propertyTypes} handleChange={handleChange} handleBlur={handleBlur} selectId={"property"} selectName={"property"} labelText={"Property"} defaultOption={"Please select property type"}></Select>
            {errors["property"] && touched["property"] && <p className="addPost-error">{errors["property"]}</p>}
            </div>

            <div className="addPost-select">
            <Select optionValues={petAllowance} selectId={"petAllowance"} handleChange={handleChange} handleBlur={handleBlur} selectName={"petAllowance"} labelText={"Pet Allowance"} defaultOption={"Please select pet allowance"}></Select>
            </div>

            <div className="addPost-select">
            <Select optionValues={utilitiesPolicy} selectId={"utilities"} handleChange={handleChange} handleBlur={handleBlur} selectName={"utilities"} labelText={"Utilities Policy"} defaultOption={"Please select utilities policy"}></Select>
            </div>

            {values.type!=="buy" &&
            <div className="addPost-select"> 
            <Select optionValues={depositPolicy} selectId={"deposit"} handleChange={handleChange} handleBlur={handleBlur} selectName={"deposit"} labelText={"Deposit Policy"} defaultOption={"Please select deposit policy"}></Select>
            </div>
            }
            </div>
 
            {showDialog && <div className="dialog-container"><div className="dialog">
                <p>Success! Your address has been fetched successfullly, If you notice any inaccuracies please do the required modifications</p>
                <div className="textarea-container"><textarea defaultValue={locationDetails?.address} onChange={(e)=>setLocationDetails({...locationDetails,address:e.target.value})}></textarea>
                {!locationDetails?.address && <p>Address is a required field</p>}
                </div>
                <button onClick={handleDialogSubmit}>Save</button>
            </div>
            </div>}

            <div className="button-container">
            <UploadWidget widgetConfig={{cloudName:import.meta.env.VITE_CLOUD_NAME,uploadPreset:import.meta.env.VITE_UPLOAD_PRESET,
            multiple:true}} buttonText="Upload Images" setValue={setImages}></UploadWidget>
      
            <button type="button" onClick={()=>setOpenSelectMap(true)} className="addPostPage-button">Set Address</button>
            {openSelectMap && <MapTiler handleDone={handleDone}></MapTiler>}
            
            <button type="submit" className="addPostPage-button">Add Post</button>
            </div>

        </Form>
        <div className="right-addPost-section">
            <img src="/bg.png" alt="house-image"/>
        </div>
        </div>
    )
}

export default AddPostPage