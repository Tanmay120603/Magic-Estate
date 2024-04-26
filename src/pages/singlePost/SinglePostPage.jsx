import Slider from "../../Components/NavBar/Slider/Slider"
import { singlePostData, userData } from "../../data/dummyData"
import "./singlePostPage.scss"
import Map from "../../Components/NavBar/Map/Map"

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
            <div className="features">
                <h4 className="feature-header">General</h4>
                <div className="generalContainer">
                    <div className="item-container">
                        <div>
                        <img src="/utility.png" alt="icon-image" />
                        </div>
                        <div className="right-section">
                        <h4>Utilities</h4>
                        <span>Renter is responsible</span>
                        </div>
                    </div>
                    <div className="item-container">
                        <div>
                        <img src="/pet.png" alt="icon-image" />
                        </div>
                        <div>
                        <h4>Pet Policy</h4>
                        <span>Pets Allowed</span>
                        </div>                      
                    </div>
                    <div className="item-container">
                        <div>
                        <img src="/fee.png" alt="icon-image" />
                        </div>
                        <div>
                        <h4>Property Fees</h4>
                        <span>Must have 3x the rent in total household income</span>
                        </div>
                    </div>
                </div>
                <h4 className="feature-header">Room Sizes</h4>
                <div className="roomSizeContainer">
                <div className="rs-item-container">
                        <img src="/size.png" alt="icon-image" />
                        <span>{singlePostData.size} sqft</span>
                    </div>
                    <div className="rs-item-container">
                        <img src="/bed.png" alt="icon-image" />
                        <span>{singlePostData.bedroom} Bedroom</span>
                    </div>
                    <div className="rs-item-container">
                        <img src="/bath.png" alt="icon-image" />
                        <span>{singlePostData.bathroom} Bathroom</span>
                    </div>
                </div>
                <h4 className="feature-header">Nearby Places</h4>
                <div className="nearByContainer">
                <div className="item-container">
                        <img src="/school.png" alt="icon-image" />
                        <div className="right-section">
                        <h4>School</h4>
                        <span>{singlePostData.school}</span>
                        </div>
                    </div>
                    <div className="item-container">
                        <img src="/bus.png" alt="icon-image" />
                        <div className="right-section">
                        <h4>Bus Stop</h4>
                        <span>{singlePostData.bus}</span>
                        </div>
                    </div>
                    <div className="item-container">
                        <img src="/restaurant.png" alt="icon-image" />
                        <div className="right-section">
                        <h4>Restraunts</h4>
                        <span>{singlePostData.restaurant}</span>
                        </div>
                    </div>
                </div>
                <h4 className="feature-header">Location</h4>
                <div className="locationContainer">
                    <Map List={[singlePostData]} geoExtent={[singlePostData.latitude,singlePostData.longitude]}></Map>
                </div>
                <div className="bottomSection">
                    <button><img src="/chat.png" alt="chat" />Send a message</button>
                    <button><img src="/save.png"/> Save the place</button>
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage