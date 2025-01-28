import { FC } from 'react'

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

import '../assets/css/fonts.css'

interface LensCardProps {
    id: number
    title: string
    imageUrl: string
    price: number
}

const LensCard: FC<LensCardProps> = (
    { id, title, imageUrl, price }
) => {
    return (
        <Card  style={{ width: '18rem', height: '25rem' }} >
            <Link className='align-self-start' style={{ width: '100%' }} to={`${ROUTES.LENSES}/${id}`}>
                <Card.Img src={imageUrl || '/src/assets/img/unknownLens.jpg'}/>
            </Link>
            <Card.Body className='d-flex flex-column text-center' style = {{justifyContent:'space-between'}}>
                <Card.Title style={{fontFamily:'Monrope'}}>{title}</Card.Title>
                <Card.Title style={{fontFamily:'Monrope'}}>{price} руб.</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default LensCard