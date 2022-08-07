import '../styles/typescard.component.scss';
import { BsPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../store/slices/customSlice';


const CustomCard = ({  customName, index, name, customKeys, data }) => {
    const dispatch = useDispatch();

    return (
        <div className="card mt-2">
            <div className="card-body">
                <h4 className="card-title">{name}</h4>

                {
                    customKeys.map(key => {
                        return typeof(data[key]) === 'boolean' ?
                                <div className='field d-flex'>
                                    <p className="card-text text-lowercase font-italic">
                                        {data[key] ? 'Yes' : 'No' || '[None]'}
                                    </p>
                                    <div className="card-badge">{key}</div>
                                </div>
                            : (
                                <div className='field d-flex'>
                                    <p className="card-text text-lowercase font-italic">
                                        {data[key] || '[None]'}
                                    </p>
                                    <div className="card-badge">{key}</div>
                                </div>
                            )
                    })
                }

                <div className='d-flex justify-content-end mt-2'>
                    <Link to={`/customform?model=${customName}&id=${index}`} className="card-link text-primary"><BsPencilFill /></Link>
                    <div onClick={() => dispatch(deleteItem({ name: customName, id: index }))}className="card-link text-danger cursor-pointer"><MdDelete /></div>
                </div>
            </div>
        </div>
    )
}


export default CustomCard;