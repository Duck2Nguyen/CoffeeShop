import { useState, useEffect } from 'react';
import './Cart.scss';
import { BsFillCartCheckFill } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom';
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import Header from '../Header/Header'
// import ModalInput from './ModalInput';

function Cart() {
    const [value, setValue] = useState('');
    const [sum, setSum] = useState(0);
    const [numItem, setnumItem] = useState(0);
    const [arrValue, setarrValue] = useState([]);

    const checkout = () => {
        localStorage.removeItem('cartData');
        setValue(1)
        console.log(sum + '' + numItem)
        window.location.reload();
    }

    useEffect(async () => {
        var i = 0;
        var array = [];
        var item = localStorage.getItem('cartData');
        let object = {}
        try {
            object = JSON.parse(item);
        } catch (error) {
            console.log('err item', item);
        }
        console.log(object)
        if (object) {
            object.map((value, index) => {
                array.push({
                    name: value.name,
                    url: value.url,
                    num: parseInt(value.num) + 1,
                    price: parseFloat(value.price) * (parseFloat(value.num) + 1),
                    id: value.id
                })
            })

        }
        console.log(array)
        // console.log(array)
        await setarrValue(array)
    }, [])

    useEffect(() => {
        var tong = 0;
        {
            arrValue.map((value, index) => {
                tong += parseFloat(value.price)
            })
        }
        setSum(tong);
    })

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
                        {/* <div className='cart-header__right'>X</div> */}
                    </div>
                    <div className='cart-content'>
                        {arrValue.map((value, index) => {
                            return (
                                <div className='cart-item' key={value.id}>
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
                        {/* <div className='cart-item'>
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
                        </div> */}
                    </div>
                    <div className='cart-more'>
                        <div className='cart-more__left'>Add order note</div>
                        <div className='cart-more__right'>Shipping & taxes calculated at checkout</div>
                    </div>
                    <button className='add'>
                        <Link className='add-name' onClick={() => checkout()} to={'/cart'}>ORDER .  {`$${sum}`} USD</Link>
                    </button>
                </div>
            </div>
            {/* <ModalInput /> */}
        </div>


    )
}
export default Cart