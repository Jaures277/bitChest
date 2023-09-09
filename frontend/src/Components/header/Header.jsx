import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {

    const user = useSelector(state => state.auth.user.user)

    return (
        <div>
            <ul className="nav nav-pills nav-fill">

                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/home">Liste des cryptomonnaies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Mon compte</Link>
                </li>


                {
                    user?.status?.toLowerCase() == "admin" ?  
                    <li className="nav-item">
                        <Link className="nav-link" to="/userList">Liste des utilisateurs</Link>
                    </li>
                    : ''
                }

                {
                    user?.status?.toLowerCase() == "client" ?  
                    <li className="nav-item">
                        <Link className="nav-link" to="/wallet">Portefeuille</Link>
                    </li>
                    : ''
                }

                



            </ul>
        </div>
    )
}

export default Header