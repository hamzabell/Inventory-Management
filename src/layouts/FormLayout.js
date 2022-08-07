import '../styles/form.layout.scss';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const  FormLayout = ({message, children}) => {

    const navigate = useNavigate();
    return (

        <>
            <div className='flex p-4'>
                <div className='nav-icon d-flex' onClick={() => navigate(-1)} >
                    <BiArrowBack/>
                    <h6>Back</h6>
                </div>
            </div>
            <div className='main-container d-flex flex-column align-items-center p-4'>
                { message && <h5 className='mb-3'>{message}</h5>}

                <div className='w-50'>
                {children}
                </div>
            </div>
        </>
    )
}

export default FormLayout