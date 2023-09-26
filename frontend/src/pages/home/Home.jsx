import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Tooltip } from 'bootstrap'
import { useSelector } from 'react-redux'


function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const user = useSelector(state => state.auth.user)

  const data = [
    {
      name: 'Bitcoin',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Ethereum',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Ripple',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Bitcoin-cash',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Cardano',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Litecoin',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Nem',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />


      <main className='main-container'>
        <div className='main-title'>
          <h3>DASHBOARD | Utilisateur connecté : {user?.user?.last_name}</h3>
        </div>

        {
          user?.user?.status?.toLowerCase() == "admin" ?
            <>
              <div className='main-cards'>
                
                <div className='card'>
                  <div className='card-inner'>
                    <h3>CRYPTO</h3>
                    <BsFillArchiveFill className='card_icon' />
                  </div>
                  <h1>10</h1>
                </div>

                <div className='card'>
                  <div className='card-inner'>
                    <h3>UTILISATEURS</h3>
                    <BsFillGrid3X3GapFill className='card_icon' />
                  </div>
                  <h1>12</h1>
                </div>
                
              </div>
            </>
            : ''
        }


        {
          user?.user?.status?.toLowerCase() == "client" ?
            <>
              <div className='charts'>

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={800}
                    height={400}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>

              </div>
            </>
            : ''
        }
      </main>


    </div>
  )
}

export default Home
