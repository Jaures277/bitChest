import React, { useCallback, useEffect, useState } from 'react'
import { login } from '../../redux/slices/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./login.css"
import imgLogin from './loginImg.jpeg'

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target
        const userCopy = { ...user }
        userCopy[name] = value
        setUser(userCopy)
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        (async () => {
            await dispatch(login(user))
            navigate("/home")
        })()
        // dispatch
    }, [dispatch, user]);

    const token = useSelector((state) => state?.auth?.user?.token)

    useEffect(() => {
        if (token) return navigate("/home")
    }, [])

    return (

        <div className="wrapper">
            <div className="container main">
                <div className="row">
                    <div className="col-md-6 side-image">


                        <img src={imgLogin} alt="imglogin" height={490} width={850} />


                    </div>
                    <div className="col-md-6 right">

                        <form onSubmit={handleSubmit}>
                            <div className="input-box">

                                <header> Se connecter </header>

                                <div className="input-field">
                                    <input type="text" className="input" onChange={handleInput} id="email" name='email' required="" autoComplete="off" />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input type="password" className="input" onChange={handleInput} id="pass" name='password' required="" />
                                    <label htmlFor="pass">Password</label>
                                </div>
                                <div className="input-field">
                                    <input type="submit" className="submit" value="Sign Up" />
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
