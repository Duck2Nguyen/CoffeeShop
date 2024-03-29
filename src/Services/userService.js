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

const addOrder = (dataOrder) => {
    return axios.post('/addOrder', {
        username: dataOrder.value.username,
        message: 'OK',
        totalPayment: dataOrder.totalPayment,
        fullname: dataOrder.value.fullname,
        address: dataOrder.value.address,
        phone: dataOrder.value.phone,
        email: dataOrder.value.email,
        data: dataOrder.data
    });
}

const getAllOrder = () => {
    return axios.post('/getAllOrder');
}

const changeStatus = (data) => {
    // console.log('vao handle', id)
    return axios.post('/changeStatus', {
        orderID: data.orderID,
        status: data.status
    });
}


const getAllProduct = () => {
    return axios.post('/loadProduct');
}

const changeQuantity = (data) => {
    return axios.post('/changeQuantity', {
        productID: data.productID,
        quantity: data.quantity
    });
}

const getUserOrders = (data) => {
    return axios.post('/loadUserOrders', {
        username: data.username
    });
}

const getOrderDetail = (orderID) => {
    return axios.post(`/loadOrderDetail/${orderID}`);
}

const addReview = (data) => {
    return axios.post('/addReview', {
        orderItemID: parseInt(data.orderItemID),
        username: data.username,
        comment: data.comment,
        rating: parseInt(data.star)
    });
}


const getProductReview = (data) => {
    return axios.post('/getProductReviews', {
        productID: data.productID
    });
}

const getAllSortedProduct = (data) => {
    return axios.post('/getAllSortedProduct', {
        sortBy: data.sortBy
    });
}


export {
    handleLoginApi, getAllCollection, getItemByID, addNewProduct,
    handleRegisterApi, getProductType, addOrder, getAllOrder,
    changeStatus, getAllProduct, changeQuantity, getUserOrders,
    getOrderDetail, addReview, getProductReview, getAllSortedProduct
} 