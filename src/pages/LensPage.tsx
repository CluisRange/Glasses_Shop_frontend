import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"

import { LensInter, getLensById } from '../modules/Api'
import Navigationbar from '../components/NavBar'

import '../assets/css/lensPage.css'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTES } from '../modules/Routes'


const LensPage: FC = () => {

    const [lens, setLens] = useState<LensInter>({
        lens_id: 0,
        name: '',
        description: '',
        url: '',
        price: 0
    })

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        getLensById(id_numeric).then((response) => {
            if (!response) {
                navigate(ROUTES.PAGE_NOT_FOUND)
            } else {
                setLens(response)
            }
        }).catch(() => {
            navigate(ROUTES.PAGE_NOT_FOUND)
        })
    }, [id, navigate])

    return (
        <>
            <Navigationbar/>
            <BreadCrumbs crumbs={[
                {
                    label: 'Линзы',
                    path: '/lenses'
                },
                {
                    label: lens?.name
                }
            ]}></BreadCrumbs>
            <div className='d-flex flex-column ms-4 content-fluid'>
               <h2 className='lens-name text-uppercase'>{lens?.name}</h2>
               <div className='container-fluid mt-3'>
                    <div className='d-flex imgAndDscr'>
                        <div className='lens-img-box p-0'>
                            <img style={{ width: '280px', height: '205px', objectFit: 'cover' }} src={lens?.url.replace('http://localhost:9000', '')} className='lens-img'></img>
                        </div>
                        <div className='lens-description ps-5 mt-2'>
                            {lens?.description}
                        </div>
                    </div>
                    <div className='lens-price mt-2'> Цена: {lens?.price} руб.</div>
               </div>
            </div>
        </>
    )
}

export default LensPage