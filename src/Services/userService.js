import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    console.log('vao handle')
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllCollection = () => {
    return axios.get('/collections');

}
const getItemByID = (id) => {
    return axios.get(`/collections/${id}`);
}


export {
    handleLoginApi, getAllCollection, getItemByID
} 