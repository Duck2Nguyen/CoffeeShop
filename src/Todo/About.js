import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './About.scss'
import Header from './Header';


function About() {
    const [dataCovid, setdataCovid] = useState([]);
    useEffect(async () => {
        let response = await axios.get('https://api.covid19api.com/country/vietnam?from=2022-02-01T00:00:00Z&to=2022-04-04T00:00:00Z')
        console.log(response.data)
        setdataCovid(response.data)
    }, [])
    return (
        <div className='container'>
            <Header />
            <table id="customers">
                <tr>
                    <th>Date</th>
                    <th>Confirmed</th>
                    <th>Active</th>
                    <th>Deaths</th>
                    <th>Recovered</th>
                </tr>
                {dataCovid.map((value, index) => {
                    return (
                        <tr>
                            <td>{moment(value.Date).format('DD/MM/YYYY')}</td>
                            <td>{value.Confirmed}</td>
                            <td>{value.Active}</td>
                            <td>{value.Deaths}</td>
                            <td>{value.Recovered}</td>
                        </tr>
                    )
                })}
            </table>
        </div>

    )
}
export default About