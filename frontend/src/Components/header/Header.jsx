import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../utilities/logout'

function Header() {

    const user = useSelector(state => state.auth.user)

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
                    user?.user?.status?.toLowerCase() == "admin" ?
                        <li className="nav-item">
                            <Link className="nav-link" to="/userList">Liste des utilisateurs</Link>
                        </li>
                        : ''
                }

                {
                    user?.user?.status?.toLowerCase() == "client" && 
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wallet">Portefeuille</Link>
                        </li>

                        <li className="nav-item">
                             <span className="nav-link"> SOLDE : 0 </span>
                        </li>
                        
                    </>
                    
                }

                {
                    user?.token &&

                    <li className="nav-item">
                        <button onClick={logOut}>Deconnexion</button>
                    </li>

                }

                    

            </ul>
        </div>
    )
}

export default Header