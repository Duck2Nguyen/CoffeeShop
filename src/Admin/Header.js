import { useEffect, useState } from 'react';
import './Header.scss'
import { GrLogin, GrLogout } from 'react-icons/gr'
import { Link } from 'react-router-dom';


function Header() {
    const [value, setValue] = useState(false);
    const [arrValue, setarrValue] = useState([]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('dataLogin'));
        console.log('data login header ', data)

        if (data.isLogin === true) {
            setValue(true)
        }
        else {
            setValue(false)
        }
    }, [value])
    return (
        <div className='header-container'>
            <div className='header-left'>
                <Link className='header-item' to='/checkorder'>Manage Order </Link>
                <Link className='header-item' to='./admin'>Add Product</Link>
                <Link className='header-item' to='/addquantity'>Add Quantity</Link>
            </div>
            <div className='header-right'>
                <a className='header-item  header-icon' href='/login'> {value === true ? <GrLogout /> : <GrLogin />}</a>
            </div>

        </div>
    )
}
export default Header