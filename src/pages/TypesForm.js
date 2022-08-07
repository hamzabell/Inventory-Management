import '../styles/typesform.page.scss';
import { useEffect, useState } from "react";
import { MdDeleteOutline } from 'react-icons/md';
import FormLayout from '../layouts/FormLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addType,  editType, selectAllTypes } from '../store/slices/typeSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { compose } from '../helpers';
import CommonLayout from '../layouts/CommonLayout';
import { editCustomName } from '../store/slices/customSlice';




const INIT_TYPE = {
    name: "",
    title: "",
    fields: [],
    valid: false,
    fieldValid: false
}

const VALID_FIELD_TYPES = ['text', 'date', 'checkbox', 'number'];

const Field = ({ key, name, type, onChange, index, remove }) => (
    <div key={key} className='d-flex custom-field'>
        <input name="name" type="text"  placeholder="Field Name" value={name} className='form-control' onChange={(e) => onChange(e, index)}/>
        <select name="type" value={type} className='form-control w-25' onChange={(e) => onChange(e, index)}>
            {
                VALID_FIELD_TYPES.map(fd => (
                    <option value={fd}>{fd}</option>
                ))
            }
        </select>

        <div className='w-5 mt-2 cursor-pointer' onClick={() => remove(index)}>
            <MdDeleteOutline />
        </div>
    </div>
)

const TypesForm =() => {
    const param = useParams();
    const [actionState, setActionState] = useState('save');
    const [prev, setPrev] = useState("");
    const [currentType, setCurrentType] = useState(INIT_TYPE);
    const types = useSelector(selectAllTypes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        const { id } = param;

        if(id) {
            setActionState('edit');
            setCurrentType({ ...types[id - 1] })
            setPrev(types[id - 1].name)
        }
    }, [param, types])


    const checkFieldValidity =({name, value}) => {
        return name !== "" && value !== "";
    }



    const handleChange = (event) => {
        const update = {
            ...currentType,
            [event.target.name]: event.target.value
        }
        setCurrentType(prev => ({
            ...prev,
            ...update,
            valid: checkFieldValidity({ name: update.name, value: update.title })
        }))
    }


    const handleFieldChange = (event, index) => {
        
        const prevField = currentType.fields[index];
        const updatedField = {
            ...prevField,
            [event.target.name]: event.target.value
        }

       const oldData = [ ...currentType.fields ];


       oldData[index] = updatedField;


        setCurrentType(prev => ({
            ...prev,
            fields: oldData,
            fieldValid: checkFieldValidity(updatedField)
        }))
    }

    const addField = () => {
        setCurrentType(prev => ({
            ...prev,
            fields: [
                ...prev.fields,
                {
                    name: "",
                    type: 'text'
                }
            ],
            fieldValid: false
        }))
    }

    const removeField = (index) => {
        const updatedFields = currentType.fields.filter((field, i) => i !== index );
        setCurrentType(prev => ({
            ...prev,
            fields: [
                ...updatedFields
            ]
        }))
    }
    
    const handleSubmit =(e) => {
        e.preventDefault();


        if(actionState === 'save') {
            dispatch(addType({ ...currentType }));
    
            setCurrentType({ ...INIT_TYPE })
        } else {
            dispatch(editType({ id: param.id - 1, data: currentType }));
            dispatch(editCustomName({ prev, newName: currentType.name }));
            navigate('/manage')
        }

    }

   


    return (
        <FormLayout message={param.id ? 'Edit Type': 'Add Type'}>
            {console.log(currentType)}
            <div className="container ">
                <form className='customForm' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="typeName">Name</label>
                        <input name="name" type="text" value={currentType.name} className="form-control" id="typeName" onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="typeTitle">Title</label>
                        <select name="title"  className="form-control" id="typeTitle" onChange={handleChange}>
                            <option disabled value="null" selected>Select the title for this type</option>
                            {
                                currentType?.fields.map((field, index) => (
                                    <option key={index} value={field?.name}>{field?.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <h6 className='mt-4 font-weight-bolder'>Add Custom Fields:</h6>
                    <hr />

                    <div className='d-flex flex-column fields'>
                        {
                            currentType?.fields.map((field, index) => (
                                <Field name={field.name} type={field.type} key={index} index={index}  onChange={handleFieldChange} remove={removeField}/>
                            ))
                        }
                    </div>
                    <div className='d-flex justify-content-end'>
                            <button type='button' className='btn btn-primary text-white' onClick={addField}>Add Field</button>
                    </div>

                    <button type='submit' disabled={!currentType.valid || !currentType.fieldValid} className='btn btn-success w-100 mt-5 text-capitalize'>
                        {actionState}
                    </button>

                </form>
            </div>
        </FormLayout>
    )
}

export default compose(
    CommonLayout
)(TypesForm);