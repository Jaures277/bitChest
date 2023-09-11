import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div>
      <h1>PAGE 404 NOT FOUND</h1>
      <Link to='/home'>Retour</Link>
    </div>
  )
}

export default NotFound
