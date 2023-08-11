import axios from "axios";


export const geojsonApi = axios.create({
    baseURL: 'https://riceobservatory.org/'
});
