import { useState } from 'react';
import './Login.scss'
function Login() {
    const handleInput = () => {
    }
    const [value, setValue] = useState('');
    const [arrValue, setarrValue] = useState([]);
    return (
        <section>
            <div className="container">
                <div className='login-title'>
                    <p className='login-name'>Login</p>
                    <p className='login-des'>Please enter your e-mail and password:</p>
                </div>
                <div className='login-form'>
                    <input className='form-input' placeholder='Email'></input>
                    <input className='form-input' placeholder='Password'></input>
                    <button type='submit' className='login-button'>
                        Login
                    </button>
                    <div className='form-input form-redirect'>
                        New customer? <a href='./register'>Create an account</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login