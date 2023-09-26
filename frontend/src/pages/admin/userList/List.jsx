import Header from "../../../Components/Header/Header"
import { useEffect, useState } from "react"
import { getUsers } from "../../../services/updateUser/updateUser"
import { Link } from "react-router-dom"
import Sidebar from "../../../Components/Sidebar/Sidebar"
import './List.css'
import Swal from "sweetalert2"

function List() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [listUsers, setListUsers] = useState([])

  const InfoUsers = async (id) => {
    const response = await getUsers(id)
    const { data } = response
    setListUsers(data)
  }

  useEffect(() => {
    InfoUsers()
  }, [])



  function deleteUser(id) {

    Swal.fire({
      title: 'Voulez vous supprimer ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          deleteUser(id)
          setListUsers((allUser)=>
            allUser.filter((oneUser)=>oneUser.id !== id )
          )
          Swal.fire('Supprimé!', '', 'success')
        } catch (error) {
          Swal.fire('Voulez vous supprimer ?', '', 'info')
        }
      }
    }
    )
  }


  return (

    <>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />


        <main className='main-container'>
          <div className='main-title'>
            <h3>Liste des utilisateurs</h3>
          </div>

          <Link type="button" to={`/addUser`} className="button primary"> Ajouter un utilisateur </Link>
          <br />
          <br />
          <div>

            <table className="table table-striped table-bordered">

              <thead className="table-light">
                <tr className='text-center'>
                  <th>Nom</th>
                  <th>Prenon</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th> </th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>

                {listUsers?.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <tr key={item.id} className='text-center'>
                    <td >{item.first_name}</td>
                    <td >{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td>

                      <Link to={`/editUser/${item.id}`} className="button secondary"> Modifier </Link>

                    </td>
                    <td>
                      <button onClick={() => deleteUser(item.id)} className='button danger'> Supprimer </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </>


  )
}

export default List