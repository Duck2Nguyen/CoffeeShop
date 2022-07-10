import { useState, useEffect } from 'react';
import './Homepage.scss'
import Header from '../Header/Header'
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Image from '../Homepage/Image/Coffee/coffee.jpeg'

function Homepage() {

    const [arrValue, setarrValue] = useState([]);
    useEffect(async () => {
        var array = [];
        for (var i = 1; i < 13; i++) {
            array.push(
                {
                    id: i,
                    url: Image,
                    name: `Blue Boy ${i}`,
                    price: '17.00'
                }
            )
        }
        console.log(array);
        setarrValue(array)
    }, [])

    return (
        <>
            <Header />
            <div className='homepage-container'>
                <div className='homepage-title'>Methodical</div>
                <div className="topnav">
                    <NavLink activeClassName="active1" to="/" exact>Whole Bean Coffe</NavLink>
                    <NavLink activeClassName="active1" to="/tea">TEA</NavLink>
                    <NavLink activeClassName="active1" to="/merch">MERCH</NavLink>
                    <NavLink activeClassName="active1" to="/brew-gear">BERW GEAR</NavLink>
                    <NavLink activeClassName="active1" to="/subcriptions">SUBCIPTIONS</NavLink>
                </div>
                <div className='container coffee'>
                    <div className='row'>
                        {arrValue.map((value, index) => {
                            return (
                                <Link key={value.id} className='item col-3' to={`/detail/${value.id}`}>
                                    <img src={value.url} className="item-image"></img>
                                    <div className='item-feature item-name'>{value.name}</div>
                                    <div className='item-feature item-price'>{value.price}</div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}
export default Homepage