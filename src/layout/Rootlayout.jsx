import { Outlet } from "react-router-dom"
import NavBar from "../Components/NavBar/NavBar"
import "./layout.scss"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SocketContext } from "../Context/Socket";
import { useDispatch } from "react-redux";
import { increaseCount } from "../store/notificationSlice";

function RootLayout(){

    const socket=useContext(SocketContext)
    const queryClient=useQueryClient()
    const [connection,setConnection]=useState(navigator.onLine)
    const dispatch=useDispatch()

    useEffect(()=>{
        const offlineFn=()=>{
            setConnection(false)
        }
        window.addEventListener("offline",offlineFn)
        const onlineFn=()=>{
            setConnection(true)
        }
        window.addEventListener("online",onlineFn)
        return ()=>{
            removeEventListener("offline",offlineFn)
            removeEventListener("online",onlineFn)
        }
    },[])

    useEffect(()=>{
        socket?.on("receive-notification",(data)=>{
            if(queryClient.getQueryData(["chats"])){
                queryClient.setQueryData(["chats"],(chats)=>chats.map(chat=>chat?._id===data?.chatId ? {...chat,lastMessage:data?.message.content,messages:[...chat.messages,data?.message]} : chat))
            }
            if(queryClient.getQueryData(["chat",data.chatId])){
                queryClient.setQueryData(["chat",data.chatId],(chat)=>{return {...chat,messages:[...chat.messages,data.message]}})
            }
            dispatch(increaseCount(1))
        })

        return function (){
            socket?.off("receive-notification")
        } 
    },[socket])

    return(
        <>
        {!connection && <div className="network">Network connection failed it happens if you are not connected to a internet connection</div>}
        <div className="layout">
            <div className="header">
            <NavBar></NavBar>
            </div>
            <div className="content">
            <Outlet></Outlet>
            <ToastContainer></ToastContainer>
            </div>
        </div>
        </>
    )
}

export default RootLayout