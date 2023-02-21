import axios from 'axios';

export const dataFetcher = (url: string) => axios.get(url).then(res => res.data);