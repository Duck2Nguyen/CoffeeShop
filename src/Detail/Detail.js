import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Detail.scss'
import Header from '../Header/Header'
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import { set } from 'lodash';
import { getItemByID } from '../Services/userService'

function Detail() {
    const [value, setValue] = useState('1');
    const [data, setData] = useState({});
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

            // let imageBase64 = '';
            // if (image) {
            //     console.log('co image')
            //     imageBase64 = new Buffer(image, 'base64').toString('binary')
            //     setimageUrl(imageBase64)
            //     console.log("heloo", imageUrl)
            // }

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
                            <div className='item-price'>${data.price}</div>
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
                        {data.description}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Detail