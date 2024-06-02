import { useContext } from "react"
import { decreaseCount } from "../../../store/notificationSlice"
import { useDispatch } from "react-redux"
import { SocketContext } from "../../../Context/Socket"
import { UserAuthContext } from "../../../Context/UserAuth"
import { useQueryClient } from "@tanstack/react-query"

function Message({_id:chatId,users,messages,setChatId,lastMessage}){

    const dispatch=useDispatch()
    const queryClient=useQueryClient()
    const socket=useContext(SocketContext)
    const {userAuth}=useContext(UserAuthContext)
    const receiver=users[0]
    const notificationCount=+messages.length

    function handleOpenChat(){
        socket.emit("chat-connected",{chatId,userId:userAuth?._id})
        setChatId(chatId)
        queryClient.setQueryData(["chats"],(chats)=>chats.map(chat=>chat?._id===chatId ? {...chat,messages:[]} : chat))
        dispatch(decreaseCount(notificationCount))
    }

    return(
        <div className="message-container" onClick={handleOpenChat}>
        <img src={receiver.avatar} alt="avatar-image" />
        <span>{receiver.username}</span>
        <p>{lastMessage}</p>
        {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
    </div>
    )
}

export default Message