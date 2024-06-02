import { noImageAvailableUrl } from "./constants"

function getPopupContent(houseData){
    return `<div>
        <div>
            <img src=${houseData.img || noImageAvailableUrl} alt="house-image"/>
        </div>
        <div>
            <a href="/list/${houseData.id}"><h3>${houseData.title}</h3><a>
            <p>${houseData.bedroom} Bedroom</p>
            <span><b>$ ${houseData.price}</b></span>
        </div>
    </div>`
}

export default getPopupContent