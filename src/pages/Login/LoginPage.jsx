import { loginUserInputFields } from "../../utils/constants"
import { loginUserValidationSchema } from "../../utils/validationSchema"
import {ValidationForm} from "../../Components/"
import "./loginPage.scss"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext, useState } from "react"
import { UserAuthContext } from "../../Context/UserAuth"

function LoginPage(){

    const [errMsg,setErrMsg]=useState()
    const {updateUser}=useContext(UserAuthContext)
    const {state}=useLocation()
    const navigate=useNavigate()

    async function handleLogin(values){
        setErrMsg()
        try{
            const response=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/api/auth/login",values)
            updateUser(response.data["_doc"])
            navigate(state || "/",{replace:true})
        }
        catch(err){
            setErrMsg(err.response.data.message)
        }
    }

    return(
    <div className="login-container">
        <div className="left-login-section">
        <ValidationForm inputFields={loginUserInputFields} initialValues={{username:"",password:""}} handleSubmitApiRequest={handleLogin} buttonText={"Login"} validationSchema={loginUserValidationSchema} ></ValidationForm>
        {errMsg && <p className="login-error">{errMsg}</p>}
        </div>
        <div className="right-login-section">
            <img src="/bg.png" alt="house-image" />
        </div>
    </div>
    )
}

export default LoginPage