/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

function ListCurrency({ datacurrency, status }) {

    return (
        <div>

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Cours actuel</th>
                        <th>Plus/Moins value</th>
                        { status.toLowerCase() == 'client' &&  
                            <>
                        <th> Historique </th>
                        <th> Achecter </th>
                        </>
                        } 
                    </tr>
                </thead>

                <tbody>

                    {datacurrency?.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <tr key={item.id}>
                            <td >{item.name}</td>
                            <td >{item.today_quotation.rate}</td>
                            <td>{item.today_quotation.diff}</td>

                            { status.toLowerCase() == 'client' &&  
                            <>
                                <td>

                                    <button> Historique </button>

                                </td>
                                <td>
                                    <Link to={`/buycurrency/${item.id}`}> Acheter </Link>
                                </td>
                            </>
                         } 
                        </tr>

                    ))}


                </tbody>

            </table>

        </div>
    )
}

export default ListCurrency
