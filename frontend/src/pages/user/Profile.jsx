import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useCallback, useEffect, useState } from 'react'
import { updateUser } from '../../services/updateUser/updateUser'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const navigate = useNavigate()

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const user = useSelector(state => state?.auth?.user?.user)
  
  const [userUpdated, setUserUpdated] = useState(user)
  
  useEffect(() => {
    setUserUpdated(user);
  }, [user]);

  const handleInputs = (e) => {
    const { name, value } = e.target
    const copyOfUpdatedUser = { ...userUpdated }
    copyOfUpdatedUser[name] = value
    setUserUpdated(copyOfUpdatedUser)
  }
  const dispatch = useDispatch()

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateUser(userUpdated.id, userUpdated));
      navigate("/home");
    } catch (error) {
      // Gérez les erreurs ici si nécessaire
    }
  }, [dispatch, userUpdated]);


  return (
    <>
      <div className='grid-container'>

        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <main className='main-container'>
          <div className='main-title'>
            <h3>MON PROFILE</h3>
          </div>

          <div className="container">
            <h1>Mon profile</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="lastname">nom : </label>
                <input type="text" name='last_name' onChange={handleInputs} value={userUpdated?.last_name} id='last_name' />
              </div>

              <div className="form-group">
                <label htmlFor="firstname">prenom : </label>
                <input type="text" name='first_name' onChange={handleInputs} value={userUpdated?.first_name} id='first_name' />
              </div>

              <div className="form-group">
                <label htmlFor="email">email : </label>
                <input type="email" name='email' onChange={handleInputs} value={userUpdated?.email} id='email' />
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

export default Profile