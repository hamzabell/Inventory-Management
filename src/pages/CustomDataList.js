import {  useSelector } from "react-redux"
import { compose } from "../helpers";
import CommonLayout from "../layouts/CommonLayout";
import { selectAllTypes } from "../store/slices/typeSlice"
import '../styles/manage.page.scss';
import { GrAddCircle } from 'react-icons/gr';
import { useNavigate, useSearchParams } from "react-router-dom";
import GridSystem from "../components/GridSystem";
import { useEffect, useState } from "react";
import ErrorState from "../layouts/ErrorState";
import { selectAllCustom } from "../store/slices/customSlice";
import CustomCard from "../components/CustomCard";






const CustomDataList = () => {
    const types = useSelector(selectAllTypes);
    const customData = useSelector(selectAllCustom);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [error, setError] = useState(false);
    const [type, setType] = useState({})
    const [customKeys, setCustomKeys] = useState([])


    useEffect(() => {
        const paramModel = params.get('model');

        if(paramModel) {
            const custom = types.filter(type => type.name===paramModel)[0];

            if(custom) {
                const keys = custom?.fields.map(el => el.name);

                setType(custom);
                setCustomKeys(keys);
            } else {
                setError(true)
            }


        } else {
            setError(true);
        }
    },[params, types])

    return (

        <>
            { error && <ErrorState />}

            {!error && (
                <div className="p-3">

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">List</li>
                        </ol>
                    </nav>
                    <div className="d-flex justify-content-center" >

                        <div onClick={() => navigate(`/customform?model=${params.get('model')}`)} className="add border rounded border-success w-25 ml-4 mb-3 d-flex justify-content-center align-items-center cursor-pointer">
                                <p className="text-success">
                                    <GrAddCircle />
                                </p>
                                <p className="text-success ml-5 ">Add Item</p>
                        </div>
                    </div>


                    <GridSystem colCount={3} md={4}>
                        {   customData[type.name]?.length > 0 ? customData[type.name]?.map((d, index) => <CustomCard  key={`${index}-${d[type.title]}`} customName={type.name} name={d[type.title]} customKeys={customKeys} data={d} index={index} /> ) : [<p>No Data found.</p>] }

                    </GridSystem>
                </div>
            )}
        
        
        </>
    )
}




export default compose(
    CommonLayout
)(CustomDataList);