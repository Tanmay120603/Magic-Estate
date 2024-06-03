import {Slider,Map} from "../../Components/"
import "./singlePostPage.scss"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import {ShimmerPostDetails} from "react-shimmer-effects"
import parse from "html-react-parser"
import { toast } from "react-toastify"
import { useContext} from "react"
import { UserAuthContext } from "../../Context/UserAuth"

function SinglePostPage(){

    const {id}=useParams()
    const queryClient=useQueryClient()
    const {userAuth}=useContext(UserAuthContext)
    const navigate=useNavigate()
    const {isPending,error,data}=useQuery({
        queryKey:["postDetail",id],
        queryFn:async()=>{
            const res=await axios.get(import.meta.env.VITE_SERVER_ENDPOINT+`api/posts/${id}`,{withCredentials:true})
            return res.data        
        }
    })

    async function handleSavePost(){
        if(!userAuth)return navigate("/login")
        try{
        const res=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"api/users/post/save",{postId:id},{withCredentials:true})
        toast.success(res.data?.message,{autoClose:2000})
        queryClient.setQueryData(["postDetail",id],(prev)=>{
            return {...prev,saved:!prev.saved}
        })
        queryClient.invalidateQueries([userAuth.username,"savedPost"])
        }
        catch(err){
            toast.error(err.response.data?.message,{autoClose:2000})
        }
    }

    async function handleSend(){
        if(!userAuth)return navigate("/login")
        try{
           const response=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"api/chats",{receiverId:data?.user["_id"]},{withCredentials:true})
           navigate("/profile",{state:response.data?.chatId})
           queryClient.invalidateQueries(["chats"])
        }
        catch(err){
            toast.error(err.response.data?.message,{autoClose:2000})
        }
    }

    if(isPending)return (<ShimmerPostDetails variant={"EDITOR"}></ShimmerPostDetails>)

    if(error)return <div>{error?.response?.data?.message}</div>

    return (
        <div className="singlePostContainer">
        <div className="details">
            <div className="wrapper">
            <div className="slider">
                <Slider images={data.images}></Slider>
            </div>
            <div className="overview-details">
                <div className="left-section">
                <h1>{data.title}</h1>
                <div className="address">
                    <img src="/pin.png" alt="pin-image" />
                    <span>{data.address}</span>
                </div>
                <p className="price">$ {data.price}</p>
                </div>
                <div className="right-section">
                    <img src={data.user.avatar}></img>
                    <span>{data.user.username}</span>
                </div>
            </div>
                <div className="desc">{parse(data.postDetail.desc)}</div>
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
                        <span>{data.postDetail.utilities}</span>
                        </div>
                    </div>
                    <div className="item-container">
                        <div>
                        <img src="/pet.png" alt="icon-image" />
                        </div>
                        <div>
                        <h4>Pet Policy</h4>
                        <span>{data.postDetail.petAllowance}</span>
                        </div>                      
                    </div>
                    <div className="item-container">
                        <div>
                        <img src="/fee.png" alt="icon-image" />
                        </div>
                        <div>
                        <h4>Deposit Policy</h4>
                        <span>{data.postDetail.deposit}</span>
                        </div>
                    </div>
                </div>
                <h4 className="feature-header">Room Sizes</h4>
                <div className="roomSizeContainer">
                <div className="rs-item-container">
                        <img src="/size.png" alt="icon-image" />
                        <span>{data.postDetail.size} sqft</span>
                    </div>
                    <div className="rs-item-container">
                        <img src="/bed.png" alt="icon-image" />
                        <span>{data.bedroom} Bedroom</span>
                    </div>
                    <div className="rs-item-container">
                        <img src="/bath.png" alt="icon-image" />
                        <span>{data.bathroom} Bathroom</span>
                    </div>
                </div>
                <h4 className="feature-header">Nearby Places</h4>
                <div className="nearByContainer">
                <div className="item-container">
                        <img src="/school.png" alt="icon-image" />
                        <div className="right-section">
                        <h4>School</h4>
                        <span>{data.postDetail.school ? data.postDetail.school + "m away" : "N/A" }</span>
                        </div>
                    </div>
                    <div className="item-container">
                        <img src="/bus.png" alt="icon-image" />
                        <div className="right-section">
                        <h4>Bus Stop</h4>
                        <span>{data.postDetail.bus ? data.postDetail.bus + "m away" : "N/A"}</span>
                        </div>
                    </div>
                    <div className="item-container">
                        <img src="/restaurant.png" alt="icon-image" />
                        <div className="right-section">
                        <h4>Restraunts</h4>
                        <span>{data.postDetail.restraunt ? data.postDetail.restraunt + "m away" : "N/A"}</span>
                        </div>
                    </div>
                </div>
                <h4 className="feature-header">Location</h4>
                <div className="locationContainer">
                    <Map List={[data]} geoExtent={[data.latitude,data.longitude]}></Map>
                </div>
                <div className="bottomSection">
                    <button onClick={handleSend}><img src="/chat.png" alt="chat" />Send a message</button>
                    <button className={data.saved ? "saved" : ""} onClick={handleSavePost}><img src="/save.png"/>{data.saved ? "Place saved" : "Save the place"}</button>
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage