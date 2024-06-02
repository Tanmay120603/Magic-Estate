import { useContext } from "react"
import { UserAuthContext } from "../../Context/UserAuth"
import { Navigate } from "react-router-dom"

function RequireAuth({children}){
    const {userAuth}=useContext(UserAuthContext)

    if(!userAuth){
        return <Navigate to={"/register"} state={location.pathname}></Navigate>
    }

    return(
        <>
            {children}
        </>
    )
}

export default RequireAuth