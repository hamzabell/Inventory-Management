import '../styles/typescard.component.scss';
import { BsPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteType } from '../store/slices/typeSlice';
import { removeName } from '../store/slices/customSlice';

const TypesCard = ({ key, index, name, title, fields }) => {
    const dispatch = useDispatch();

    return (
        <div key={key} className="card mt-2">
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <h6 className="card-subtitle mb-2 text-muted text-capitalize">{title}</h6>
                {
                    fields.map(field => (
                        <div className='field d-flex'>
                            <p className="card-text text-lowercase font-italic">
                                {field.name}
                            </p>
                            <div className="card-badge">{field.type}</div>
                        </div>
                    ))
                }

                <div className='d-flex justify-content-end mt-2'>
                    <Link to={`/types/${index+1}`} className="card-link text-primary"><BsPencilFill /></Link>
                    <div onClick={() => {
                        dispatch(deleteType({ id: index }))
                        dispatch(removeName({ name }))}
                    } className="card-link text-danger cursor-pointer"><MdDelete /></div>
                </div>
            </div>
        </div>
    )
}


export default TypesCard;