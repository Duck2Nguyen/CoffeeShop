import { useState, useEffect } from 'react';
import './Cart.scss';
import { BsFillCartCheckFill } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom';
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import Header from '../Header/Header';
import Footer from '../Header/Footer';
import { getItemByID } from '../Services/userService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ModalInput from './ModalInput';

function Cart() {
    const [value, setValue] = useState('');
    const [sum, setSum] = useState(0);
    const [numItem, setnumItem] = useState(0);
    const [arrValue, setarrValue] = useState([]);

    const handleOrder = () => {
        let data = JSON.parse(localStorage.getItem('dataLogin'));
        console.log('data login cart ', data)
        if (data.isLogin === true && sum > 0) {
            window.location.assign("http://localhost:3000/checkout")
        }
        else if (sum === 0) {
            toast.error('Cart is empty! You must add item to the cart!!!')
            setTimeout(() => {
                window.location.assign("http://localhost:3000")
            }, 3000);
        }
        else {
            toast.error('You must login to order item!!!')
            setTimeout(() => {
                window.location.assign("http://localhost:3000/login")
            }, 3000);
        }
    }

    useEffect(async () => {
        var i = 0;
        let array = [];
        var item = localStorage.getItem('cartData');
        let object = {}
        try {
            object = JSON.parse(item);
        } catch (error) {
            console.log('err item', item);
        }
        console.log('object', object)
        if (object) {
            let array = [];
            object.map(async (value, index) => {
                console.log("check nhe")
                let data = await getItemByID(value.id)
                console.log("data image", data)
                // data.data[0]
                setarrValue([...array, {
                    name: value.name,
                    url: data.data[0] !== undefined ? data.data[0].image : Image,
                    num: parseInt(value.num),
                    price: parseFloat(value.price) * (parseFloat(value.num)),
                    id: value.id
                }])
                array.push({
                    name: value.name,
                    url: data.data[0] !== undefined ? data.data[0].image : Image,
                    num: parseInt(value.num),
                    price: parseFloat(value.price) * (parseFloat(value.num)),
                    id: value.id
                })
            })
            // console.log('check array', array)
            // if (array && array.length > 0) {
            //     setarrValue(array)
            //     console.log("xet array")
            // }
            // setarrValue(array)
        }
        console.log('check arrvalue', arrValue)
        // if (array && array.length > 0) {
        //     setarrValue(array)
        //     console.log("xet array")
        // }
    }, [])


    useEffect(() => {
        var tong = 0;
        {
            arrValue.map((value, index) => {
                tong += parseFloat(value.price)
            })
        }
        setSum(tong);
        if (localStorage) {
            localStorage.setItem('cartTotal', tong)
            var item = localStorage.getItem('cartTotal');
            console.log(item)
            // window.location.reload();
        } else {
            alert('No local')
        }

    })

    const handleClearCart = () => {
        localStorage.removeItem('cartData');
        window.location.assign("http://localhost:3000/cart")
    }


    return (
        <div className='cart-display'>
            <Header />
            <div className='cart-all'>
                <div className='cart-container'>
                    <div className='cart-header'>
                        <div className='cart-header__left'>
                            <div className='cart-icon'> <BsFillCartCheckFill /></div>
                            <div className='cart-num'>{arrValue.length} items</div>
                        </div>
                        <div className='cart-header__right' onClick={() => handleClearCart()}>X</div>
                    </div>
                    <div className='cart-content'>
                        {arrValue.map((value, index) => {
                            return (
                                <div className='cart-item' key={index}>
                                    <div className='cart-picture'>
                                        <img src={value.url} className="item-image"></img>
                                    </div>
                                    <div className='cart-order'>
                                        <div className='item-detail'>
                                            <div className='item-name'>{value.name}</div>
                                            <div className='item-price'>{`$${value.price}`}</div>
                                        </div>
                                        <div className='cart-quantity'>Quantity: {value.num}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='cart-more'>
                        <div className='cart-more__left'>Add order note</div>
                        <div className='cart-more__right'>Shipping & taxes calculated at checkout</div>
                    </div>
                    <button className='add'>
                        <Link className='add-name' onClick={() => handleOrder()} >ORDER .  {`$${sum}`} USD</Link>
                    </button>
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
            {/* <ModalInput /> */}
        </div>


    )
}
export default Cart