import { useState, useEffect } from 'react';
import './AddQuantity.scss'
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAllProduct, changeQuantity } from '../Services/userService'

function AddQuantity() {
    const handleInput = () => {
    }
    // const [value, setValue] = useState([
    //     {
    //         productID: "CAKT01P01",
    //         categoryID: "CAKT01",
    //         name: 'Vegan Black Forest Cake',
    //         price: 332,
    //         quantity: 12,
    //     },
    //     {
    //         productID: "CAKT01P02",
    //         categoryID: "CAKT02",
    //         name: 'Vagan Tangy Cocoa Round Cake',
    //         price: 43,
    //         quantity: 23,
    //     },
    //     {
    //         productID: "CAKT01P03",
    //         categoryID: "CAKT01",
    //         name: 'Pink Hearty Rose Strawberry Cake',
    //         price: 54,
    //         quantity: 45,
    //     },
    //     {
    //         productID: "CAKT01P04",
    //         categoryID: "CAKT02",
    //         name: 'Play Nice',
    //         price: 23,
    //         quantity: 4,
    //     },
    //     {
    //         productID: "CAKT01P05",
    //         categoryID: "CAKT03",
    //         name: 'Imaginary Collective',
    //         price: 45,
    //         quantity: 9,
    //     },
    // ]);

    const [value, setValue] = useState([]);

    const [quantity, setQuantity] = useState();

    useEffect(async () => {
        try {
            let data = await getAllProduct()
            console.log('data', data)
            if (data && data.data.length > 0 && data.errCode === '0') {
                var arrayValue = [];
                var array = data.data;
                console.log('array', array)
                array.map((value, index) => {
                    arrayValue.push(
                        {

                            productID: value.productID,
                            categoryID: value.categoryID,
                            name: value.name,
                            price: value.price,
                            quantity: value.quantity
                        }
                    )
                })
                setValue(arrayValue)
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

    const onChangeInput = (event) => {
        setQuantity(event.target.value)
    }

    const handleAddQuantity = async (productID) => {
        console.log(productID, quantity)
        let data = {
            productID: productID,
            quantity: quantity
        }

        try {
            let res = await changeQuantity(data);
            console.log("res", res)
            if (res && res.errCode === '0') {
                toast.success("Change quantity success!!")
                let array = value
                for (var i = 0; i < array.length; i++) {
                    if (array[i].productID === productID) {
                        array[i].quantity = parseInt(array[i].quantity) + parseInt(quantity)
                    }
                }
                setValue(prev => [...array])
            }
            if (res && res.errCode !== '0') {
                toast.error("Error to change quantity")
            }
        } catch (error) {
            console.log('loi cm rofoi')
            toast.error("Error to change quantity")
            // localStorage.setItem('isLogin', 'false')
            if (error.response) {
                if (error.response.data) {
                    console.log("error lan 2")
                }
                console.log(error.response)
            }
        }
        setQuantity(0)
    }

    return (
        <div className='addQuantity-display'>
            <Header />
            <div className='addQuantity-container'>
                <div className='addQuantity-title'>Add Quantity</div>
                <table id="customers">
                    <tr>
                        <th>ProductID</th>
                        <th>CategoryID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Add Quantity</th>
                        {/* orderid, username, date, total, status */}
                    </tr>
                    {value && value.length > 0 && value.map((value, index) => {
                        return (
                            <tr>
                                <td>{value.productID}</td>
                                <td>{value.categoryID}</td>
                                <td>{value.name}</td>
                                <td>{value.price}$</td>
                                <td>{value.quantity}</td>
                                <td>
                                    <input className='input-quantity' onChange={(event) => onChangeInput(event)}></input>
                                    <button className='btn' onClick={() => handleAddQuantity(value.productID)}>Add</button>
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
export default AddQuantity