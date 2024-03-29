import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill }
    from 'react-icons/bs'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../utilities/logout'
import { useEffect } from 'react'
import { getinfowallet } from '../../redux/slices/infoWallet/walletSlice'

// eslint-disable-next-line react/prop-types
function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getinfowallet())
    }, [])

    const datawallet = useSelector((state) => state?.walletinfo?.walletinfo?.sold)

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>


            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> BITCHEST
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>

                {
                    user?.user?.status?.toLowerCase() == "admin" ?
                        <>
                            <li className='sidebar-list-item'>
                                <Link to="/home">
                                    <BsGrid1X2Fill className='icon' /> Dashboard
                                </Link>
                            </li>

                            <li className='sidebar-list-item'>
                                <Link to="/currency">
                                    <BsGrid1X2Fill className='icon' /> Les crytomonnaies
                                </Link>
                            </li>

                            <li className='sidebar-list-item'>
                                <Link to="/userList">
                                    <BsGrid1X2Fill className='icon' /> Liste des utilisateurs
                                </Link>
                            </li>
                            <li className='sidebar-list-item'>
                                <Link to="/profile">
                                    <BsPeopleFill className='icon' /> Mon compte
                                </Link>
                            </li>
                        </>
                        : ''
                }



                {
                    user?.user?.status?.toLowerCase() == "client" &&
                    <>
                        <li className='sidebar-list-item'>
                            <Link to="/home">
                                <BsGrid1X2Fill className='icon' /> Dashboard
                            </Link>
                        </li>

                        <li className='sidebar-list-item'>
                            <Link to="/currency">
                                <BsGrid1X2Fill className='icon' /> Les crytomonnaies
                            </Link>
                        </li>

                        <li className='sidebar-list-item'>
                            <Link to="/wallet">
                                <BsFillArchiveFill className='icon' /> Mon Portefeuille
                            </Link>
                        </li>

                        <li className='sidebar-list-item'>
                            <Link to="/dealing">
                                <BsGrid1X2Fill className='icon' /> Mes transactions
                            </Link>
                        </li>

                        <li className='sidebar-list-item'>
                            <Link to="/profile">
                                <BsPeopleFill className='icon' /> Mon compte
                            </Link>
                        </li>

                        <li className='sidebar-list-item'>
                            <h3>
                                Solde : {datawallet} €
                            </h3>
                        </li>
                    </>
                }



                {
                    user?.token &&
                    <>
                        <li className='sidebar-list-item'>
                            <button className="button-like-link" onClick={logOut}>
                                Deconnexion
                            </button>
                        </li>
                    </>
                }


            </ul>
        </aside>
    )
}

export default Sidebar