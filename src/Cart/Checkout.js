import { useEffect, useState } from 'react';
import './Checkout.scss'
import Header from '../Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addOrder } from '../Services/userService'

function Checkout() {
    const handleInput = () => {
    }
    const [value, setValue] = useState({});
    const [total, setTotal] = useState(0);
    const [arrValue, setarrValue] = useState([]);

    useState(async () => {
        setValue(JSON.parse(localStorage.getItem('dataLogin')).data)
    }, [])

    const onChangeEmail = (event) => {
        setValue({
            ...value,
            email: event.target.value
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
    const handleCheckout = async () => {
        // console.log(value)
        let data = JSON.parse(localStorage.getItem('cartTotal'))
        let data2 = JSON.parse(localStorage.getItem('cartData'))
        // console.log('data1', JSON.parse(data))
        // console.log('data2', JSON.parse(data2))

        let dataOrder = {
            totalPayment: data,
            data: data2,
            value: value
        }
        console.log(dataOrder)

        try {
            let errCode = await addOrder(dataOrder)
            console.log(errCode)
            localStorage.removeItem('cartData');
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
    useEffect(async () => {
        if (localStorage) {
            // localStorage.setItem('cartTotal', tong)
            var item = localStorage.getItem('cartTotal');
            console.log(JSON.parse(item))
            setTotal(JSON.parse(item))
            // window.location.reload();
        } else {
            alert('No local')
        }
    }, [])

    return (
        <div className='checkout-display'>
            <Header />
            <div className="container">
                <div className='checkout-title'>
                    <p className='checkout-name'>Checkout</p>
                    <p className='checkout-des'>Please fill in the fields below:</p>
                </div>
                <div className='checkout-form'>
                    <input className='form-input' placeholder='Fullname' defaultValue={value.fullname} disabled></input>
                    <input className='form-input' placeholder='Email' value={value.email} onChange={(event) => onChangeEmail(event)}></input>
                    <input className='form-input' placeholder='Phone' value={value.phone} onChange={(event) => onChangePhone(event)}></input>
                    <input className='form-input' placeholder='Address' value={value.address} onChange={(event) => onChangeAddress(event)}></input>
                    <div className='form-input edit total'> Total Price: {total}$ </div>
                    <div className='form-input edit'> Phương thức thanh toán: Thanh toán khi nhận hàng (mặc định) </div>
                    <button type='submit' className='checkout-button' onClick={() => handleCheckout()}>
                        Checkout
                    </button>
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
export default Checkout