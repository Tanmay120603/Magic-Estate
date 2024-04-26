import { Link } from "react-router-dom"
import "./navBar.scss"
import { useState } from "react"
import { userData } from "../../data/dummyData";

function NavBar(){

    const [openSideBar,setOpenSideBar]=useState(false)
    const user=true;

    return(
            <nav>
                <div className="left-nav">
                    <div className="logo">
                        <img src="/logo.png" alt="logo"></img>
                        <span>MagicEstate</span>
                    </div>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/"}>About</Link>
                    <Link to={"/"}>Contact</Link>
                    <Link to={"/"}>Agents</Link>
                </div>
                <div className="right-nav">
                    {user ? <div className="logged-user">
                        <img className="user-image" src={userData.img} alt="avatar-image" />
                        <span>{userData.name}</span>
                        <Link to={"/profile"} className="link-css">Profile<span className="notification">3</span></Link>
                    </div> : <><Link to={"/"}>Sign in</Link>
                    <Link className="link-css" to={"/"}>Sign up</Link></>}
                    <div className="hamburger-menu" onClick={()=>setOpenSideBar(!openSideBar)}>
                        <img src="/menu.png" alt="menu" />
                    </div>
                    <div className="menu-list" style={{right:openSideBar ? "0%" : "-50%"}}>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/"}>About</Link>
                    <Link to={"/"}>Contact</Link>
                    <Link to={"/"}>Agents</Link>
                    <Link to={"/"}>Sign in</Link>
                    <Link to={"/"}>Sign up</Link>
                    </div>
                </div>
            </nav>
    )
}

export default NavBar