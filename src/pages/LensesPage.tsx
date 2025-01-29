import { FC, useEffect} from 'react'

import LensCard from '../components/LensCard'
import { Button } from 'react-bootstrap'
import '../assets/css/lensesPage.css'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTES, ROUTE_LABELS } from '../modules/Routes'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store';
import { getLensesList, setSearchLensValuesAction } from '../slices/lensesSlice'
import { Link } from 'react-router-dom';

import BasePage from './BasePage'

const LensesPage: FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const glasses_order_id = useSelector((state: RootState) => state.draftGlassesOrderSlice.glasses_order_id);
    const lenses_count = useSelector((state: RootState) => state.draftGlassesOrderSlice.lenses_count);

    const { SearchLensValues, lenses} = useSelector((state: RootState) => state.lenses);

    useEffect(() => {      
        dispatch(getLensesList());
    },[dispatch])

    const setSearchValue = (val: { [key: string]: string }) => {
        dispatch(setSearchLensValuesAction(val))
    }

    return (
        <>
            <BasePage>
            
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.LENSES}]}></BreadCrumbs>
            <div className='d-flex flex-column'>
                <div className='ms-3 d-flex search_and_basket'>
                    <div className='d-flex flex-column justify-content-start w-75'>
                        <InputField value={SearchLensValues.name} setValue = {setSearchValue} valuetype='name' placeholder='Название линзы' inputClass='InputField' date={false} />
                        <InputField value={SearchLensValues.minPrice} setValue = {setSearchValue} valuetype='minPrice' placeholder='Цена от, руб.' inputClass='InputField' date={false} />
                        <InputField value={SearchLensValues.maxPrice} setValue = {setSearchValue} valuetype='maxPrice' placeholder='Цена до, руб.' inputClass='InputField' date={false} />
                        <Button className='mt-3 ms-3' variant='outline-danger' onClick={() => dispatch(getLensesList())} style={{ width: '100px' }}>Поиск</Button>
                    </div>
                    {(!isAuthenticated || !glasses_order_id) ? 
                    <img src='/src/assets/img/empty_basket.jpeg' className='basket_img ms-3'></img>
                    : (
                        <div>
                        <Link to={`${ROUTES.GLASSES_ORDER}/${glasses_order_id}`}>
                            <img src='/src/assets/img/full_basket.jpeg' className='basket_img ms-3'></img>
                        </Link>
                        <div className='basket_count'>{lenses_count}</div>
                        </div>
                    )}

                </div>

                <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-wrap gap-5 ms-4 me-4 mt-5 w-100 pe-4' style={{maxWidth: '1000px'}}>
                    {lenses.map((lens) => {
                        return (
                            <LensCard
                                key={lens.lens_id}
                                id={lens.lens_id!}
                                name={lens.name!}
                                imageUrl={lens.url!}
                                price={lens.price!}
                                dioptres={''}
                            ></LensCard>
                        )
                    })}
                </div>
                </div>
            </div>
            </BasePage>
        </>
    )
}

export default LensesPage