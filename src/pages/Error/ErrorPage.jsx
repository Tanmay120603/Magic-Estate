import "./errorPage.scss"
import { Link } from "react-router-dom"

function ErrorPage(){
    return(
        <div className="error-container">
        <h1 className="error-header">404</h1>
        <p className="error-subHeader">Oops! Looks like you're lost.</p>
        <p className="error-link">Let's get you back <Link className="text-blue-500" to={"/"}>home</Link>.</p>
      </div>
    )
}

export default ErrorPage