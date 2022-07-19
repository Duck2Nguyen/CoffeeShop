import { useEffect, useState } from 'react';
import './Login.scss'
import Header from '../Header/Header';
import { handleLoginApi } from '../Services/userService'


function Login() {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [arrValue, setarrValue] = useState([]);

    const onChangeInput = (event) => {
        // console.log(event.target.value)
        setValue({
            email: event.target.value
        })
    }


    const onChangePassword = (event) => {
        // console.log(event.target.value)
        setValue({
            ...value,
            password: event.target.value
        })
    }

    const handleLogin = () => {
        console.log(value)
        setValue({
            email: '',
            password: ''
        })
    }

    const handleLogin2 = async () => {
        try {
            let data = await handleLoginApi(value.email, value.password)
            if (data && data.errCode !== 0) {
                console.log("error")
            }
            if (data && data.errCode === 0) {
                console.log(data)
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

    }

    return (
        <div className='login-display'>
            <Header />
            <div className="container login-container">
                <div className='login-title'>
                    <p className='login-name'>Login</p>
                    <p className='login-des'>Please enter your e-mail and password:</p>
                </div>
                <div className='login-form'>
                    <input className='form-input' placeholder='Email' value={value.email} onChange={(event) => onChangeInput(event)}></input>
                    <input className='form-input' type='password' placeholder='Password' value={value.password} onChange={(event) => onChangePassword(event)}></input>
                    <button type='submit' className='login-button' onClick={() => handleLogin2()}>
                        Login
                    </button>
                    <div className='form-input form-redirect'>
                        New customer? <a href='./register'>Create an account</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login