import { useQuery, useQueryClient } from "@tanstack/react-query"
import "./chat.scss"
import TimeAgo from 'react-timeago'
import axios from "axios"
import { ShimmerCircularImage, ShimmerTitle } from "react-shimmer-effects"
import { useContext, useEffect, useRef, useState } from "react"
import { UserAuthContext } from "../../Context/UserAuth"
import { toast } from "react-toastify"
import { SocketContext } from "../../Context/Socket"

function Chat({chatId,setChatId}){

    const lastMessageRef=useRef()
    const {userAuth}=useContext(UserAuthContext)
    const queryClient=useQueryClient()
    const textBoxRef=useRef()
    const [typing,setTyping]=useState(false)
    const [isTyping,setIsTyping]=useState(false)
    const [timeOutId,setTimeOutId]=useState()
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
        socket.on("receive-message",async(messageObj)=>{
            queryClient.setQueryData(["chat",chatId],(chat)=>{return{...chat,messages:[...chat.messages,messageObj]}})
            queryClient.setQueryData(["chats"],(chats)=>chats.map(chat=>chat["_id"]===chatId ? {...chat,lastMessage:messageObj.content} : chat))
        })
        socket.on("user-typing",()=>{
            setTyping(true)
        })
        socket.on("user-typing-stop",()=>{
            setTyping(false)
        })
        return function(){
            socket.off("receive-message")
            socket.off("user-typing")
            socket.off("user-typing-stop")
            socket.emit("close-chat",{userId:userAuth?._id})
        }      
    },[])

    function handleClose(){
        setChatId(null)
    }

    function stopTypingTimer(){
        setIsTyping(false)
        socket.emit("stop-typing",{chatId,receiverId:chatDetails.receiver?._id})
    }

    async function handleSend(e){
        e.preventDefault()
        const message=textBoxRef.current.value
        textBoxRef.current.value=""
        const messageObj={receiverId:chatDetails.receiver?._id,content:message,chatId,createdAt:Date.now()}
        try{
            const response=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/api/messages/",messageObj)
            queryClient.setQueryData(["chat",chatId],{...chatDetails,messages:[...chatDetails.messages,response.data]})
            queryClient.setQueryData(["chats"],(chats)=>chats.map(chat=>chat["_id"]===chatId ? {...chat,lastMessage:message} : chat))
            stopTypingTimer()
            clearTimeout(timeOutId)
            socket.emit("send-message",{chatId,senderId:userAuth?._id,messageObj:{...messageObj,messageId:response.data?._id}})
        }
        catch(err){
            toast.error(err.message,{autoClose:2000})
        }
    }

         function typingHandler(){
            if(timeOutId)clearTimeout(timeOutId)
            if(!isTyping){
                setIsTyping(true)
                socket.emit("typing",{chatId,receiverId:chatDetails.receiver?._id})
            }
            const id=setTimeout(()=>{
                stopTypingTimer()
            },2000)
            setTimeOutId(id)
        }

    if(error){
        return <div>{error.message}</div>
    }

    return(
        <div className="chat-window" style={{display:chatId ? "block":"none"}}>
            {isFetching ? <div className="top-section"><ShimmerCircularImage center={true} size={40}></ShimmerCircularImage></div> : <div className="top-section">
                <div>
                <img src={chatDetails.receiver?.avatar} alt="avatar-image" />
                </div>
                <div className="username-typing-container">
                <span>{chatDetails.receiver?.username}</span>
                {typing && <span className="typing">Typing...</span>}
                </div>
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
                <textarea ref={textBoxRef} name="message" onChange={typingHandler}></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default Chat