import { useState } from "react"
import "./slider.scss"
function Slider({images}){
    const [currentIndex,setCurrentIndex]=useState(0)
    const [openFullSlider,setOpenFullSlider]=useState(false)

    function handleClick(value,limit){
        let indexVal=currentIndex+value
        indexVal=indexVal < 0 || indexVal >= +images.length ? limit : indexVal
        setCurrentIndex(indexVal)
    }

    function handleFullSlider(displayVal,imgIndex){
        console.log(imgIndex)
        setOpenFullSlider(displayVal)
        setCurrentIndex(imgIndex)
    }
    console.log(openFullSlider)
    return(
        <div className="slider-container">
            <div className={`${openFullSlider ? "slider-full" : "slider-close"} `}>
                <div className="left-arrow">
                    <img src="/arrow.png" alt="left-arrow" onClick={()=>handleClick(-1,+images.length-1)}/>
                </div>
                <div className="image-container">
                    {images.map((image,index)=><img src={image} alt="house-image" style={{display:index==currentIndex ? "block" : "none" }}/>)}
                </div>
                <div className="right-arrow">
                    <img src="/arrow.png" alt="right-arrow" onClick={()=>handleClick(1,0)} />
                </div>
                <button className="close-button" onClick={()=>handleFullSlider(false)}>X</button>
            </div>
            <div className="slider-left-section">
                <img src={images[0]} alt="house-image" onClick={()=>handleFullSlider(true,0)} />
            </div>
            <div className="slider-right-section">
                {images.slice(1).map((image,index)=><img id={index} onClick={()=>handleFullSlider(true,index+1)} src={image}  alt="house-image" />)}
            </div>
        </div>
    )
}

export default Slider