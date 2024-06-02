import { Link, useNavigate } from "react-router-dom"
import "./card.scss"

function Card({_id,title,images,bedroom,bathroom,price,address,latitude,longitude,handleFlyToHouse}){

    const navigate=useNavigate()

    function handleClick(){
        handleFlyToHouse ? handleFlyToHouse({_id,img:images[0],title,latitude,longitude,bedroom,price}) : navigate(`/list/${_id}`)   
    }

    return(
        <div className="card-container">
            <div className="card-left-section">
                <Link to={`/list/${_id}`}><img src={images[0] || "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"} alt={title}></img></Link>
            </div>
            <div className="card-right-section">
                <h1 onClick={handleClick}>{title}</h1>
                <div className="address-container">
                    <img src="/pin.png" alt="pin-image"></img>
                    <span>{address.slice(0,45)+"..."}</span>
                </div>
                <span className="price">$ {price}</span>
                <div className="card-upper-bottom">
                    <div className="left-section">
                        <div className="bedroom">
                            <img src="/bed.png" alt="bedroom" />
                            <span>{bedroom} bedroom</span>
                        </div>
                        <div className="bathroom">
                            <img src="/bath.png" alt="bathroom" />
                            <span>{bathroom} bathroom</span>
                        </div>
                    </div>
                </div>
                <div className="card-lower-bottom">
                    <Link to={`/list/${_id}`}>See Details <span>&rarr;</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Card