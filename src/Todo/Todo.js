import { useState } from 'react';
import logo from '../../src/logo.svg';
import Header from './Header';
import './Todo.scss'
function Todo() {
    const handleInput = () => {
        handleArrValue(value)
        setValue('')
    }
    const handleOnChangeInput = (event) => {
        setValue(event.target.value)
    }
    const handleArrValue = (value1) => {
        let array = arrValue;
        array.push(value1);
        setarrValue(array);
    }
    const handleDelete = (tmpValue) => {
        const array = arrValue.filter((value3) => {
            return value3 !== tmpValue
        })
        console.log(array)
        setarrValue(array)
    }
    const [value, setValue] = useState('');
    const [arrValue, setarrValue] = useState([]);
    return (
        <div className='container_todo'>
            <div className="App-header">
                <Header />
                <img src={logo} className="App-logo" alt="logo" />
                <div className='todo-list'>
                    {arrValue.map((value2, index) => {
                        return (
                            <div className='todo-child'>
                                <span>{index + 1}   </span>
                                <span key={index} className="todo-name">{value2}</span>
                                <span onClick={() => handleDelete(value2)}>   x</span>
                            </div>
                        )
                    })
                    }
                    <input className="w3-input"
                        type="text"
                        value={value}
                        onChange={event => handleOnChangeInput(event)}
                    />
                    <button onClick={handleInput}>Click me</button>
                </div >
            </div>
        </div>
    )
}
export default Todo