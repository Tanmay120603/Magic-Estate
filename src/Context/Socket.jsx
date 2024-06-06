import { createContext,useContext,useEffect, useState } from "react"
import {io} from "socket.io-client"
import { UserAuthContext } from "./UserAuth"

export const SocketContext=createContext()

function Socket({children}){
    const {userAuth}=useContext(UserAuthContext)
    const [socketObj,setSocketObj]=useState()
    const socket=io(import.meta.env.VITE_SERVER_ENDPOINT)

    useEffect(()=>{
        const socketDisconnect=function(){
            socket.emit("user-disconnect",userAuth?._id)
            socket.disconnect()
        }
        socket.on("connect",()=>{
            setSocketObj(socket)
            socket.emit("user-connected",{socketId:socket.id,userId:userAuth._id})
        })
        
        window.addEventListener("beforeunload",socketDisconnect)

        return ()=>{
            console.log("User Disconnected")
            socketDisconnect()
            window.removeEventListener("beforeunload",socketDisconnect)
        }
    },[])

    return(
        <SocketContext.Provider value={socketObj}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket