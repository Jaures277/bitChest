import React from 'react'

const Login = () => {
    return (
        <div>

            <h4>Connexion</h4>
            <h6 className="fw-light">Sign in to continue.</h6>
            <form className="pt-3">
                <div className="form-group">
                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="mt-3">
                    <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index.html">SIGN IN</a>
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
