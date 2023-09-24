import Header from "../../../Components/Header/Header"
import { useEffect, useState } from "react"
import { getWallet } from "../../../services/Dealing/Dealing"
import Footer from "../../../Components/Footer/Footer"

function Wallet() {

  const [statusdata, setStatusdata] = useState('Own')

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



  return (
    <>
      <Header />
      <main>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">

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

                    <td >{item.quantity}</td>
                    <td>{item.quoting_dealings_id}</td>
                    <td>{item.rate}</td>

                    <td>{item.rate}</td>
                    <td>
                      <button className="btn btn-danger" type="button">Vendre</button>
                    </td>

                  </tr>

                ))}


              </tbody>
            </table>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Wallet