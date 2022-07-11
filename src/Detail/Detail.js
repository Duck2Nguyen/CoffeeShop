import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Detail.scss'
import Header from '../Header/Header'
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import { set } from 'lodash';
function Detail() {
    const [value, setValue] = useState('1');
    const [data, setData] = useState({});
    const [arrValue, setarrValue] = useState([]);

    const onChangeInput = (event) => {
        setValue(event.target.value)
    }
    const addItem = () => {
        let value1 = parseInt(value) + 1;
        setValue(value1)
    }
    const subItem = () => {
        if (parseInt(value) > 0) {
            let value1 = parseInt(value) - 1;
            setValue(value1)
        }
    }


    const addToCart = (data) => {
        let object = []
        var item = localStorage.getItem('cartData');
        if (item === null) {
            localStorage.setItem('cartData', JSON.stringify([]))
        }
        else {
            try {
                object = JSON.parse(item);
            } catch (error) {
                console.log('err item', item);
            }
        }
        object.push({
            id: data.id,
            url: data.url,
            name: data.name,
            num: parseInt(value) - 1,
            price: data.price
        })

        if (localStorage) {
            localStorage.setItem('cartData', JSON.stringify(object))
        } else {
            alert('No local')
        }

        var i = 0;
        for (i; i <= localStorage.length; i++) {
            var item = localStorage.getItem(localStorage.key(i));
            let object = JSON.parse(item)
            console.log(object.name + object.num + object.url)
            // console.log(localStorage.key(i));
        };
    }


    useEffect(async () => {
        let array = [];
        var i = 1;
        for (i; i < 13; i++) {
            array.push(
                {
                    id: i,
                    url: Image,
                    name: `Blue Boy ${i}`,
                    price: '17.00'
                }
            )
        }
        // console.log(array)
        if (array && array.length !== 0) {
            try {
                await setarrValue(array);
            } catch (error) {
                console.log('err value', arrValue);
            }
        }
        // setarrValue(array);
        // console.log(arrValue)
    }, [])
    // console.log(arrValue)
    // useEffect(async () => {
    //     for (var i = 1; i < 13; i++) {
    //         setarrValue([...arrValue, {
    //             id: i,
    //             url: Image,
    //             name: `Blue Boy ${i}`,
    //             price: '17.00'
    //         }])
    //     }
    // }, [])


    console.log(arrValue)
    let { id } = useParams();
    // var item = [];

    // try {
    //     item.push(arrValue[parseInt(id) - 1]);
    // } catch (error) {
    //     console.log('err item', item);
    // }
    useEffect(() => {
        // console.log('heloo');
        console.log(arrValue)
        if (arrValue && arrValue[parseInt(id) - 1]) {
            setData(arrValue[parseInt(id) - 1])
        }
    })

    return (
        <div className='detail-display'>
            <Header />
            <div className='detail-container container'>
                <div className='row'>
                    <div className='detail-image col-6'>
                        <img src={Image} className="detail-picture"></img>
                    </div>
                    <div className='detail-order col-6'>
                        <div className='detail-item'>
                            <div className='item-name'>{data.name}</div>
                            <div className='item-price'>${data.price}</div>
                        </div>
                        <div className='detail-quantity'>
                            <div className='quantity-title'>Quantity:</div>
                            <div className='quantity-order'>
                                <button className='quantity-button' onClick={() => addItem()}>+</button>
                                <input className='quantity-number' value={value} onChange={(event) => onChangeInput(event)}></input>
                                <button className='quantity-button' onClick={() => subItem()}>-</button>
                            </div>
                        </div>
                        <button className='add'>
                            <div className='add-name' onClick={() => addToCart(data)}>ADD TO CART</div>
                        </button>
                    </div>

                    <div className='detail-descriptions col-12'>
                        Named for one half of our prized paint-by-number renditions of the classic eighteenth century portraits
                        The Blue Boy and Pinkie, Blue Boy represents who we are at Methodical.
                        This coffee embodies a certain classical energy that the painting itself imparts, with a down to earth, paint-by-number twist.
                        The character of this coffee is smooth, chocolatey, sweet; it’s body is velvety soft.
                        It’s a coffee that will stand the test of time, a testament to the origins present in its makeup.
                        Blue Boy does right by these origins, displaying the coffees at their best; he does right by us, representing humble sophistication with panache;
                        and he does right by his namesake, keeping his arcadian gentility alive.
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Detail