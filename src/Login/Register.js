import { useEffect, useState } from 'react';
import './Register.scss'
import Header from '../Header/Header';
import Footer from '../Header/Footer';
import { handleRegisterApi } from '../Services/userService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Register() {

    const [value, setValue] = useState({
        userName: '',
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    // var username = req.body.username;
    // var password = req.body.password;
    // var fullname = req.body.fullname;
    // var address = req.body.address;
    // var phone = req.body.phone;
    // var email = req.body.email;
    const [arrValue, setarrValue] = useState([]);

    const onChangeUsername = (event) => {
        setValue({
            ...value,
            userName: event.target.value
        })
    }

    const onChangeFullName = (event) => {
        setValue({
            ...value,
            fullName: event.target.value
        })
    }

    const onChangeEmail = (event) => {
        setValue({
            ...value,
            email: event.target.value
        })
    }

    const onChangePassword = (event) => {
        setValue({
            ...value,
            password: event.target.value
        })
    }

    const onChangePhone = (event) => {
        setValue({
            ...value,
            phone: event.target.value
        })
    }
    const onChangeAddress = (event) => {
        setValue({
            ...value,
            address: event.target.value
        })
    }
    const handleRegister = async () => {
        console.log(value)
        if (value.userName === '' || value.fullName === '' || value.email === '' || value.password === '' || value.phone === '' || value.address === '') {
            console.log("Invalid Input")
            toast.error("Invalid Input! Please try again!!!")
        }
        else {
            try {
                // console.log(data)
                let data = await handleRegisterApi(value)
                console.log(data)
                if (data.errCode === '0') {
                    toast.success("Register successfull!");
                    setValue({
                        userName: '',
                        fullName: '',
                        email: '',
                        password: '',
                        phone: '',
                        address: ''
                    })
                    setTimeout(() => {
                        window.location.assign("http://localhost:3000/login")
                    }, 3000);
                }
                else if (data.errCode === '1') {
                    toast.error("This username is already taken! Please try again!!!")
                    console.log('data', data)
                }
                else if (data.errCode === '2' || data.errCode === 3) {
                    toast.error("This email is already taken! Please try again!!!")
                }
            } catch (error) {
                console.log('loi cm rofoi')
                toast.error("Error Sever!!!")
                if (error.response) {
                    if (error.response.data) {
                        console.log("error lan 2")
                    }
                    console.log(error.response)
                }
            }
        }

        setValue({
            userName: '',
            fullName: '',
            email: '',
            password: '',
            phone: '',
            address: ''
        })
    }

    return (
        <div className='register-display'>
            <Header />
            <div className="container">
                <div className='register-title'>
                    <p className='register-name'>Register</p>
                    <p className='register-des'>Please fill in the fields below:</p>
                </div>
                <div className='register-form'>
                    <input className='form-input' placeholder='Username' value={value.userName} onChange={(event) => onChangeUsername(event)}></input>
                    <input className='form-input' placeholder='Fullname' value={value.fullName} onChange={(event) => onChangeFullName(event)}></input>
                    <input className='form-input' placeholder='Email' value={value.email} onChange={(event) => onChangeEmail(event)}></input>
                    <input className='form-input' placeholder='Password' value={value.password} onChange={(event) => onChangePassword(event)}></input>
                    <input className='form-input' placeholder='Phone' value={value.phone} onChange={(event) => onChangePhone(event)}></input>
                    <input className='form-input' placeholder='Address' value={value.address} onChange={(event) => onChangeAddress(event)}></input>
                    <button type='submit' className='register-button' onClick={() => handleRegister()}>
                        CREATE ACCOUNT
                    </button>
                </div>
            </div>
            <Footer />
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
export default Register