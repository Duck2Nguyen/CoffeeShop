import { useState, useEffect } from 'react';
import './Rate.scss'
import Header from '../Header/Header'
import Footer from '../Header/Footer';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetail, addReview } from '../Services/userService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../Homepage/Image/Coffee/coffee.jpeg'

function Rate() {
    // const [value, setValue] = useState([
    //     {
    //         image: Image,
    //         productName: 'Blue Boy',
    //         quantity: 12,
    //         totalPrice: 2203
    //     },
    //     {
    //         image: Image,
    //         productName: 'Blue Boy',
    //         quantity: 12,
    //         totalPrice: 2203
    //     },
    //     {
    //         image: Image,
    //         productName: 'Blue Boy',
    //         quantity: 12,
    //         totalPrice: 2203
    //     }
    // ]);

    const [value, setValue] = useState([])
    const [comment, setComment] = useState('')
    const [star, setStar] = useState(1)
    let { id } = useParams();
    let username = JSON.parse(localStorage.getItem('dataLogin')).data.username

    useEffect(async () => {
        try {
            let res = await getOrderDetail(id);
            console.log("res", res)
            if (res) {
                setValue(prev => [...res])
            }
        } catch (error) {
            console.log('loi cm rofoi')
            toast.error("Error to change status")
            // localStorage.setItem('isLogin', 'false')
            if (error.response) {
                if (error.response.data) {
                    console.log("error lan 2")
                }
                console.log(error.response)
            }
        }
    }, [])

    const onChangeComment = (event) => {
        setComment(prev => event.target.value)
        // console.log(comment)
    }

    const handleSaveComment = async (dataAll) => {
        console.log(comment)
        console.log(star)
        console.log(dataAll)
        try {
            let res = await addReview(dataAll);
            console.log("res", res)
            if (res && res.errCode === '0') {
                toast.success("Add comment success!!")
            }
            else {
                toast.error("Fail to add comment")
            }
        } catch (error) {
            console.log('loi cm rofoi')
            toast.error("Fail to add comment")
            // localStorage.setItem('isLogin', 'false')
            if (error.response) {
                if (error.response.data) {
                    console.log("error lan 2")
                }
                console.log(error.response)
            }
        }
        setStar(1)
        setComment(prev => '')

    }
    const handleStar = (event) => {
        setStar(prev => event.target.value)
        // console.log(star)
    }

    return (
        <div className='rate-display'>
            <Header />
            <div className='container rate-container'>
                <div className='addQuantity-title'>Comment</div>
                <div className='row-all'>
                    {value && value.length > 0 && value.map((data, index) => {
                        return (
                            <div className='row'>
                                <div className='col-4 content-left detail-image'>
                                    <img src={data.image} className="detail-picture"></img>
                                </div>
                                <div className='col-8  content-right'>
                                    <div className='detail-item'>
                                        <div className='item-name'>{data.name}</div>
                                        <div className='item-price avaiable'>Quantity: {data.quantity}</div>
                                        <div className='item-price avaiable'>TotalPrice: {data.totalPrice}$</div>
                                        <form className='rate'>
                                            <input name="star" type="radio" value="1" className='star-input'
                                                onClick={(event) => handleStar(event)}
                                            />1 Stars
                                            <input name="star" type="radio" value="2" className='star-input'
                                                onClick={(event) => handleStar(event)}
                                            />2 Stars
                                            <input name="star" type="radio" value="3" className='star-input'
                                                onClick={(event) => handleStar(event)}
                                            />3 Stars
                                            <input name="star" type="radio" value="4" className='star-input'
                                                onClick={(event) => handleStar(event)}
                                            />4 Stars
                                            <input name="star" type="radio" value="5" className='star-input'
                                                onClick={(event) => handleStar(event)}
                                            />5 Stars
                                        </form>
                                        <textarea name="description" className="form-control description"
                                            placeholder='Type comment here!'
                                            id="inputDescription" rows="3"
                                            // value={value.description}
                                            onChange={(event) => onChangeComment(event)}
                                        ></textarea>

                                    </div>
                                    <button className='btn'
                                        onClick={() => handleSaveComment({
                                            orderItemID: data.orderItemID,
                                            username: username,
                                            comment: comment,
                                            star: star
                                        })}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
export default Rate