import { FC, useState, useEffect } from 'react'

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

import { getLensesList, updateLens, uploadImage, uploadLens } from '../slices/lensesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Lens } from '../api/Api';

import { addLensToGlassesOrder, deleteLensFromGlassesOrder, updateLensDioptres, setLenses, setError} from '../slices/draftGlassesOrderSlice';

interface LensCardProps {
    id?: number
    name?: string
    imageUrl?: string
    price?: number
    status?: string
    description?: string
}

const LensToChangeCard: FC<LensCardProps> = (
    { id, name, imageUrl, price, status, description }
) => {
    const [formData, setFormData] = useState<Lens>({ lens_id: 0, name: '', url: '', price: 0, status: '', description: '' });
    const dispatch = useDispatch<AppDispatch>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const lenses = useSelector((state: RootState) => state.lenses.lenses);
    
    const handleUpload = async (id: string) => {
        if (!selectedFile) {
            alert("Пожалуйста, выберите изображение для загрузки");
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            await dispatch(uploadImage({ id, file: selectedFile })).unwrap();
            // Обновите URL изображения после успешной загрузки
            // setFormData((prevData) => ({
            //     ...prevData,
            //     url: URL.createObjectURL(selectedFile),
            // }));
            alert("Изображение успешно загружено!");
        } catch (error) {
            console.error("Ошибка при загрузке изображения:", error);
            alert("Произошла ошибка при загрузке изображения.");
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSave = async () => {
        if (id) {
            try {
                    dispatch(updateLens(formData));
            } catch (error) {
                dispatch(setError(error));
            }
        }else{
            try {
                formData.status='active';
                dispatch(uploadLens(formData));
            } catch (error) {
            dispatch(setError(error));
            }
    }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    useEffect(() => {      
        setFormData({
            lens_id: id,
            name: name || '',
            url: imageUrl || '',
            price: price || 0,
            status: status || '',
            description: description || ''
        });
    },[dispatch])
    ;

    return (
        
            <Card className='shadow shadow-bg w-100' >
                <Card.Body className='d-flex flex-row align-items-center'>
                    
                    <div className='d-flex flex-row w-100 h-100 flex-grow'>
                    
                    <Card.Title style={{width: '6em', fontSize: '1.2em'}}>{`Линза №${id}`}</Card.Title>
                    <div style={{ width: '106px', height: '76px'}}>
                        <img className='mx-2'src={formData.url || '/src/assets/img/unknownLens.jpg'} style={{ width: '106px', height: '76px', objectFit: 'cover' }}></img>
                    </div>
                    <Form className='d-flex flex-row flex-grow justify-content-between w-100 ms-4'>
                        <div className='d-flex flex-row'>
                            <Form.Group className='me-2' style={{width: '13em'}} controlId="formType">
                                <Form.Label>Название</Form.Label>
                                <Form.Control
                                    type="text"
                                    name = "name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                />
                            </Form.Group>
                            <Form.Group className='me-2' style={{width: '7em'}} controlId="formPrice">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control
                                    type="text"
                                    name = "price"
                                    value={formData.price || 0}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                />
                            </Form.Group>
                            <Form.Group className='me-2' style={{width: '7em'}}  controlId="formStatus">
                                <Form.Label>Статус</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    value={formData.status || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                >
                                    <option value="active">Доступен</option>
                                    <option value="deleted">Недоступен</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='me-2' style={{width: '20em'}}>
                                <Form.Label>Выберите изображение</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="form-control2"   
                                />
                            </Form.Group>
                            <Form.Group className='me-2 flex-grow-1' style={{width: '20em'}}>
                                <Form.Label>Описание</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                />
                            </Form.Group>
                        </div>
                        <div className='d-flex flex-row justify-content-end'>
                            {id && (<Button className="me-1" style={{height: '5em', width: '9em'}} variant="outline-danger " onClick={() => handleUpload(id.toString())}>Изменить изображение</Button>)}
                            {id && (<Button  variant="outline-danger "  style={{height: '5em', width: '8em', marginLeft: "10px"}} onClick={handleSave}>Подтвердить изменения</Button>)}
                            {!id && (<Button  variant="outline-danger "  style={{height: '5em', width: '8em', marginLeft: "10px"}} onClick={handleSave}>добавить</Button>)}
                        </div>
                    </Form>
                    </div>
                </Card.Body>
            </Card>
    )
}


export default LensToChangeCard