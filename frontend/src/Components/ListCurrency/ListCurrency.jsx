/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

function ListCurrency({ datacurrency, status }) {

    return (

        <div>

            <table className="table table-striped table-bordered">
                <thead className="table-light">
                    <tr className='text-center'>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Cours actuel</th>
                        { status.toLowerCase() == 'client' &&  
                            <>
                        <th> </th>
                        <th> </th>
                        </>
                        } 
                    </tr>
                </thead>

                <tbody>

                    {datacurrency?.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <tr key={item.id} className='text-center'>
                            <td><img src={item.image} /></td>
                            <td >{item.name}</td>
                            <td >{item.today_quotation.rate} €</td>

                            { status.toLowerCase() == 'client' &&  
                            <>
                                <td>
                                    <Link to={`/editUser/${item.id}`} className="button secondary"> Historique </Link>
                                </td>
                                <td>
                                    <Link className='button danger' to={`/buycurrency/${item.id}`}> Acheter </Link>
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
