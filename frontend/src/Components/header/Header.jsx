/* eslint-disable react/no-unknown-property */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../utilities/logout'

function Header() {

    const user = useSelector(state => state.auth.user)

    return (
        <div>

            <nav className="navbar navbar-expand-md bg-dark sticky-top border-bottom" data-bs-theme="dark">
                <div className="container">
                    <a className="navbar-brand d-md-none" href="#">
                        <svg className="bi" width="24" height="24"></svg>
                        Aperture
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="#offcanvas" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="#offcanvas" aria-labelledby="#offcanvasLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="#offcanvasLabel">Aperture</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav flex-grow-1 justify-content-between">
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
                                            <Link className="nav-link" to="/wallet">Mon Portefeuille</Link>
                                        </li>

                                        <li className="nav-item">
                                            <span className="nav-link"> SOLDE : 0 </span>
                                        </li>

                                    </>

                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header