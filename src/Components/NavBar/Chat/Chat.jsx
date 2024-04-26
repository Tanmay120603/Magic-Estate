import { useState } from "react"
import { userData } from "../../../data/dummyData"
import "./chat.scss"

function Chat(){
    const [openChat,setOpenChat]=useState(true)
    function handleClose(){
        setOpenChat(false)
    }
    return(
        <div className="chat-window" style={{display:openChat ? "block":"none"}}>
            <div className="top-section">
                <img src={userData.img} alt="avatar-image" />
                <span>{userData.name}</span>
                <button onClick={handleClose}>X</button>
            </div>
            <div className="chat-messages">
                {new Array(10).fill(0,0).map((item,index)=><div className="chat-message" style={{alignSelf:index%2==0 ? "flex-end":"flex-start"}}>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>)}
            </div>
            <form className="chat-form">
                <textarea name="" id=""></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default Chat