import { useEffect, useState } from 'react';
import './Header.scss'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { GrLogin, GrLogout } from 'react-icons/gr'
import { BiUser } from 'react-icons/bi'

function Header() {
    const handleInput = () => {
    }
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
                <a className='header-item' href="/home" exact>Shop</a>
                <div className='header-item'>Learn</div>
                <div className='header-item'>Visit</div>
                <div className='header-item'>Partner</div>
            </div>
            <div className='header-right'>
                {value === true && <a className='header-item header-icon' href='/orderstatus'> <BiUser /></a>}
                <a className='header-item header-icon' href='/cart'> <BsFillCartCheckFill /></a>
                <a className='header-item  header-icon' href='/login'> {value === true ? <GrLogout /> : <GrLogin />}</a>
            </div>

        </div>
    )
}
export default Header