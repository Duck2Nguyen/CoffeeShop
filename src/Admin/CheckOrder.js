import { useEffect, useState } from 'react';
import './CheckOrder.scss';
import Header from '../Header/Header'
import { getAllOrder, changeStatus } from '../Services/userService'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CheckOrder() {
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
    //         status: 'Processing',
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

    const handleConfirm = async (id) => {
        let data = {
            orderID: id,
            status: 'completed'
        }

        try {
            let res = await changeStatus(data);
            console.log("res", res)
            if (res && res.errCode === '0') {
                toast.success("Change status success!!")
                let array = value
                for (var i = 0; i < array.length; i++) {
                    if (array[i].orderID === parseInt(id)) {
                        array[i].status = 'completed'
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

    const handleProcess = async (id) => {
        let data = {
            orderID: id,
            status: 'processing'
        }

        try {
            let res = await changeStatus(data);
            console.log("res", res)
            if (res && res.errCode === '0') {
                toast.success("Change status success!!")
                let array = value
                for (var i = 0; i < array.length; i++) {
                    if (array[i].orderID === parseInt(id)) {
                        array[i].status = 'processing'
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
            let data = await getAllOrder()
            console.log('data', data)
            if (data && data.data.length > 0 && data.errCode === '0') {
                var arrayValue = [];
                var array = data.data;
                console.log('array', array)
                array.map((value, index) => {
                    arrayValue.push(
                        {
                            orderID: value.orderID,
                            username: value.username,
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
        <div className='checkorder-display'>
            <Header />
            <div className='checkorder-container'>
                <table id="customers">
                    <tr>
                        <th>OrderID</th>
                        <th>UserName</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Handle</th>
                        {/* orderid, username, date, total, status */}
                    </tr>
                    {/* <tr>
                        <td>1235</td>
                        <td>Maria Anders</td>
                        <td>26/7/2022</td>
                        <td>12345$</td>
                        <td>Processing</td>
                        <td>
                            <button className='btn'>Canceled</button>
                            <button className='btn'>Comfirmed</button>
                            <button className='btn'>Processing</button>
                        </td>
                    </tr> */}
                    {value && value.length > 0 && value.map((value, index) => {
                        return (
                            <tr>
                                <td>{value.orderID}</td>
                                <td>{value.username}</td>
                                <td>{value.date}</td>
                                <td>{value.total}$</td>
                                <td>{value.status}</td>
                                <td>
                                    <button className='btn' onClick={() => handleCancel(value.orderID)}>Canceled</button>
                                    <button className='btn' onClick={() => handleConfirm(value.orderID)}>Comfirmed</button>
                                    <button className='btn' onClick={() => handleProcess(value.orderID)}>Processed</button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
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
export default CheckOrder