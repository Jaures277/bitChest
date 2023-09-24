import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../utilities/logout'

// eslint-disable-next-line react/prop-types
function Sidebar({openSidebarToggle, OpenSidebar}) {
    const user = useSelector(state => state.auth.user)
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>


        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> BICHEST
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
                </>
                : ''
            }

            <li className='sidebar-list-item'>
                <Link to="/profile">
                    <BsPeopleFill className='icon' /> Mon compte
                </Link>
            </li>

            {
                user?.user?.status?.toLowerCase() == "client" &&

                <li className='sidebar-list-item'>
                    <Link to="/wallet">
                        <BsFillArchiveFill className='icon' /> Mon Portefeuille
                    </Link>
                </li>
            }

            {
                user?.token &&
                <button onClick={logOut} href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </button>
            }

            
        </ul>
    </aside>
  )
}

export default Sidebar