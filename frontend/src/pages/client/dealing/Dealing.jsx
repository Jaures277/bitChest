import Header from "../../../Components/Header/Header"
import { useEffect, useState } from "react"
import { getHistorikDealing, getWallet } from "../../../services/Dealing/Dealing"
import Sidebar from "../../../Components/Sidebar/Sidebar"

function Dealing() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }


  const [dealingdata, setDealingdata] = useState([])

  const InfoDealing = async () => {
    const response = await getHistorikDealing()
    setDealingdata(response.data)
  }

  console.log(dealingdata, 'trannnnnnnnnnnnnnnnnnnnn')

  useEffect(() => {
    InfoDealing(dealingdata)
  }, [])


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

                <th>Date d&apos; achat</th>
                <th>Status</th>
                <th>Date de vente</th>

              </tr>
            </thead>

            <tbody>

              {dealingdata?.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <tr key={item.id} className='text-center'>


                  <td >{item.name}</td>
                  <td >{item.quantity}</td>
                  <td >{item.rate} €</td>
                  <td>{item.created_at}</td>

                  {item.state == 'sold' &&
                    <td className="dealvendu">
                      VENDU
                    </td>
                  }

                  {item.state == 'own' &&
                    <td className="dealacheter">
                      ACHETER
                    </td>
                  }

                  <td>{item.updated_at}</td>
                </tr>

              ))}


            </tbody>
          </table>


        </main>

      </div>

    </>
  )
}

export default Dealing