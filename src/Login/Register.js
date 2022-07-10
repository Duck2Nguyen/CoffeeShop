import { useState } from 'react';
import './Register.scss'
function Register() {
    const handleInput = () => {
    }
    const [value, setValue] = useState('');
    const [arrValue, setarrValue] = useState([]);
    return (
        <section>
            <div className="container">
                <div className='register-title'>
                    <p className='register-name'>Register</p>
                    <p className='register-des'>Please fill in the fields below:</p>
                </div>
                <div className='register-form'>
                    <input className='form-input' placeholder='First name'></input>
                    <input className='form-input' placeholder='Last name'></input>
                    <input className='form-input' placeholder='Email'></input>
                    <input className='form-input' placeholder='Password'></input>
                    <button type='submit' className='register-button'>
                        CREATE ACCOUNT
                    </button>
                </div>
            </div>
        </section>
    )
}
export default Register