import { useState, useEffect } from 'react';
import './Homepage.scss'
import Header from '../Header/Header'
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import { getAllCollection } from '../Services/userService'

function Homepage() {

    const [arrValue, setarrValue] = useState([]);
    // useEffect(async () => {
    //     var array = [];
    //     for (var i = 1; i < 13; i++) {
    //         array.push(
    //             {
    //                 id: i,
    //                 url: Image,
    //                 name: `Blue Boy ${i}`,
    //                 price: '17.00'
    //             }
    //         )
    //     }
    //     console.log(array);
    //     setarrValue(array)
    // }, [])

    useEffect(async () => {
        try {
            let data = await getAllCollection()
            console.log('data', data)
            if (data && data.errCode === 0) {
                var arrayValue = [];
                var array = data.users;
                // console.log('data users', data.users)
                array.map((value, index) => {
                    arrayValue.push(
                        {
                            id: value.productID,
                            url: value.image ? value.image : Image,
                            name: value.productName,
                            price: value.price !== undefined ? value.price : '17.00',
                            parentID: value.parentID
                        }
                    )
                })
                // console.log('array', array)
                setarrValue(arrayValue)
                // console.log('arrayvalue', arrValue)
            }
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
        <>
            <Header />
            <div className='homepage-container'>
                <div className='homepage-title'>Methodical</div>
                <div className="topnav">
                    <a activeClassName="active1" href="#itemCoffee" exact>COFFEE</a>
                    <a activeClassName="active1" href="#itemCake">CAKE</a>
                    <a activeClassName="active1" href="#itemTea">TEA</a>
                    {/* <a activeClassName="active1" href="/brew-gear">BERW GEAR</a>
                    <a activeClassName="active1" href="/subcriptions">SUBCIPTIONS</a> */}
                </div>
                <div className='container coffee'>
                    <div className='item__title' id='itemCoffee'>COFFEE</div>
                    <div className='row'>
                        {arrValue && arrValue.length > 0 && arrValue.map((value, index) => {
                            // console.log(value)
                            if (value.parentID === 'COFT00') {
                                return (
                                    <Link key={value.id} className='item col-3' to={`/detail/${value.id}`}>
                                        <img src={value.url} className="item-image"></img>
                                        {/* <div className="item-image"
                                            style={{ backgroundImage: `url(${value.url})` }}
                                        /> */}
                                        <div className='item-feature item-name'>{value.name}</div>
                                        <div className='item-feature item-price'>{value.price + " $"}</div>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                    <div className='item__title' id='itemCake'>CAKE</div>
                    <div className='row'>
                        {arrValue && arrValue.length > 0 && arrValue.map((value, index) => {
                            if (value.parentID === "CAKT00") {
                                return (
                                    <Link key={value.id} className='item col-3' to={`/detail/${value.id}`}>
                                        <img src={value.url} className="item-image"></img>
                                        <div className='item-feature item-name'>{value.name}</div>
                                        <div className='item-feature item-price'>{value.price + " $"}</div>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                    <div className='item__title' id='itemTea'>TEA</div>
                    <div className='row'>
                        {arrValue && arrValue.length > 0 && arrValue.map((value, index) => {
                            if (value.parentID === "TEAT00") {
                                return (
                                    <Link key={value.id} className='item col-3' to={`/detail/${value.id}`}>
                                        <img src={value.url} className="item-image"></img>
                                        <div className='item-feature item-name'>{value.name}</div>
                                        <div className='item-feature item-price'>{value.price + " $"}</div>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}
export default Homepage