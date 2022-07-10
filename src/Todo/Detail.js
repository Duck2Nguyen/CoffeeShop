import Header from './Header';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import './Detail.scss'
import axios from 'axios';


function Detail() {
    let { id } = useParams();
    console.log(id)
    const [dataBlog, setdataBlog] = useState([]);
    useEffect(async () => {
        let response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        console.log(response.data)
        setdataBlog(response.data)
    }, []);
    return (
        <div className='container'>
            <Header />
            <div key={dataBlog.id} className='item'>
                <div className='title'>{dataBlog.title}</div>
                <div className='body'>{dataBlog.body}</div>
                <button className='button'>
                    <Link to={'/blog'}>  Back</Link>
                </button>
            </div>
        </div>
    )
}
export default Detail