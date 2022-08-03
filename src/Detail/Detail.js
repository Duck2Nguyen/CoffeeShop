import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Detail.scss'
import Header from '../Header/Header';
import Footer from '../Header/Footer';
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import { set } from 'lodash';
import { getItemByID, getProductReview } from '../Services/userService'

function Detail() {
    const [value, setValue] = useState('1');
    const [data, setData] = useState({});
    const [comment, setComment] = useState([]);
    const [arrValue, setarrValue] = useState([]);
    // const [imageUrl, setimageUrl] = useState(Image);

    const onChangeInput = (event) => {
        setValue(event.target.value)
    }
    const addItem = () => {
        let value1 = parseInt(value) + 1;
        if (value1 > data.quantity) {
            value1 = data.quantity
        }
        setValue(value1)
    }
    const subItem = () => {
        if (parseInt(value) > 0) {
            let value1 = parseInt(value) - 1;
            setValue(value1)
        }
    }


    const addToCart = (data) => {
        // localStorage.removeItem('cartData');
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
            cartID: object.length,
            id: data.productID,
            // url: data.image ? data.image : Image,
            name: data.productName,
            num: parseFloat(value),
            price: data.price
        })

        if (localStorage) {
            localStorage.setItem('cartData', JSON.stringify(object))
            window.location.reload();
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


    // console.log(arrValue)
    let { id } = useParams();

    useEffect(async () => {
        // console.log(id);
        try {
            let data = await getItemByID(id)
            console.log(data.data[0])
            setData(data.data[0])
        } catch (error) {
            console.log('loi cm rofoi')
            if (error.response) {
                if (error.response.data) {
                    console.log("error lan 2")
                }
                console.log(error.response)
            }
        }
    }, [])

    useEffect(async () => {
        // console.log(id);
        try {
            let data = await getProductReview({
                productID: id
            })
            console.log('comemt', data)
            setComment([...data])
        } catch (error) {
            console.log('loi cm rofoi')
            if (error.response) {
                if (error.response.data) {
                    console.log("error lan 2")
                }
                console.log(error.response)
            }
        }
    }, [])

    return (
        <div className='detail-display'>
            <Header />
            <div className='detail-container container'>
                <div className='row'>
                    <div className='detail-image col-6'>
                        <img src={data.image} className="detail-picture"></img>
                    </div>
                    <div className='detail-order col-6'>
                        <div className='detail-item'>
                            <div className='item-name'>{data.productName}</div>
                            <div className='item-price'>Price: {data.price}$</div>
                            <div className='item-price avaiable'>Avaiable: {data.quantity}</div>
                        </div>
                        <div className='detail-quantity'>
                            <div className='quantity-title'>Quantity:</div>
                            <div className='quantity-order'>
                                <button className='quantity-button' onClick={() => addItem()}>+</button>
                                <input className='quantity-number' value={value} onChange={(event) => onChangeInput(event)}></input>
                                <button className='quantity-button' onClick={() => subItem()}>-</button>
                            </div>
                        </div>
                        <button className={data.quantity == 0 ? 'hethang' : 'add'}>
                            <div className='add-name' onClick={() => addToCart(data)}>ADD TO CART</div>
                        </button>
                    </div>

                    <div className='detail-descriptions col-12'>
                        <div className='des'>Description:</div>
                        {data.description}
                    </div>
                    <div className='review col-12'>
                        <div className='review-title'>Reviews</div>
                        <div className='content-title'>Reviews {comment.length}</div>
                        {comment && comment.length > 0 && comment.map((data, index) => {
                            return (
                                <div className='review-content'>
                                    <div className='content-name'>{data.username}</div>
                                    <div className='content-star'>{
                                        data.star === 5 ? '★ ★ ★ ★ ★ ' : data.star === 4 ? '★ ★ ★ ★' :
                                            data.star === 3 ? '★ ★ ★  ' : data.star === 2 ? '★ ★ ' : '★'
                                    } </div>
                                    <div className='content-comment'>{data.comment}</div>
                                </div>
                            )
                        })}
                        {/* <div className='review-content'>
                            <div className='content-name'>Mark</div>
                            <div className='content-star'>5 Stars</div>
                            <div className='content-comment'>I’m a HUUGE fan of Methodical Coffee, so I don’t write this lightly. Belly Warmer tasted a little too close to bad fast food coffee. It was way too nutty tasting and seemed a bit more bitter than I had hoped. Disappointed, for sure, but giving it a 3 Star to account for the fact it could have just been a bad batch. I doubt I’ll ever order this again, though. </div>
                        </div> */}
                    </div>


                </div>

            </div>
            <Footer />
        </div>
    )
}
export default Detail