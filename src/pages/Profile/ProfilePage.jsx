import { Link, useLocation, useNavigate } from "react-router-dom"
import "./profilePage.scss"
import { useContext, useState } from "react"
import { UserAuthContext } from "../../Context/UserAuth"
import axios from "axios"
import { toast } from "react-toastify"
import {Message,Chat,List} from "../../Components/"
import { useQuery, useQueryClient } from "@tanstack/react-query"

function ProfilePage(){
    const {userAuth,updateUser}=useContext(UserAuthContext)
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {state}=useLocation()
    const [isLoading,setIsLoading]=useState(false)
    const [chatId,setChatId]=useState(state)
    const {data:chats,isFetching,error}=useQuery({queryKey:["chats"],queryFn:async()=>{
        const response=await axios.get(import.meta.env.VITE_SERVER_ENDPOINT+"/api/chats",{withCredentials:true})
        return response.data
    }})

    async function handleLogout(){
        setIsLoading(true)
        try{
        await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/api/auth/logout",{message:"Try for loggout"},{withCredentials:true})
        updateUser(null)
        queryClient.invalidateQueries(["chats"])
        queryClient.invalidateQueries(["chat"])
        navigate("/")
        }
        catch{
            toast.error('Something went wrong',{autoClose:1500});
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <div className="profile-page-container">
            <div className="user-related-container">
                <div className="wrapper">
                <div className="user-info">
                    <div className="top-section">
                        <h2>User Information</h2>
                        <Link to={"/update/profile"} className="link-css">Update Profile</Link>
                    </div>
                    <div className="bottom-section">
                        <div>Avatar: <img src={userAuth.avatar } alt="avatar-image"/></div>
                        <div>Username: <span>{userAuth.username}</span></div>
                        <div>E-mail: <span>{userAuth.email}</span></div>
                        <button onClick={handleLogout}>{isLoading ? "loading.." : "Logout"}</button>
                    </div>
                </div>
                <div className="my-list">
                    <div className="top-section">
                        <h2>My List</h2>
                        <Link to="/add/post" className="link-css">Create New Post</Link>
                    </div>
                        <List requestEndpoint={import.meta.env.VITE_SERVER_ENDPOINT+"/api/users/post/created"} queryKey={[userAuth.username,"createdPost"]}></List>
                </div>
                <div className="saved-list">
                    <h2 className="saved-list-header">Saved List</h2>
                    <List requestEndpoint={import.meta.env.VITE_SERVER_ENDPOINT+"/api/users/post/saved"} queryKey={[userAuth.username,"savedPost"]}></List>
                </div>
                </div>
            </div>
            <div className="chat-related-container">
                <div className="messages-container">
                    <div className="message-heading"><h1>Messages</h1></div>
                    {isFetching ? <span>Loading</span> : chats?.map(chat=><Message key={chat["_id"]} setChatId={setChatId} {...chat}></Message>)}
                </div>
                {chatId && <Chat chatId={chatId} setChatId={setChatId}></Chat>}
            </div>
        </div>
    )
}

export default ProfilePage