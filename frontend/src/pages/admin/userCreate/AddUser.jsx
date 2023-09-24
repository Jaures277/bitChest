import { Link, useNavigate } from "react-router-dom"
import Header from "../../../Components/Header/Header"
import { useDispatch } from "react-redux"
import { useCallback, useState } from "react"
import { getUsers } from "../../../services/updateUser/updateUser"
import Sidebar from "../../../Components/Sidebar/Sidebar"
import './AddUser.css'

function AddUser() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [userprofil, setUserprofil] = useState({
    first_name: "",
    last_name: "",
    email: "",
    status: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInput = (e) => {
    const { name, value } = e.target
    const userprofilCopy = { ...userprofil }
    userprofilCopy[name] = value
    setUserprofil(userprofilCopy)
  }

  console.log(userprofil)

  const usersendSubmit = useCallback((e) => {
    e.preventDefault();
    (async () => {
      //console.log('envoyer')
      await dispatch(getUsers(userprofil))
      navigate("/home")
    })()
    // dispatch
  }, [dispatch, userprofil]);

  return (
    <div>

      <>
        <div className='grid-container'>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />


          <main className='main-container'>
            <div className='main-title'>
              <h3><Link className="css-retour" to={`/userList`}> Liste des utilisateurs </Link> - Ajouter un utilisateur </h3>
            </div>


              <div className="container">
                <h2>Formulaire de contact</h2>
                <form action="#" method="post">

                  <div className="form-group">
                    <label htmlFor="firstName">Nom</label>
                    <input type="text" className="form-control" onChange={handleInput} name="first_name" id="firstName" placeholder="" required="" />
                  </div>

                  <div className="form-group">
                  <label htmlFor="last_name">Prenom(s)</label>
                    <input type="text" className="form-control" onChange={handleInput} name="last_name" id="lastName" placeholder="" required="" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input type="email" className="form-control" onChange={handleInput} name="email" placeholder="" required="" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="motdepasse">Mot de passe :</label>
                    <input type="password" id="motdepasse" name="motdepasse" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country" className="form-label">Status</label>
                    <select className="form-control" onChange={handleInput} name="status" required="" defaultValue="Client">
                      <option>Choisir...</option>
                      <option defaultValue={'client'}>Client</option>
                      <option defaultValue={'admin'}>Admin</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input type="submit" value="Soumettre" />
                  </div>
                </form>
              </div>

          </main>

        </div>
      </>

    </div >
  )
}

export default AddUser
