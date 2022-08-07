import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   useNavigate, useSearchParams } from "react-router-dom";
import { compose } from "../helpers";
import CommonLayout from "../layouts/CommonLayout";
import ErrorState from "../layouts/ErrorState";
import FormLayout from "../layouts/FormLayout";
import { addCustom, editCustomModel, selectAllCustom } from "../store/slices/customSlice";
import { selectAllTypes } from "../store/slices/typeSlice";

function CustomForm() {
    const [params] = useSearchParams();
    const [customForm, setCustomForm] = useState({ })
    const [initForm, setFormStructure] = useState({})
    const [isErrorModel, setErrorModel] = useState(false);
    const [customTypes, setCustomTypes] = useState([]);
    const [customKeys, setCustomKeys] = useState([])
    const [mode, setMode] =useState('save')
    const types = useSelector(selectAllTypes);
    const customData = useSelector(selectAllCustom);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        const id = params.get('id');
        const model = params.get('model');

        if(model){
            const custom = types.filter(type => type.name===model)[0]?.fields;
            if(custom && custom.length !== 0) {
                const formStructure = custom.reduce((a, v) => ({ ...a, [v.name]: "" }), {});
                const formTypes = custom.reduce((a, v) => ({ ...a, [v.name]: v.type }), {});
                const keys = custom?.map(el => el.name);



                setCustomForm(formStructure);
                setFormStructure(formStructure);
                setCustomTypes(formTypes);
                setCustomKeys(keys)
            } else {
                setErrorModel(true);
            }
        }


        if(id) {
        
            setMode('edit');
            if(customData[model][id]){
                setCustomForm(customData[model][id])
            } else {
                setErrorModel(true);

            }
        }

    }, [customData, params, types])


    const handleChange = (e, type=null) => {
        setCustomForm(prev => ({
            ...prev,
            [e.target.name]: type ? e.target.checked : e.target.value
        }))
    }

    const isValid = () => Object.keys(customForm).every(el => customForm[el] !== "");


    const handleSubmit = (e) => {
        e.preventDefault();
        const name = params.get('model');
        const id = params.get('id');


        if(mode === 'save') {
            dispatch(addCustom({ name, data: customForm }))
     
            setCustomForm(initForm);
        } else {
            console.log(customForm)
            dispatch(editCustomModel({ id, name, data: customForm }));
            navigate(`/customlist?model=${name}`)
        }

    }
    return (
     
        <FormLayout message={!isErrorModel ? 'Add Some Data': ''}>
            {
                isErrorModel && <ErrorState />
            }

            {
                (!isErrorModel && customForm) && (
                    <form className='customForm' onSubmit={handleSubmit}>
                        

                        {
                            customKeys.map((val, index)  => {
                                return customTypes[val] !== 'checkbox' ? (
                                    
                                        <div className="form-group" key={index}>
                                    
                                            <label htmlFor={val}>{val}</label>
                                            <input name={val} type={customTypes[val]} className="form-control" id={val} value={customForm[val]} onChange={handleChange}/>
                                        </div>
                                    
                                ):(
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name={val}  checked={customForm[val]} onChange={(e) => handleChange(e, 'checkbox')} id="checkField" />
                                        <label className="form-check-label" for="checkField">
                                            {val}
                                        </label>
                                    </div>
                                )

                                
                            })
                        }

                        <button type='submit'  disabled={!isValid()} className='btn btn-success w-100 mt-5 text-capitalize'>
                            {mode}
                        </button>

                    </form>
                )
            }
        </FormLayout>
    )
}


export default compose(
    CommonLayout
)(CustomForm);