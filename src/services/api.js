import axios from 'axios';

//se for celular, precisa ser IP (192.168.126.75)... senão pode ser localhost.
//No android , para acessar o localhost, usa-se: 10.0.2.2 ...
const api = axios.create({
    baseURL: 'http://192.168.126.75:3333', 
});

export default api;