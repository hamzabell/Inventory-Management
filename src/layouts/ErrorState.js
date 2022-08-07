import { useNavigate } from "react-router-dom"


export default function ErrorState( ) {
    const navigate= useNavigate();
    return (
        <div className="jumbotron jumbotron-fluid bg-light p-3 rounded">
            <div className="container">
                <h1 className="display-3 text-danger">Error!</h1>
                <p className="lead">This model name/id state is wrong, please add a model with that name</p>
                <button onClick={() => navigate('/types')} className="btn btn-primary text-white mt-5" >+ Add New Type</button>
            </div>
        </div>
    )
}