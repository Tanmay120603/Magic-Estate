import { Link } from "react-router-dom"
import "./navBar.scss"
import { useContext, useEffect, useState } from "react"
import {UserAuthContext} from "../../Context/UserAuth"
import { useDispatch,useSelector} from "react-redux"
import { setCount } from "../../store/notificationSlice"
import { toast } from "react-toastify"
import axios from "axios"

function NavBar(){

    const [openSideBar,setOpenSideBar]=useState(false)
    const {userAuth}=useContext(UserAuthContext)
    const dispatch=useDispatch()
    const notificationsCount=useSelector(state=>state.unreadNotifications)

    useEffect(()=>{
        if(!userAuth)return
        async function getNotificationCount(){
            try{
                const response=await axios.get(import.meta.env.VITE_SERVER_ENDPOINT+"/api/messages/unread/count",{withCredentials:true})
                dispatch(setCount(response.data))
            }catch(err){
                toast.error("Something went wrong",{autoClose:2000})
            }
        }
        getNotificationCount()
    },[userAuth])

    return(
            <nav>
                <div className="left-nav">
                    <Link to='/'><div className="logo">
                        <img src="/logo.png" alt="logo"></img>
                        <span>MagicEstate</span>
                    </div>
                    </Link>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/list"}>Property</Link>
                    <Link to={"/about"}>About</Link>
                </div>
                <div className="right-nav">
                    
                    {userAuth ? <div className="logged-user">
                        <Link to={"/profile"}><img className="user-image" src={userAuth.avatar} alt="avatar-image" /></Link>
                        <span>{userAuth.username}</span>
                        <Link to={"/profile"} className="link-css">Profile{notificationsCount > 0 && <span className="notification">{notificationsCount}</span>}</Link>
                    </div> : <><Link to={"/login"}>Sign in</Link>
                    <Link className="link-css" to={"/register"}>Sign up</Link></>}


                    <div className="hamburger-menu" onClick={()=>setOpenSideBar(!openSideBar)}>
                        <img src="/menu.png" alt="menu" />
                    </div>
                    <div className="menu-list" style={{right:openSideBar ? "0%" : "-50%"}}>
                    {userAuth ? 
                    <>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/list"}>Property</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/profile"}>Profile{notificationsCount > 0 && <span className="notification">{notificationsCount}</span>}</Link>
                    </>  :
                    <>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/list"}>Property</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/login"}>Sign in</Link>
                    <Link to={"/register"}>Sign up</Link>
                    </>}
                    </div>
                </div>
            </nav>
    )
}

export default NavBar