import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useCallback, useState } from 'react'
import { updateUser } from '../../services/updateUser/updateUser'
import { Navigate } from 'react-router-dom'

function Profile() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const user = useSelector(state => state?.auth?.user?.user)
  console.log(user)
  const [userUpdated, setUserUpdated] = useState(user)
  console.log(userUpdated, 'uupdate')
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
      Navigate("/home");
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
          <h1>koko</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="lastname">nom : </label>
              <input type="text" name='last_name' onChange={handleInputs} value={userUpdated?.last_name} id='lastname' />
            </div>
            <div>
              <label htmlFor="firstname">prenom : </label>
              <input type="text" name='first_name' onChange={handleInputs} value={userUpdated?.first_name} id='firstname' />
            </div>
            <div>
              <label htmlFor="email">email : </label>
              <input type="email" name='email' onChange={handleInputs} value={userUpdated?.email} id='email' />
            </div>
            <button type='submit'>Envoyer</button>
          </form>
        </main>
      </div>
    </>
  )
}

export default Profile