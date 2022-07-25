import axios from '../axios'

const handleLoginApi = (username, password) => {
    // console.log('vao handle')
    return axios.post('/login', { username: username, password: password });
}

const handleRegisterApi = (data) => {
    // console.log('vao handle')
    return axios.post('/register', {
        username: data.userName,
        password: data.password,
        fullname: data.fullName,
        address: data.address,
        phone: data.phone,
        email: data.email
    });
}

const getAllCollection = () => {
    return axios.get('/collections');

}
const getItemByID = (id) => {
    return axios.get(`/collections/${id}`);
}


const addNewProduct = (data) => {
    // console.log('vao handle')
    return axios.post('/addProduct', {
        categoryID: data.subCategory,
        name: data.name,
        description: data.description,
        image: data.image,
        quantity: parseInt(data.quantity),
        price: parseFloat(data.price)

    });
}

const getProductType = (id) => {
    // console.log('vao handle', id)
    return axios.post('/getProductType', {
        id: id
    });
}


export {
    handleLoginApi, getAllCollection, getItemByID, addNewProduct,
    handleRegisterApi, getProductType
} 