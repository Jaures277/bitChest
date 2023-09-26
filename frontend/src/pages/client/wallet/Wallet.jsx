import Header from "../../../Components/Header/Header"
import { useEffect, useState } from "react"
import { getWallet, sellCurrencies } from "../../../services/Dealing/Dealing"
import Sidebar from "../../../Components/Sidebar/Sidebar"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

function Wallet() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [statusdata, setStatusdata] = useState('Own')

  const navigate = useNavigate()

  const [wallet, setWallet] = useState([])

  const InfoWallet = async (statusdata) => {
    console.log(statusdata)
    const response = await getWallet(statusdata)
    setWallet(response.data)
  }

  console.log(wallet, 'ffffffffffffffffffffffff')

  useEffect(() => {
    InfoWallet(statusdata)
  }, [])


  function sellCurrency(id) {

    Swal.fire({
      title: 'Voulez vous vendre la crypto selectionné ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          sellCurrencies(id)
          setWallet((allCurrency) =>
            allCurrency.filter((oneCurrency) => oneCurrency.id !== id)
          )
          navigate('/wallet')
          Swal.fire('la crypto selectionné a !', '', 'success')
          
        } catch (error) {
          Swal.fire('Veuillez reprendre ', '', 'info')
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
            <h3>Mon portefeuille</h3>
          </div>
          <br />
          <br />
          <br />

          <table className="table table-striped table-bordered">

            <thead className="table-light">
              <tr className='text-center'>
                <th>Nom</th>
                <th>Quantite</th>
                <th>Cours actuel</th>
                <th>Plus/Moins value</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {wallet?.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <tr key={item.id} className='text-center'>

                  <td >{item.name}</td>
                  <td >{item.quantity}</td>
                  <td>{item.rate} €</td>

                  <td className={item.diff >= 0 ? "positive" : "negative"}>
                    {item.diff.toFixed(2)}
                  </td>

                  <td>
                    <button onClick={() => sellCurrency(item.id)} className='button danger'> Vendre </button>
                  </td>

                </tr>

              ))}


            </tbody>
          </table>


        </main>

      </div>

    </>
  )
}

export default Wallet