import { Link } from "react-router-dom"
import "./navBar.scss"
import { useState } from "react"

function NavBar(){

    const [openSideBar,setOpenSideBar]=useState(false)

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
                    <Link to={"/"}>Sign in</Link>
                    <Link className="sign-up" to={"/"}>Sign up</Link>
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