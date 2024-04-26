import List from "../../Components/NavBar/List/List"
import { listData, userData } from "../../data/dummyData"
import { Link } from "react-router-dom"
import "./profilePage.scss"
import Chat from "../../Components/NavBar/Chat/Chat"

function ProfilePage(){
    return(
        <div className="profile-page-container">
            <div className="user-related-container">
                <div className="wrapper">
                <div className="user-info">
                    <div className="top-section">
                        <h2>User Information</h2>
                        <Link to={""} className="link-css">Update Profile</Link>
                    </div>
                    <div className="bottom-section">
                        <div>Avatar: <img src={userData.img} alt="avatar-image"/></div>
                        <div>Username: <span>{userData.name}</span></div>
                        <div>E-mail: <span>johnDoe@gmail.com</span></div>
                    </div>
                </div>
                <div className="my-list">
                    <div className="top-section">
                        <h2>My List</h2>
                        <Link to="" className="link-css">Create New Post</Link>
                    </div>
                        <List listData={listData}></List>
                </div>
                <div className="saved-list">
                    <h2>Saved List</h2>
                    <List listData={listData}></List>
                </div>
                </div>
            </div>
            <div className="chat-related-container">
                <div className="messages-container">
                    <h1>Messages</h1>
                    {new Array(7).fill(0,0).map((item,index)=>
                        <div className="message-container" key={index}>
                            <img src={userData.img} alt="avatar-image" />
                            <span>{userData.name}</span>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    )}
                </div>
                <Chat></Chat>
            </div>
        </div>
    )
}

export default ProfilePage