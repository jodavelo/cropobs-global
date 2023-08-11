import axios from "axios";


export const beansApi = axios.create({
    baseURL: 'https://commonbeanobservatorytst.ciat.cgiar.org/'
});

export const centralApi = axios.create({
    baseURL: 'https://cropobs-central.ciat.cgiar.org/'
});