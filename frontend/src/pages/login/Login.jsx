import React, { useCallback, useState } from 'react'
import { login } from '../../redux/slices/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [user, setUser] = useState({
      email: "",
      password: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInput = (e)=> {
      const {name, value} = e.target
      const userCopy = {...user}
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
  }, [dispatch,user]);

    console.log(user)

    return (
        <div>

            <h4>Connexion</h4>
            <h6 className="fw-light">Sign in to continue.</h6>
            <form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control form-control-lg" onChange={handleInput} name='email' id="exampleInputEmail1" placeholder="Username" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-lg" onChange={handleInput} name='password' id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                        <label className="form-check-label text-muted">
                            <input type="checkbox" className="form-check-input" />
                            Keep me signed in
                        </label>
                    </div>
                    <a href="#" className="auth-link text-black">Forgot password?</a>
                </div>

                <div className="text-center mt-4 fw-light">
                    Creer un compte <a href="register.html" className="text-primary">Create</a>
                </div>
            </form>

        </div>
    )
}

export default Login
