import { useState, useEffect } from 'react';
import './Cart.scss';
import { BsFillCartCheckFill } from 'react-icons/bs'
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import Header from '../Header/Header'

function Cart() {
    const [value, setValue] = useState('');
    const [arrValue, setarrValue] = useState([]);



    useEffect(async () => {
        var i = 0;
        var array = [];
        for (i; i <= localStorage.length; i++) {
            var item = localStorage.getItem(localStorage.key(i));
            let object = JSON.parse(item)
            if (object.name !== undefined && object.name !== null) {
                array.push({
                    name: object.name,
                    url: object.url,
                    num: object.num,
                    price: object.price,
                    id: object.id
                })
            }
            console.log(array)
        };
        console.log(array)
        await setarrValue(array)
    }, [])

    console.log(arrValue)
    // console.log(arrValue.length)
    return (
        <div className='cart-display'>
            <Header />
            <div className='cart-all'>
                <div className='cart-container'>
                    <div className='cart-header'>
                        <div className='cart-header__left'>
                            <div className='cart-icon'> <BsFillCartCheckFill /></div>
                            <div className='cart-num'>11 items</div>
                        </div>
                        {/* <div className='cart-header__right'>X</div> */}
                    </div>
                    <div className='cart-content'>
                        {arrValue.map((value, index) => {
                            console.log('hello ' + value.id)
                            console.log(arrValue.length)
                            return (
                                <div className='cart-item' key={value.id}>
                                    <div className='cart-picture'>
                                        <img src={value.url} className="item-image"></img>
                                    </div>
                                    <div className='cart-order'>
                                        <div className='item-detail'>
                                            <div className='item-name'>{value.name}</div>
                                            <div className='item-price'>${value.price}</div>
                                        </div>
                                        <div className='cart-quantity'>{parseInt(value.num) + 1}oz</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='cart-item'>
                            <div className='cart-picture'>
                                <img src={Image} className="item-image"></img>
                            </div>
                            <div className='cart-order'>
                                <div className='item-detail'>
                                    <div className='item-name'>Blue Boy</div>
                                    <div className='item-price'>$1700</div>
                                </div>
                                <div className='cart-quantity'>12oz</div>
                            </div>
                        </div>
                    </div>
                    <div className='cart-more'>
                        <div className='cart-more__left'>Add order note</div>
                        <div className='cart-more__right'>Shipping & taxes calculated at checkout</div>
                    </div>
                    <button className='add'>
                        <div className='add-name'>CHECKOUT .  $187.00 USD</div>
                    </button>
                </div>
            </div>
        </div>


    )
}
export default Cart