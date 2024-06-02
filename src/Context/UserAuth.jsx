import { createContext, useState } from "react"

const UserAuthContext=createContext()

function UserAuth({children}){
    const [userAuth,setUserAuth]=useState(JSON.parse(localStorage.getItem("user")))

    function updateUser(userDetails){
        setUserAuth(userDetails)
        localStorage.setItem("user",JSON.stringify(userDetails))
    }

    return(
        <UserAuthContext.Provider value={{userAuth,updateUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}

export {UserAuth,UserAuthContext}