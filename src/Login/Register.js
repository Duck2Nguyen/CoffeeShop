import { useEffect, useState } from 'react';
import './Register.scss'
import Header from '../Header/Header';
function Register() {


    const [value, setValue] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [arrValue, setarrValue] = useState([]);

    const onChangeFirstName = (event) => {
        setValue({
            firstName: event.target.value
        })
    }

    const onChangeLastName = (event) => {
        setValue({
            ...value,
            lastName: event.target.value
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

    const handleRegister = () => {
        console.log(value)
        setValue({
            email: '',
            firstName: '',
            lastName: '',
            password: ''
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
                    <input className='form-input' placeholder='First name' value={value.firstName} onChange={(event) => onChangeFirstName(event)}></input>
                    <input className='form-input' placeholder='Last name' value={value.lastName} onChange={(event) => onChangeLastName(event)}></input>
                    <input className='form-input' placeholder='Email' value={value.email} onChange={(event) => onChangeEmail(event)}></input>
                    <input className='form-input' placeholder='Password' value={value.password} onChange={(event) => onChangePassword(event)}></input>
                    <button type='submit' className='register-button' onClick={() => handleRegister()}>
                        CREATE ACCOUNT
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Register