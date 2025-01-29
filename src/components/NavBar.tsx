import { FC } from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ROUTES } from '../modules/Routes'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../store';
import { logoutUserAsync } from '../slices/userSlice'; 
import { setSearchLensValuesAction, getLensesList } from '../slices/lensesSlice';
import { resetGlassesOrders } from '../slices/GlassesOrdersSlice';
import { resetDraftGlassesOrder } from '../slices/draftGlassesOrderSlice';


import '../assets/css/Navbar.css'

const NavigationBar: FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const username = useSelector((state: RootState) => state.user.username); // получение значения username из стора
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); // получение из стора значения флага состояния приложения

    // Обработчик события нажатия на кнопку "Выйти"
    const handleExit = async ()  => {
        await dispatch(logoutUserAsync());
        dispatch(setSearchLensValuesAction({name: '', minPrice: '', maxPrice: ''})); // можно реализовать в `extrareducers` у функции logoutUserAsynс
        dispatch(resetGlassesOrders())
        dispatch(resetDraftGlassesOrder())
        navigate('/lenses'); // переход на страницу списка услуг
        await dispatch(getLensesList()); // для показа очищения поля поиска
    }

    return (
        <Navbar expand = "lg" className="border nav w-100">
            <Navbar.Brand as={Link} to={ROUTES.HOME}>
                <img src="..\src\assets\img\HeaderPic.jpg" style={{ width: '15rem', marginLeft: '1rem' }} className='brandimg'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: '1rem' }}/>
            <Navbar.Collapse id="basic-navbar-nav">
            {isAuthenticated? (
                <Nav className="d-flex w-100 ms-4 align-items-center" style={{ fontSize: '1.5rem' }}>
                <Nav.Link  as={Link} to={ROUTES.LENSES}>Линзы</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.GLASSES_ORDER}> Заказы</Nav.Link>  
                <Nav.Link  as={Link} to={ROUTES.ACCOUNT} className="d-flex ms-lg-auto username">{ username }</Nav.Link>  
                <Button variant="primary" type="submit" className="logout-btn me-lg-5" onClick={ handleExit }>
                    Выйти
                </Button>
                </Nav>
            ):(
                <Nav className="NavBarTextStyle d-flex justify-content-between w-100 me-auto ms-4">
                <Nav.Link  as={Link} to={ROUTES.LENSES} className='NavBarTextStyle'>Линзы</Nav.Link>
                <Nav.Link  as={Link} to={ROUTES.LOGIN} className="NavBarTextStyle d-flex ms-lg-auto">Вход</Nav.Link>
                <Nav.Link  as={Link} to={ROUTES.REGISTRATION} className='NavBarTextStyle me-5'>Регистрация</Nav.Link>
                </Nav>
            )}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar