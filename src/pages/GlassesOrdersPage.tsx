import { FC, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import BasePage from './BasePage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { getGlassesOrders, setSearchGlassesOrderValues } from '../slices/GlassesOrdersSlice'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { AppDispatch } from '../store'
import InputField from '../components/InputField'
import GlassesOrderCard from '../components/GlassesOrderCard'
import { useNavigate } from 'react-router-dom'

const GlassesOrdersPage: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const { GlassesOrderSearchValues, glasses_orders } = useSelector((state: RootState) => state.GlassesOrdersSlice)
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
    const isCurator = useSelector((state: RootState) => state.user.isCurator)
    const navigate = useNavigate()

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getGlassesOrders())
        }, 2000) // Polling every 2 seconds

        return () => clearInterval(intervalId)
    }, [dispatch, isAuthenticated, navigate])

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.ANAUTHORIZED)
            return
        }
        dispatch(getGlassesOrders())
    }, [])

    const getStatustranslate = (status_text: string | undefined) => {
        switch (status_text) {
            case 'draft': return 'Черновой'
            case 'deleted': return 'Удален'
            case 'formed': return 'Сфомирован'
            case 'accepted': return 'Принят'
            case 'cancelled': return 'Отменен'
            default: return 'Неизвестный статус'
        }
    }

    const setSearchValue = (val: { [key: string]: string }) => {
        dispatch(setSearchGlassesOrderValues(val))
    }

    const filterOrdersByCreator = () => {
        const filteredOrders = glasses_orders.filter(order => 
            order.creator.toLowerCase().includes(GlassesOrderSearchValues.creator.toLowerCase())
        )
        return filteredOrders
    }

    return (
        <BasePage>
            <BreadCrumbs crumbs={[
                {
                    label: ROUTE_LABELS.GLASSES_ORDER
                }
            ]}></BreadCrumbs>
            <div className='container-fluid d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 '>
                <h3>Заказы</h3>
                <div className='d-flex flex-column justify-content-start w-75 mb-4'>
                    <select 
                        value={GlassesOrderSearchValues.status} 
                        onChange={(e) => setSearchValue({ status: e.target.value })} 
                        className='form-select mb-3 w-50'
                    >
                        <option value=''>Выберите статус</option>
                        <option value='formed'>Сформирован</option>
                        <option value='accepted'>Принят</option>
                        <option value='cancelled'>Отменен</option>
                    </select>
                    <h5>Фильтр по дате формирования:</h5>
                    <div className='d-flex gap-3'>
                        <div style={{ width: '20%' }}>Минимальная дата:</div>
                        <InputField value={GlassesOrderSearchValues.min_date_formed} setValue={setSearchValue} valuetype='min_date_formed' placeholder='Минимальная дата' inputClass='InputField' date={true}/>
                    </div>
                    <div className='d-flex gap-3'>
                        <div style={{ width: '20%' }}>Максимальная дата:</div>
                        <InputField value={GlassesOrderSearchValues.max_date_formed} setValue={setSearchValue} valuetype='max_date_formed' placeholder='Максимальная дата' inputClass='InputField' date={true}/>
                    </div>
                    
                    {isCurator && (
                        <>
                            <h5>Фильтр по покупателю:</h5>
                            <div className='d-flex gap-3'>
                                <div style={{ width: '20%' }}>Имя пользователя:</div>
                                <InputField value={GlassesOrderSearchValues.creator} setValue={setSearchValue} valuetype='creator' placeholder='Покупатель' inputClass='InputField' date={false}/>
                            </div>
                        </>
                    )}
                    <Button className='mt-3 ms-3' variant='outline-danger' onClick={() => dispatch(getGlassesOrders())} style={{ width: '100px' }}>Поиск</Button>
                </div>
                <div className='d-flex flex-column gap-3'>
                    {filterOrdersByCreator()?.length === 0 ? <h5>Заказы не найдены</h5> : filterOrdersByCreator()?.map((glasses_order, index) => {
                        return (
                            <GlassesOrderCard 
                                key={glasses_order.glasses_order_id}
                                id={glasses_order.glasses_order_id as number} 
                                status={getStatustranslate(glasses_order.status)} 
                                time_created={glasses_order.date_created ? new Date(glasses_order.date_created).toLocaleDateString('ru-RU') : '-'}  
                                time_formed={glasses_order.date_formed ? new Date(glasses_order.date_formed).toLocaleDateString('ru-RU') : '-'} 
                                time_ended={glasses_order.date_ended ? new Date(glasses_order.date_ended).toLocaleDateString('ru-RU') : '-'} 
                                creator={glasses_order.creator as string}
                                moderator={glasses_order.moderator as string}
                                phone={glasses_order.phone as string}
                                order_sum={glasses_order.order_sum as number}
                                qr = {glasses_order.qr as string}>
                            </GlassesOrderCard>
                        )
                    })}
                </div>
            </div>
            <div style={{ marginBottom: '10rem' }}></div>
        </BasePage>
    )
}

export default GlassesOrdersPage