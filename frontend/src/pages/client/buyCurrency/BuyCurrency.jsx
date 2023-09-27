import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getInfoBuyCurrency } from "../../../services/BuyCurency/BuyCurrency"
import { postBuyCurrency } from "../../../services/Currency/Currency"
import Header from "../../../Components/Header/Header"
import Sidebar from "../../../Components/Sidebar/Sidebar"
import './BuyCurrency.css'

function BuyCurrency() {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    const [currencyDetail, setCurrencyDetail] = useState([])

    const { id } = useParams()

    const InfoBuyCurrency = async (id) => {
        const response = await getInfoBuyCurrency(id)
        const { data } = response
        setCurrencyDetail(data)
    }

    useEffect(() => {
        InfoBuyCurrency(id)
    }, [])


    const [quantity, setQuantity] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await postBuyCurrency(id, quantity)
        console.log(response)
        if (response?.status == 200) {
            navigate('/wallet')
        }
    };


    return (


        <>
            <div className='grid-container'>

                <Header OpenSidebar={OpenSidebar} />

                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

                <main className='container-buy'>
                    <div className='main-title'>
                        <h3>Acheter une cryptomonnaie</h3>
                    </div>

                    <div className="alert alert-danger" role="alert">
                            <span>Cours actuel du {currencyDetail?.currency?.name} est : {currencyDetail?.quotations?.rate} </span>
                        </div>
 

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <input type="text" className="form-control" name="quantity" onChange={(e) => setQuantity(e.target.value)} placeholder="Ajouter la quantite" required="" />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Acheter" />
                            </div>

                        </form>


                </main>

            </div>

        </>

    )
}

export default BuyCurrency