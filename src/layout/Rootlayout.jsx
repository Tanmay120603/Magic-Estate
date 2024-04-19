import { Outlet } from "react-router-dom"
import NavBar from "../Components/NavBar/NavBar"
import "./layout.scss"

function RootLayout(){
    return(
        <div className="layout">
            <div className="header">
            <NavBar></NavBar>
            </div>
            <div className="content">
            <Outlet></Outlet>
            </div>
        </div>
    )
}

export default RootLayout