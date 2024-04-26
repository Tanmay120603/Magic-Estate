import Card from "../Card/Card";

function List({listData}){
    return(
        <>
            {listData.map(item=><Card {...item}></Card>)}
        </>
    )
}

export default List