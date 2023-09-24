import { useSelector } from "react-redux"

function Footer() {
    const user = useSelector(state => state.auth.user)
    return (


        <footer className="footer mt-auto py-3 bg-body-tertiary">
            
        </footer>

    )
}

export default Footer