import { FC, useEffect, useState } from 'react'

import BasePage from './BasePage'
import { Button, Form, Table, Alert, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useNavigate, useParams } from 'react-router-dom'
import LensCard from '../components/LensCard'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { AppDispatch } from '../store'
import { getGlassesOrder } from '../slices/draftGlassesOrderSlice'
import { deleteGlassesOrder, setError, setPhone, updateGlassesOrderFields, saveGlassesOrder } from '../slices/draftGlassesOrderSlice'

import '../assets/css/glassesOrderPage.css'
const GlassesOrderPage: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const { id } = useParams()

    const isDraft = useSelector((state: RootState) => state.draftGlassesOrderSlice.isDraft);

    const navigate = useNavigate()
    const {
        lenses,
        phone,
        order_sum,
        error,
    } = useSelector((state: RootState) => state.draftGlassesOrderSlice);
    
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
          try {
                await dispatch(deleteGlassesOrder(id)).unwrap();
                navigate(ROUTES.LENSES);
            } catch (error) {
                dispatch(setError(error));
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        dispatch(
            setPhone(value)
        );
      };

    const handleSaveFields = () => {
        if (id) {
            try {
                dispatch(updateGlassesOrderFields({ GlassesOrderId: id, phone: phone || '' }));
            } catch (error) {
                dispatch(setError(error));
            }
        }
    }

    const handleSaveGlassesOrder = () => {
        if (id) {
            try {
                dispatch(saveGlassesOrder(id));
                navigate(ROUTES.LENSES);
            } catch (error) {
                dispatch(setError(error));
            }
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getGlassesOrder(id));
        }
    }, [dispatch]);
    
    return (
    <>
        <BasePage>
            <BreadCrumbs crumbs={[
                {
                    label: 'Заказы',
                    path: '/glasses_orders'
                },
                {
                    label: 'Заказ №' + id?.toString() || '',
                }
            ]}></BreadCrumbs>
            <div className="container ">  
                <div className="fav-content mt-4">
                    <div className = "d-flex justify-content-between align-items-center">
                        <div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Информация о заказе</h2>
                            </div>
                            <div className="mb-4 ms-4">
                            {(!isDraft) ? (
                                <div className="h4">Контактный номер: {phone}</div>
                            ):(
                                <Form.Group controlId="phone" className="mb-3 d-flex align-items-center">
                                    <Form.Label className="h4 me-3">Контактный номер</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={phone || ''}
                                        onChange={handleInputChange}
                                        style={{ width: 'auto' }}
                                    />
                                </Form.Group>
                            )}
                                <h4>Сумма заказа: {order_sum}</h4>
                            </div>
                        </div>
                        <div>
                            {(isDraft) &&
                                <div className = "d-flex flex-column">
                                <Button className=" btnn" onClick={handleDelete}>
                                    Очистить
                                </Button>
                                <Button className="btnn" onClick={handleSaveFields}>
                                    Сохранить номер
                                </Button>
                                <Button className="btnn" onClick={handleSaveGlassesOrder}>
                                    Сохранить заказ
                                </Button>
                                </div>
                            }
                        </div>    
                    </div>
                    <h2>Выбранные линзы</h2>
                    <div className="d-flex flex-column">
                        {lenses.length ? (
                            lenses.map((lens, index) => (
                                <Col key={lens.lens?.lens_id || index} className="mb-3">
                                    <LensCard
                                        id={lens.lens?.lens_id || 11}
                                        imageUrl={lens.lens?.url || ''}
                                        name={lens.lens?.name || ''}
                                        price={lens.lens?.price || 0}
                                        dioptres={lens.dioptres || ''}
                                        isDraft = {isDraft}
                                    />
                                </Col>
                        ))
                        ) : (
                            <section className="cities-not-found">
                                <h1>К сожалению, пока ничего не найдено :</h1>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </BasePage>
    </>
  );
};

export default GlassesOrderPage;