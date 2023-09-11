import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Components/header/Header'
import { useEffect } from 'react'
import { getcurrency } from '../../redux/slices/currency/currencySlice'
import './Home.css'
import ListCurrency from '../../Components/ListCurrency/ListCurrency'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getcurrency())
  }, [])

  const datacurrency = useSelector((state) => state.currencies.currencies)

  const {status} = useSelector((state) => state.auth.user.user)

  return (
    <div>

      <Header />


      <h1>Liste des cryptomonnaies</h1>

      {datacurrency && <ListCurrency datacurrency = {datacurrency} status = {status} />}

    </div>
  )
}

export default Home
