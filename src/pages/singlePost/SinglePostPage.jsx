import Slider from "../../Components/NavBar/Slider/Slider"
import { singlePostData, userData } from "../../data/dummyData"
import "./singlePostPage.scss"

function SinglePostPage(){
    return (
        <div className="singlePostContainer">
        <div className="details">
            <div className="wrapper">
            <div className="slider">
                <Slider images={singlePostData.images}></Slider>
            </div>
            <div className="overview-details">
                <div className="left-section">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                    <img src="/pin.png" alt="pin-image" />
                    <span>{singlePostData.address}</span>
                </div>
                <p className="price">$ {singlePostData.price}</p>
                </div>
                <div className="right-section">
                    <img src={userData.img}></img>
                    <span>{userData.name}</span>
                </div>
            </div>
                <div className="desc"><p>{singlePostData.description}</p></div>
            </div>
            </div>
            <div className="features"></div>
        </div>
    )
}

export default SinglePostPage