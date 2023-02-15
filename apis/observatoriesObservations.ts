import axios from "axios";


export const beansApi = axios.create({
    baseURL: 'https://commonbeanobservatorytst.ciat.cgiar.org/'
});
