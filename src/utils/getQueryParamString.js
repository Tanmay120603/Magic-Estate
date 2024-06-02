function getQueryParamString(obj){
    return "?"+(Object.keys(obj).map(key=>key+ "=" + obj[key]).join("&"))
}

export default getQueryParamString