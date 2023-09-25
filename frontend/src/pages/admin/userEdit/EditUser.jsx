import { useEffect, useState } from "react"
import Header from "../../../Components/Header/Header"
import Sidebar from "../../../Components/Sidebar/Sidebar"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { getInfoUser, updateInfoUser } from "../../../services/updateUser/updateUser"


function EditUser() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [infouseredit, setInfoUserEdit] = useState()

  const handleInputEdit = (e) => {
    const { name, value } = e.target
    const usereditCopy = { ...infouseredit }
    usereditCopy[name] = value
    setInfoUserEdit(usereditCopy)
  }
  const navigate = useNavigate()

  const { id } = useParams()

  const InfoUser = async (id) => {
    const response = await getInfoUser(id)
    const { data } = response
    setInfoUserEdit(data)
  }

  console.log(infouseredit)

  useEffect(() => {
    InfoUser(id)
  }, [id])

  const handleeditSubmit = async (e) => {
      e.preventDefault();
      await updateInfoUser(id, infouseredit);
      navigate("/userList");
  };



  return (
    <>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />


        <main className='main-container'>
          <div className='main-title'>
            <h3><Link className="css-retour" to={`/userList`}> Liste des utilisateurs </Link> -/- Modifier un utilisateur </h3>
          </div>

          <div className="container">
            <h2>Modifier un utilisateur</h2>
            <form action="#" method="post" onSubmit={handleeditSubmit}>

              <div className="form-group">
                <label htmlFor="firstName">Nom</label>
                <input type="text" className="form-control" value={infouseredit?.first_name} onChange={handleInputEdit} name="first_name" id="firstName" placeholder="" required="" />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Prenom(s)</label>
                <input type="text" className="form-control" value={infouseredit?.last_name} onChange={handleInputEdit} name="last_name" id="lastName" placeholder="" required="" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email :</label>
                <input type="email" className="form-control" value={infouseredit?.email} onChange={handleInputEdit} name="email" placeholder="" required="" />
              </div>


              <div className="form-group">
                <label htmlFor="country" className="form-label">Status</label>
                <select className="form-control" onChange={handleInputEdit} name="status" required="" defaultValue="Client">
                  <option>Choisir...</option>
                  <option defaultValue={'client'}>Client</option>
                  <option defaultValue={'admin'}>Admin</option>
                </select>
              </div>

              <div className="form-group">
                <input type="submit" value="Modifier" />
              </div>
            </form>
          </div>

        </main>

      </div>
    </>
  )
}

export default EditUser
