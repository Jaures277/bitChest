import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Components/header/Header'
import { useEffect } from 'react'
import { getcurrency } from '../../redux/slices/currency/currencySlice'
import './Home.css'
import ListCurrency from '../../Components/ListCurrency/ListCurrency'
import Footer from '../../Components/Footer/Footer'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getcurrency())
  }, [])

  const datacurrency = useSelector((state) => state.currencies.currencies)

  const { status } = useSelector((state) => state.auth.user.user)

  return (
    <>
      <Header />
      <main>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            {datacurrency && <ListCurrency datacurrency={datacurrency} status={status} />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
