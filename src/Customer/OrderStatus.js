import { useEffect, useState } from 'react';
import './OrderStatus.scss';
import Header from '../Header/Header'
import Footer from '../Header/Footer';
import { getUserOrders, changeStatus } from '../Services/userService'
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function OrderStatus() {
    const handleInput = () => {
    }
    // const [value, setValue] = useState([
    //     {
    //         orderID: 1235,
    //         username: 'Maria Anders',
    //         date: '26/7/2022',
    //         total: 1234,
    //         status: 'Processing',
    //     },
    //     {
    //         orderID: 1236,
    //         username: 'Andres Preses',
    //         date: '27/7/2022',
    //         total: 345,
    //         status: 'completed',
    //     },
    //     {
    //         orderID: 1237,
    //         username: 'Paul Pogba',
    //         date: '25/7/2022',
    //         total: 567,
    //         status: 'Processing',
    //     },
    //     {
    //         orderID: 1238,
    //         username: 'Ronaldo',
    //         date: '24/7/2022',
    //         total: 536,
    //         status: 'Processing',
    //     },
    //     {
    //         orderID: 1239,
    //         username: 'Messi Bucu',
    //         date: '23/7/2022',
    //         total: 765,
    //         status: 'Processing',
    //     },
    // ]);
    const [value, setValue] = useState([]);
    const [arrValue, setarrValue] = useState([]);

    const handleCancel = async (id) => {
        let data = {
            orderID: id,
            status: 'cancelled'
        }

        try {
            let res = await changeStatus(data);
            console.log("res", res)
            if (res && res.errCode === '0') {
                toast.success("Change status success!!")
                let array = value
                for (var i = 0; i < array.length; i++) {
                    if (array[i].orderID === parseInt(id)) {
                        array[i].status = 'cancelled'
                    }
                }
                setValue(prev => [...array])
            }
            if (res && res.errCode !== '0') {
                toast.error("Error to change status")
            }
        } catch (error) {
            console.log('loi cm rofoi')
            toast.error("Error to change status")
            // localStorage.setItem('isLogin', 'false')
            if (error.response) {
                if (error.response.data) {
                    console.log("error lan 2")
                }
                console.log(error.response)
            }
        }

    }


    useEffect(async () => {
        try {
            let user = JSON.parse(localStorage.getItem('dataLogin'));
            console.log(user)
            let data = await getUserOrders(user.data)
            console.log('data', data)
            if (data && data.data.length > 0 && data.errCode === '0') {
                var arrayValue = [];
                var array = data.data;
                console.log('array', array)
                array.map((value, index) => {
                    arrayValue.push(
                        {
                            orderID: value.orderID,
                            username: user.data.username,
                            date: moment(value.orderDate).format('DD/MM/YYYY'),
                            total: value.totalPayment,
                            status: value.orderStatus,
                        }
                    )
                })
                // // console.log('array', array)
                setValue(arrayValue)
                // // console.log('arrayvalue', arrValue)
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
    }, [])

    return (
        <div className='orderstatus-display'>
            <Header />
            <div className='orderstatus-container'>
                <div className='orderstatus-title'>Order Stutus</div>
                <table id="customers">
                    <tr>
                        <th>OrderID</th>
                        <th>UserName</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Handle</th>
                    </tr>
                    {value && value.length > 0 && value.map((value, index) => {
                        return (
                            <tr>
                                <td>{value.orderID}</td>
                                <td>{value.username}</td>
                                <td>{value.date}</td>
                                <td>{value.total}$</td>
                                <td>{value.status}</td>
                                <td>
                                    {/* <button className='btn' onClick={() => handleCancel(value.orderID)}>Canceled</button>
                                    <button className='btn' onClick={() => handleConfirm(value.orderID)}>Comfirmed</button>
                                    <button className='btn' onClick={() => handleProcess(value.orderID)}>Processed</button> */}
                                    <button className='btn'
                                        style={value.status !== 'processing' ? { display: "none" } : {}}
                                        onClick={() => handleCancel(value.orderID)}
                                    >Canceled</button>
                                    <Link className='btn'
                                        style={value.status === 'completed' ? {} : { display: "none" }}
                                        to={`/rate/${value.orderID}`}
                                    >Rate</Link>
                                </td>
                            </tr>
                        )
                    })}
                </table>
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
export default OrderStatus