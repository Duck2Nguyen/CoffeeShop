import { useState } from 'react';
import './Header.scss'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { GrLogin } from 'react-icons/gr'
function Header() {
    const handleInput = () => {
    }
    const [value, setValue] = useState('');
    const [arrValue, setarrValue] = useState([]);
    return (
        <div className='header-container'>
            <div className='header-left'>
                <a className='header-item' href="/home" exact>Shop</a>
                <div className='header-item'>Learn</div>
                <div className='header-item'>Visit</div>
                <div className='header-item'>Partner</div>
            </div>
            <div className='header-right'>
                <a className='header-item header-icon' href='/cart'> <BsFillCartCheckFill /></a>
                <a className='header-item  header-icon' href='/login'> <GrLogin /></a>
            </div>

        </div>
    )
}
export default Header