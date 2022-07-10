import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import './Blog.scss'
import Header from './Header';


function Blog() {
    const [dataBlog, setdataBlog] = useState([]);
    useEffect(async () => {
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(response.data)
        setdataBlog(response.data)
    }, [])
    return (
        <div className='container2'>
            <Header />
            <div className='content'>
                {dataBlog.map((value, index) => {
                    return (
                        <div key={value.id} className='item'>
                            <div className='title'>{value.title}</div>
                            <div className='body'>{value.body}</div>
                            <button>
                                <Link to={`/blog/${value.id}`}>  View detail</Link>
                            </button>
                        </div>
                    )
                })}
            </div>

        </div>

    )
}
export default Blog
