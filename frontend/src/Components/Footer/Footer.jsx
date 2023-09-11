import { useSelector } from "react-redux"
import { logOut } from "../../utilities/logout"

function Footer() {
    const user = useSelector(state => state.auth.user)
    return (


        <footer className="footer mt-auto py-3 bg-body-tertiary">
            <div className="container">
                {
                    user?.token &&

                    <button type="button" onClick={logOut} className="btn btn-dark"> Deconnexion </button>

                }
            </div>
        </footer>

    )
}

export default Footer