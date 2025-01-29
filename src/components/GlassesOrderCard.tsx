import { FC } from 'react'

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

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

}

const GlassesOrderCard: FC<IGlassesOrderCardProps> = (
    { id, status, time_created, time_formed, time_ended, creator, moderator, phone, order_sum }
) => {

    return (
        <Link style={{textDecoration: 'none'}}to={`${ROUTES.GLASSES_ORDER}/${id}`}>
            <Card className='shadow shadow-bg w-100' >
                <Card.Body className='d-flex flex-column'>
                    <Card.Title style={{fontSize: '2em'}}>{`Заказ №${id}`}</Card.Title>
                    <div className='d-flex flex-row w-100 h-100 flex-grow justify-content-start'>
                        <Card.Text className='glasses-order-card-text-width'>{`Статус: ${status}`}</Card.Text>
                        <Card.Text className='glasses-order-card-text'>{`Время создания: ${time_created != null ? time_created : '-'}`}</Card.Text>
                        <Card.Text className='glasses-order-card-text-width'>{`Время формирования: ${time_formed != null ? time_formed : '-'}`}</Card.Text>
                        <Card.Text className='glasses-order-card-text-width'>{`Время завершения: ${time_ended != null ? time_ended : '-'}`}</Card.Text>
                        <Card.Text className='glasses-order-card-text'>{`Сумма: ${order_sum!= null ? order_sum : '-'}`}</Card.Text>
                        <Card.Text className='glasses-order-card-text-width'>{`Контактный номер: ${phone!= null ? phone : '-'}`}</Card.Text>
                        <Card.Text className='glasses-order-card-text'>{`Покупатель: ${creator!= null ? creator : '-'}`}</Card.Text>
                        <Card.Text className='glasses-order-card-text'>{`Куратор: ${moderator!= null ? moderator : '-'}`}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default GlassesOrderCard