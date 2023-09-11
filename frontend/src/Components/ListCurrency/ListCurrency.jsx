/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

function ListCurrency({ datacurrency, status }) {

    return (
        <div>

            <table className="table table-striped table-bordered">
                <thead className="table-light">
                    <tr className='text-center'>
                        <th>Nom</th>
                        <th>Cours actuel</th>
                        <th>Plus/Moins value</th>
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
                            <td >{item.name}</td>
                            <td >{item.today_quotation.rate}</td>
                            <td>{item.today_quotation.diff}</td>

                            { status.toLowerCase() == 'client' &&  
                            <>
                                <td>

                                    <button type="button" className="btn btn-danger"> Historique </button>

                                </td>
                                <td>
                                    <Link className='btn btn-primary' to={`/buycurrency/${item.id}`}> Acheter </Link>
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
