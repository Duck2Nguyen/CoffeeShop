import { useState, useEffect } from 'react';
import './Homepage.scss'
import Header from '../Header/Header'
import Footer from '../Header/Footer';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Image from '../Homepage/Image/Coffee/coffee.jpeg'
import { getAllCollection, getAllSortedProduct } from '../Services/userService'

function Homepage() {

    const [arrValue, setarrValue] = useState([]);
    const [cate, setCate] = useState('INC-productName')
    useEffect(async () => {
        try {
            let data = await getAllSortedProduct({
                sortBy: cate
            })
            console.log('data', data)
            if (data && data.length > 0) {
                var arrayValue = [];
                var array = data;
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
    }, [cate])

    // useEffect(async () => {
    //     let data2;
    //     data2 = await getAllSortedProduct({
    //         sortBy: cate
    //     })
    //     console.log('data2', data2)
    // }, [cate])

    const onChangeCategory = (event) => {
        setCate(prev => event.target.value)
    }
    return (
        <>
            <Header />
            <div className='homepage-container'>
                <div className='homepage-title'>Methodical</div>
                <div className="topnav">
                    <a activeClassName="active1" href="#itemCoffee" exact>COFFEE</a>
                    <a activeClassName="active1" href="#itemCake">CAKE</a>
                    <a activeClassName="active1" href="#itemTea">TEA</a>
                    <select className='sort-item' onChange={(event) => onChangeCategory(event)}>
                        <option value='INC-productName' selected>Sort</option>
                        <option value='INC-price'>Price, low to high</option>
                        <option value='DEC-price'>Price, high to low</option>
                        <option value='INC-productName'>Alphabetically, A-Z</option>
                        <option value='DEC-productName'>Alphabetically, Z-A</option>
                        <option value='DEC-rating'>Rating</option>
                    </select>
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
            <Footer />
        </>
    )
}
export default Homepage