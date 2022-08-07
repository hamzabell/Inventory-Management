import { useDispatch, useSelector } from "react-redux"
import TypesCard from "../components/TypesCard";
import { compose } from "../helpers";
import CommonLayout from "../layouts/CommonLayout";
import { selectAllTypes } from "../store/slices/typeSlice"
import '../styles/manage.page.scss';
import { GrAddCircle } from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
import GridSystem from "../components/GridSystem";






const Manage = () => {
    const types = useSelector(selectAllTypes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteType = (id) => dispatch(deleteType({ id }))
    return (
        <div className="p-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Manage types</li>
                </ol>
            </nav>
            <div className="d-flex justify-content-center" >

                <div onClick={() => navigate('/types')} className="add border rounded border-success w-25 ml-4 mb-3 d-flex justify-content-center align-items-center cursor-pointer">
                        <p className="text-success">
                            <GrAddCircle />
                        </p>
                        <p className="text-success ml-5 ">Add Type</p>
                </div>
            </div>

      

            <GridSystem colCount={3} md={4}>

                {   types.length > 0 ? types.map((type, index) => <TypesCard name={type.name} title={type.title} fields={type.fields} index={index} key={index}/> ) : [<p>No types are found.</p>] }
            </GridSystem>
        </div>
    )
}




export default compose(
    CommonLayout
)(Manage);