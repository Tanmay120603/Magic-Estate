import "./registerPage.scss";
import axios from "axios"
import ValidationForm from "../../Components/NavBar/ValidationForm/ValidationForm"
import { registerUserInputFields } from "../../utils/constants"
import { useContext, useState } from "react"
import { registerUserValidationSchema } from "../../utils/validationSchema"
import { UserAuthContext } from "../../Context/UserAuth"
import { useLocation, useNavigate } from "react-router-dom"

function RegisterPage(){

    const [errMsg,setErrMsg]=useState()
    const {updateUser}=useContext(UserAuthContext)
    const {state}=useLocation()
    const navigate=useNavigate()

    async function handleRegistration(values){
        setErrMsg()
        try{
            const response=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/api/auth/register",values,{withCredentials:true})
            updateUser(response.data)
            navigate(state || "/",{replace:true})    
        }
        catch(err){
            setErrMsg(err.response.data.message)
        }
    }

    return(
        <div className="register-container">
            <div className="left-register-section">
            <ValidationForm inputFields={registerUserInputFields} initialValues={{username:"",password:"",email:""}} handleSubmitApiRequest={handleRegistration} buttonText={"Register"} validationSchema={registerUserValidationSchema}></ValidationForm>
            {errMsg && <p className="register-error">{errMsg}</p>}
            </div>
            <div className="right-register-section">
                <img src="/bg.png" alt="house-image"/>
            </div>
        </div>
    )
}

export default RegisterPage