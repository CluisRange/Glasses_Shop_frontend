import { FC } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { ROUTES } from '../modules/Routes'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { acceptOrder, rejectOrder } from '../slices/GlassesOrdersSlice'
import '../assets/css/glassesOrderCard.css'

interface IGlassesOrderCardProps {
    id: number
    status: string
    time_created: string
    time_formed: string
    time_ended: string
    creator: string
    moderator: string
    phone: string
    order_sum: number
    qr?: string
}

const GlassesOrderCard: FC<IGlassesOrderCardProps> = (
    { id, status, time_created, time_formed, time_ended, creator, moderator, phone, order_sum, qr }
) => {
    const isCurator = useSelector((state: RootState) => state.user.isCurator)
    const dispatch = useDispatch<AppDispatch>()

    const handleAcceptOrder = async () => {
        try {
            await dispatch(acceptOrder(id))
            alert('Заказ принят успешно')
        } catch (error) {
            alert('Ошибка при принятии заказа')
        }
    }

    const handleRejectOrder = async () => {
        try {
            await dispatch(rejectOrder(id))
            alert('Заказ отклонен успешно')
        } catch (error) {
            alert('Ошибка при отклонении заказа')
        }
    }

    return (
        <Card className='shadow shadow-bg w-100' >
            <Card.Body className='d-flex flex-column'>
                <Link style={{textDecoration: 'none', width: '250px'}}to={`${ROUTES.GLASSES_ORDER}/${id}`}>
                    <Card.Title style={{fontSize: '2em'}}>{`Заказ №${id}`}</Card.Title>
                </Link>
                <div className='d-flex flex-row w-100 h-100 flex-grow justify-content-start'>
                    <Card.Text className='glasses-order-card-text-width'>{`Статус: ${status}`}</Card.Text>
                    <Card.Text className='glasses-order-card-text'>{`Время создания: ${time_created != null ? time_created : '-'}`}</Card.Text>
                    <Card.Text className='glasses-order-card-text-width'>{`Время формирования: ${time_formed != null ? time_formed : '-'}`}</Card.Text>
                    <Card.Text className='glasses-order-card-text-width'>{`Время завершения: ${time_ended != null ? time_ended : '-'}`}</Card.Text>
                    <Card.Text className='glasses-order-card-text'>{`Сумма: ${order_sum!= null ? order_sum : '-'}`}</Card.Text>
                    <Card.Text className='glasses-order-card-text-width'>{`Контактный номер: ${phone!= null ? phone : '-'}`}</Card.Text>
                    <Card.Text className='glasses-order-card-text'>{`Покупатель: ${creator!= null ? creator : '-'}`}</Card.Text>
                    <Card.Text className='glasses-order-card-text'>{`Куратор: ${moderator!= null ? moderator : '-'}`}</Card.Text>
                
                    {isCurator && (
                        <div className="d-flex flex-row justify-content-end align-items-center ms-auto me-3">
                            <Button 
                                className="me-2" 
                                variant="outline-success" 
                                onClick={handleAcceptOrder} 
                                disabled={status !== 'Сфомирован'}
                            >
                                Принять
                            </Button>
                            <Button 
                                variant="outline-danger" 
                                onClick={handleRejectOrder} 
                                disabled={status !== 'Сфомирован'}
                            >
                                Отклонить
                            </Button>
                        </div>
                    )}
                
                <div className="glasses-order-icon">
                    {status === 'formed' ? (
                        <img className="status-icon" src="/src/assets/img/time.png" alt="Time Icon" />
                    ) : (
                        <div className="qr-hover-wrapper">
                            <img className="status-icon" src="/src/assets/img/href.png" alt="QR Icon" />
                            <div className="qr-hover">
                                {qr && <img className="qr-code" src={`data:image/png;base64,${qr}`} alt="QR Code" />}
                                <p>Общая стоимость: {order_sum} ₽</p>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default GlassesOrderCard