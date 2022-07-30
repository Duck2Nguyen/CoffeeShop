import { useEffect, useState } from 'react';
import './Login.scss'
import Header from '../Header/Header';
import { handleLoginApi } from '../Services/userService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import toast, { Toaster } from 'react-hot-toast';
// import { NotificationContainer, NotificationManager } from 'react-notifications';

function Login() {
    const [value, setValue] = useState({
        userName: '',
        password: ''
    });

    const onChangeInput = (event) => {
        // console.log(event.target.value)
        setValue({
            userName: event.target.value
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
            userName: '',
            password: ''
        })
    }

    const handleLogin2 = async () => {
        console.log('local', JSON.parse(localStorage.getItem('dataLogin')))
        let loginData = {}
        // console.log(value.userName, value.password)
        if (value.userName === '' || value.password === undefined) {
            toast.error("Input Invalid");
            setValue({
                userName: '',
                password: ''
            })
            return;
        }
        try {
            let data = await handleLoginApi(value.userName, value.password)
            if (data && data.errCode !== 0) {
                console.log("error")
                loginData = {
                    isLogin: false,
                    data: {}
                }
                localStorage.setItem('dataLogin', JSON.stringify(loginData))
                toast.error("Username or password is incorrect! Please try again!!!");
                setValue({
                    userName: '',
                    password: ''
                })
            }
            if (data && data.errCode === 0) {
                toast.success("Login successfull!");
                console.log('data', data)
                loginData = {
                    isLogin: true,
                    data: data.data
                }
                localStorage.setItem('dataLogin', JSON.stringify(loginData))
                console.log('check local', JSON.parse(localStorage.getItem('dataLogin')))
                setValue({
                    userName: '',
                    password: ''
                })
                setTimeout(() => {
                    window.location.assign("http://localhost:3000")
                }, 3000);

                // this.props.history.push(`/home`)
            }
        } catch (error) {
            toast.error("Login Error");
            console.log('loi cm rofoi')
            localStorage.setItem('isLogin', 'false')
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
                    <p className='login-des'>Please enter your username and password:</p>
                </div>
                <div className='login-form'>
                    <input className='form-input' placeholder='Username' value={value.userName} onChange={(event) => onChangeInput(event)}></input>
                    <input className='form-input' type='password' placeholder='Password' value={value.password} onChange={(event) => onChangePassword(event)}></input>
                    <button type='submit' className='login-button' onClick={() => handleLogin2()}>
                        Login
                    </button>
                    <div className='form-input form-redirect'>
                        New customer? <a href='./register'>Create an account</a>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
export default Login