import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getInfoBuyCurrency } from "../../../services/BuyCurency/BuyCurrency"
import { postBuyCurrency } from "../../../services/Currency/Currency"


function BuyCurrency() {

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

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await postBuyCurrency(id, quantity)
        console.log(response)
        if(response?.status == 200){
            navigate('/home') 
        }
    };


    return (
        <div>
            <h1>
                BuyCurrency
            </h1>

            <div>
                <span>Cours actuel du {currencyDetail?.currency?.name} est : {currencyDetail?.quotations?.rate} </span>


                <form onSubmit={handleSubmit}>
                    <input className="" name="quantity" onChange={(e)=>setQuantity(e.target.value)} placeholder="Ajouter la quantite" />
                    <br/>
                    <button className="btn-danger">Acheter</button>
                </form>


            </div>


        </div>
    )
}

export default BuyCurrency