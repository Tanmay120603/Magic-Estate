import { Link } from "react-router-dom"
import "./card.scss"

function Card({id,title,img,bedroom,bathroom,price,address,latitude,longitude,handleFlyToHouse}){

    return(
        <div className="card-container">
            <div className="card-left-section">
                <Link to={`${id}`}><img src={img} alt={title}></img></Link>
            </div>
            <div className="card-right-section">
                <h1 onClick={()=>handleFlyToHouse({id,img,title,latitude,longitude,bedroom,price})}>{title}</h1>
                <div className="address-container">
                    <img src="/pin.png" alt="pin-image"></img>
                    <span>{address}</span>
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
                    <div className="right-section">
                        <div><img src="/save.png" alt="save"></img></div>
                        <div><img src="/chat.png" alt="chat"></img></div>
                    </div>
                </div>
                <div className="card-lower-bottom">
                    <Link to={`${id}`}>See Details <span>&rarr;</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Card