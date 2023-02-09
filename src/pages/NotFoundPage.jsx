import { Link } from "react-router-dom";
import found from '../assets/not-found.png'

export function NotFoundPage() {
    return (
        <div className="background-not-found p-5 div-not">
          <div className="card bg-dark p-3 col-3 text-white text-center">
              <h1>Page Not Found</h1>
              <p className="fs-5 mt-3">Maybe you got a wrong link :(</p>
              <button className="btn btn-danger but"><Link className="text-center fs-3 lnk" to='/dashboard'>Go to the Main Page</Link></button>
          </div>
        </div>
    )
}