import axios from "axios";

async function getAddressFromLatAndLng(lng,lat){
  const options = {
    method: 'GET',
    url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse',
    params: {
      lat: lat,
      lon: lng,
      'accept-language': 'en',
      polygon_threshold: '0.0'
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
    }
  };
  
  
  try {
    const response = await axios.request(options);
    const {address,lat,lon,display_name}=response.data
    const result={city:address?.city,longitude:lon,latitude:lat,address:display_name}
    return result
  } catch (error) {
    return error
  }
}

export default getAddressFromLatAndLng