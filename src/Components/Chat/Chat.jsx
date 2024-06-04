import { useQuery, useQueryClient } from "@tanstack/react-query"
import "./chat.scss"
import TimeAgo from 'react-timeago'
import axios from "axios"
import { ShimmerCircularImage, ShimmerTitle } from "react-shimmer-effects"
import { useContext, useEffect, useRef } from "react"
import { UserAuthContext } from "../../Context/UserAuth"
import { toast } from "react-toastify"
import { SocketContext } from "../../Context/Socket"

function Chat({chatId,setChatId}){

    const lastMessageRef=useRef()
    const {userAuth}=useContext(UserAuthContext)
    const queryClient=useQueryClient()
    const textBoxRef=useRef()
    const socket=useContext(SocketContext)

    const {data:chatDetails,isFetching,error}=useQuery({queryKey:["chat",chatId],queryFn:async()=>{
        const response=await axios.patch(import.meta.env.VITE_SERVER_ENDPOINT+`/api/chats/${chatId}`,{})
        response.data.receiver=response.data.users[0]
        return response.data }})

    useEffect(()=>{
        if(!chatDetails)return
        lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
    },[chatDetails])


    useEffect(()=>{
        socket.on("receive-message",({message})=>{
            queryClient.setQueryData(["chat",chatId],(chat)=>{return{...chat,messages:[...chat.messages,message]}})
            queryClient.setQueryData(["chats"],(chats)=>chats.map(chat=>chat["_id"]===chatId ? {...chat,lastMessage:message.content} : chat))
        })
        return function(){
            socket.off("receive-message")
            socket.emit("close-chat",{userId:userAuth?._id})
        }
    },[])

    function handleClose(){
        setChatId(null)
    }

    async function handleSend(e){
        e.preventDefault()
        const message=textBoxRef.current.value
        textBoxRef.current.value=""
        const messageObj={receiverId:chatDetails.receiver["_id"],content:message,chatId,createdAt:Date.now()}
        try{
            const response=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/api/messages/",messageObj)
            queryClient.setQueryData(["chat",chatId],{...chatDetails,messages:[...chatDetails.messages,response.data]})
            queryClient.setQueryData(["chats"],(chats)=>chats.map(chat=>chat["_id"]===chatId ? {...chat,lastMessage:message} : chat))
            socket.emit("send-message",{chatId,receiverId:chatDetails.receiver?._id,messageObj:{...messageObj,messageId:response.data?._id}})
        }
        catch(err){
            toast.error(err.message,{autoClose:2000})
        }
    }

    if(error){
        return <div>{error.message}</div>
    }

    return(
        <div className="chat-window" style={{display:chatId ? "block":"none"}}>
            {isFetching ? <div className="top-section"><ShimmerCircularImage center={true} size={40}></ShimmerCircularImage></div> : <div className="top-section">
                <img src={chatDetails.receiver?.avatar} alt="avatar-image" />
                <span>{chatDetails.receiver?.username}</span>
                <button onClick={handleClose}>X</button>
            </div>}
            <div className="chat-messages">
                {isFetching ? <div className="shimmer-message-container">
                <ShimmerTitle line={1} gap={15} variant="secondary" className="shimmer-message"/>
                <ShimmerTitle line={1} gap={15} variant="secondary" className="shimmer-message sender"/>
                <ShimmerTitle line={1} gap={15} variant="secondary" className="shimmer-message"/>
                <ShimmerTitle line={1} gap={15} variant="secondary" className="shimmer-message sender"/>
                <ShimmerTitle line={1} gap={15} variant="secondary" className="shimmer-message"/>
                <ShimmerTitle line={1} gap={15} variant="secondary" className="shimmer-message sender"/>
                </div>  : chatDetails?.messages.map((message)=><div ref={lastMessageRef} key={message["_id"]} className="chat-message" style={{alignSelf: message.senderId==userAuth["_id"] ? "flex-end":"flex-start"}}>
                    <p>{message.content}</p>
                    <span><TimeAgo date={message.createdAt}></TimeAgo></span>
                </div>)}
            </div>
            <form className="chat-form" onSubmit={handleSend}>
                <textarea ref={textBoxRef} name="message"></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default Chat