import { FC } from 'react'

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

import '../assets/css/fonts.css'
import '../assets/css/lensCard.css'
import { useLocation } from 'react-router-dom';

import { getLensesList } from '../slices/lensesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { addLensToGlassesOrder, deleteLensFromGlassesOrder, updateLensDioptres, setLenses} from '../slices/draftGlassesOrderSlice';

interface LensCardProps {
    id: number
    name: string
    imageUrl: string
    price: number
    dioptres: string
    isDraft?: boolean;
}

const LensCard: FC<LensCardProps> = (
    { id, name, imageUrl, price, dioptres, isDraft }
) => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const glasses_order_id = useSelector((state: RootState) => state.draftGlassesOrderSlice.glasses_order_id) || 0;
    const lenses = useSelector((state: RootState) => state.draftGlassesOrderSlice.lenses);
    const { pathname } = useLocation();

    const handleAdd = async () => {
        if (id) {
            await dispatch(addLensToGlassesOrder(id));
            await dispatch(getLensesList()); // Для обновления отображения состояния иконки "корзины" 
        }
    }

    const handleDeleteLensFromOrder = async () => {
        if (glasses_order_id && id) {
            await dispatch(deleteLensFromGlassesOrder({GlassesOrderId: glasses_order_id, lensId: id}));
        }
    }

    const handleUpdateLens = async () => {
        if (id) {
            await dispatch(updateLensDioptres({GlassesOrderId: glasses_order_id, lensId: id, dioptres: dioptres}));
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        const updatedLenses = lenses.map(lens => 
            lens.lens?.lens_id === id ? { ...lens, dioptres: value } : lens
        );
        dispatch(setLenses(updatedLenses));
    };

    if (pathname === "/lenses") return (
        <Card  style={{ width: '18rem', height: '25rem' }} >
            <Link className='align-self-start' style={{ width: '100%' }} to={`${ROUTES.LENSES}/${id}`}>
                <Card.Img src={imageUrl.replace('http://localhost:9000', '') || '/src/assets/img/unknownLens.jpg'}/>
            </Link>
            <Card.Body className='d-flex flex-column text-center' style = {{justifyContent:'space-between'}}>
                <Card.Title style={{fontFamily:'Monrope'}}>{name}</Card.Title>
                <Card.Title style={{fontFamily:'Monrope'}}>{price} руб.</Card.Title>
                {(isAuthenticated == true ) && (
                <Button className="add-lens-btn" onClick={() => handleAdd()}>
                    Добавить
                </Button>
                )}   
            </Card.Body>
        </Card>
    )
    if (pathname.includes("/glasses_order")) {
        return (
            <div className='d-flex gap-4 border p-3'>
            <Link to={`${ROUTES.LENSES}/${id}`} className='w-50'>
                <img src={imageUrl}></img>
            </Link>
            <div className='d-flex w-75 justify-content-center align-items-center text-center text-uppercase'>
                <h3>{name}</h3>
            </div>
            <div className='separator'></div>
            <div className='d-flex flex-column p-2 justify-content-center align-items-center'>
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex'>
                        {isDraft? (
                            <div>
                                <Form.Group controlId="phone" className=" d-flex align-items-center">
                                    <Form.Label className="h4 me-3">Диоптрий:</Form.Label>
                                    <Form.Control className='me-2'
                                        type="text"
                                        value={dioptres || ''}
                                        onChange={handleInputChange}
                                        style={{ width: 'auto', maxWidth: '5em'}}
                                    />
                                <Button className="add-lens-btn me-2" onClick={() => handleUpdateLens()}>
                                    Изменить
                                </Button>
                                <Button className="add-lens-btn" onClick={() => handleDeleteLensFromOrder()}>
                                    Удалить
                                </Button>
                                </Form.Group>
                            </div>
                        ):(
                            <div style={{ fontSize: '1.4em', marginRight: '5em', width: '11rem'}}>Диоптрий: {dioptres}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


export default LensCard