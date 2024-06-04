import "./updateProfilePage.scss";
import { useContext, useState } from "react"
import { ValidationForm,UploadWidget } from "../../Components";
import { UserAuthContext } from "../../Context/UserAuth"
import { updateProfileInputFields } from "../../utils/constants"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { updateProfileValidationSchema } from "../../utils/validationSchema"

function UpdateProfilePage(){

    const {userAuth,updateUser}=useContext(UserAuthContext)
    const [avatar,setAvatar]=useState(userAuth.avatar)
    const navigate=useNavigate()

    async function handleUpdateUser(values){
        try{
          const res=await axios.patch(import.meta.env.VITE_SERVER_ENDPOINT+`/api/users/${userAuth["_id"]}`,{...values,avatar})
          updateUser(res.data["_doc"])
          navigate("/profile")
        }
        catch(err){
            toast.error(err.response.data.message,{autoClose:2000})
        }
    }

    return(
        <div className="update-profilePage-container">
            <div className="left-section">
            <ValidationForm initialValues={{username:userAuth.username,email:userAuth.email}} inputFields={updateProfileInputFields} buttonText={"Update"} handleSubmitApiRequest={handleUpdateUser} validationSchema={updateProfileValidationSchema}></ValidationForm>
        </div>
        <div className="right-section">
        <div className="avatar-container">
        <img src={avatar} alt="avatar-image"/>
        </div>
        <UploadWidget buttonText={"Change Avatar"} setValue={setAvatar} widgetConfig={{
            cloudName:import.meta.env.VITE_CLOUD_NAME,
            uploadPreset:import.meta.env.VITE_UPLOAD_PRESET,
            multiple:false
        }}></UploadWidget>    
        </div>
        </div>
    )
}

export default UpdateProfilePage