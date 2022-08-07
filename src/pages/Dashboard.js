import AddTypesForm from "./TypesForm";
import FormLayout from "../layouts/FormLayout";
import { compose } from "../helpers";
import CommonLayout from "../layouts/CommonLayout";
import { useSelector } from "react-redux";
import { selectAllCustom } from "../store/slices/customSlice";
import GridSystem from "../components/GridSystem";
import { useNavigate } from "react-router-dom";


const Card = ({ count, message,  to}) => (
    <div className="card p-5 cursor-pointer" onClick={to}>
         <h4 class="card-title text-center">{count}</h4>
        <div className="card-body text-center"> {message}</div>
    </div>
)

function Dashboard({}) {
    const customData = useSelector(selectAllCustom);
    const navigate= useNavigate()
    return (
        <div className="container">
            <GridSystem colCount={3} md={4}>
                {   Object.keys(customData)?.length > 0 ? Object.keys(customData)?.map((d, index) =>  <Card to={() => navigate(`/customlist?model=${d}`)} count={customData[d].length}  message={`Total count of ${d}s`}/> ) : [<p>No Data found.</p>] }

            </GridSystem>
        </div>
    )
}


export default compose(
    CommonLayout
)(Dashboard);