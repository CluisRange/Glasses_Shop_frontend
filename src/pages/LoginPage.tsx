import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { loginUserAsync, setError } from '../slices/userSlice';
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from '../modules/Routes';
import BasePage from '../pages/BasePage';
import {BreadCrumbs} from '../components/BreadCrumbs';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);

    // Обработчик события изменения полей ввода (username и password)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработчки события нажатия на кнопку "Войти"
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(loginUserAsync(formData));
        navigate(`${ROUTES.LENSES}`); 
    };

    return (
        <BasePage>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.LOGIN}]}></BreadCrumbs>
        <Container style={{ maxWidth: '100%', marginTop: '0' }}> 
            <Container style={{ maxWidth: '400px', marginTop: '150px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Рады снова Вас видеть!</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" style={{ marginBottom: '15px' }}>
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Введите имя пользователя"
                        />
                    </Form.Group>
                    <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                    </Form.Group>
                    <Button variant='outline-danger' type="submit" style={{ width: '100%' }}>
                        Войти
                    </Button>
                </Form>
            </Container>
        </Container>
        </BasePage>
    );
};

export default LoginPage;