import { useState } from 'react';
import './Admin.scss'
import { CommonUtils } from '../ultis';

import { addNewProduct } from '../Services/userService'

function Admin() {
    const handleInput = () => {
    }
    const [arrValue, setarrValue] = useState([]);
    const [imageBase64, setImage] = useState('');

    const [value, setValue] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        image: '',
        description: ''
    });
    const onChangeName = (event) => {
        setValue({
            ...value,
            name: event.target.value
        })
    }

    const onChangeCategory = (event) => {
        setValue({
            ...value,
            category: event.target.value
        })
    }

    const onChangeQuantity = (event) => {
        setValue({
            ...value,
            quantity: event.target.value
        })
    }

    const onChangePrice = (event) => {
        setValue({
            ...value,
            price: event.target.value
        })
    }

    const onChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log("base 64", base64)
            setValue({
                ...value,
                image: base64
            })
        }

    }

    const onChangeDescription = (event) => {
        setValue({
            ...value,
            description: event.target.value
        })
    }

    const handleSave = async () => {
        // setImage(value.image)
        console.log(value)

        try {
            let data = await addNewProduct(value);
            console.log("data", data)
        } catch (error) {
            // toast.error("Login Error");
            console.log('loi cm rofoi')
            localStorage.setItem('isLogin', 'false')
            if (error.response) {
                if (error.response.data) {
                    console.log("error lan 2")
                }
                console.log(error.response)
            }
        }

        setValue({
            name: '',
            category: '',
            quantity: '',
            price: '',
            image: '',
            description: ''
        })
        // window.location.assign("http://localhost:3000/admin")
        window.location.reload();
    }

    return (
        <div className='admin-input'>
            <div className="mb-3 input-item">
                <label className="form-label">Product name</label>
                <input type="text" placeholder="Name" className="form-control" required
                    value={value.name}
                    onChange={(event) => onChangeName(event)}
                />
            </div>
            <div className="mb-3 input-item">
                <label for="inputCategory" className="form-label">Category</label>
                <select name="category" className="form-select" aria-label="Default select example"
                    onChange={(event) => onChangeCategory(event)}
                >
                    <option selected>Choose category</option>
                    <option value="COFT01">Coffee</option>
                    <option value="TEAT01">Tea</option>
                    <option value="CAKT01">Cake</option>
                </select>
            </div>
            <div className="mb-3 input-item">
                <label for="inputQuantity" className="form-label">Quantity</label>
                <input name="quantity" type="text" className="form-control" id="inputQuantity"
                    value={value.quantity}
                    onChange={(event) => onChangeQuantity(event)}
                />
            </div>
            <div className="mb-3 input-item">
                <label for="inputPrice" className="form-label">Price</label>
                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input name="price" type="text" className="form-control" id="inputPrice"
                        value={value.price}
                        onChange={(event) => onChangePrice(event)}
                    />
                </div>
            </div>
            <div className="mb-3 input-item">
                <label for="loadImage" className="form-label">Upload image</label>
                <div className="input-group mb-3">
                    <input name="image" type="file" className="form-control" id="loadImage"
                        onChange={(event) => onChangeImage(event)}
                    />
                </div>
            </div>
            <div className="mb-3 input-item">
                <label for="inputDescription" className="form-label">Description</label>
                <textarea name="description" className="form-control" id="inputDescription" rows="3"
                    value={value.description}
                    onChange={(event) => onChangeDescription(event)}
                ></textarea>
            </div>

            <button type="submit" className="btn btn-primary"
                onClick={() => handleSave()}
            >Submit</button>

            <div className="bg-image section-outstanding-doctor"
                style={{ backgroundImage: `url(${imageBase64})` }}
            />
        </div>
    )
}
export default Admin