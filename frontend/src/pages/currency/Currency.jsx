import { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import ListCurrency from "../../Components/ListCurrency/ListCurrency"
import Sidebar from "../../Components/Sidebar/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { getcurrency } from "../../redux/slices/currency/currencySlice"

function Currency() {


  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
 
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getcurrency())
  }, [])

  const datacurrency = useSelector((state) => state.currencies.currencies)

  const { status } = useSelector((state) => state.auth.user.user)


  return (
    <>

      <div className='grid-container'>

        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <main className='main-container'>
            <div className='main-title'>
              <h3>Liste des crytomonnaies</h3>
            </div>
        
            <div className="container">
                {datacurrency && <ListCurrency datacurrency={datacurrency} status={status} />}
            </div>

        </main>

      </div>

    </>
  )
}

export default Currency
