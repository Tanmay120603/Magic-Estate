import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import axios from "axios";
import { ShimmerContentBlock } from "react-shimmer-effects";

function List({queryKey,requestEndpoint}){

    const {isFetching,data}=useQuery({queryKey,queryFn:async()=>{
        const response=await axios.get(requestEndpoint)
        return response.data
    }})

    if(isFetching)return(<>
    <ShimmerContentBlock title text cta thumbnailWidth={300}></ShimmerContentBlock>
    <ShimmerContentBlock title text cta thumbnailWidth={300}></ShimmerContentBlock>
    <ShimmerContentBlock title text cta thumbnailWidth={300}></ShimmerContentBlock>
    </>)

    return(
        <>  
            {data?.length==0 && <div className="no-result-container">
                <img src="/no-results.png" alt="no-results"/>
                <span>No Post Found</span>
            </div>}
            {data?.map(item=><Card key={item["_id"]} {...item}></Card>)}
        </>
    )
}

export default List