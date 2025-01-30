import { FC, useEffect} from 'react'

import { Button } from 'react-bootstrap'
import '../assets/css/lensesPage.css'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTES, ROUTE_LABELS } from '../modules/Routes'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store';
import { getLensesList, setSearchLensValuesAction } from '../slices/lensesSlice'
import { Link, useNavigate } from 'react-router-dom';
import LensToChangeCard from '../components/LensToChangeCard'

import BasePage from './BasePage'

const LensesPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const isCurator = useSelector((state: RootState) => state.user.isCurator);
    const { SearchLensValues, lenses} = useSelector((state: RootState) => state.lenses);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isCurator) {
            navigate(ROUTES.ANAUTHORIZED);
            return;
        }
        dispatch(getLensesList());
    }, [dispatch, isAuthenticated, navigate]);

    const setSearchValue = (val: { [key: string]: string }) => {
        dispatch(setSearchLensValuesAction(val))
    }

    return (
        <>
            <BasePage>
            
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.LENSES_CHANGE}]}></BreadCrumbs>
            <div className='d-flex flex-column'>
                <div className='ms-3 d-flex search_and_basket'>
                    <div className='d-flex flex-column justify-content-start w-75'>
                        <InputField value={SearchLensValues.name} setValue = {setSearchValue} valuetype='name' placeholder='Название линзы' inputClass='InputField' date={false} />
                        <InputField value={SearchLensValues.minPrice} setValue = {setSearchValue} valuetype='minPrice' placeholder='Цена от, руб.' inputClass='InputField' date={false} />
                        <InputField value={SearchLensValues.maxPrice} setValue = {setSearchValue} valuetype='maxPrice' placeholder='Цена до, руб.' inputClass='InputField' date={false} />
                        <Button className='mt-3 ms-3' variant='outline-danger' onClick={() => dispatch(getLensesList())} style={{ width: '100px' }}>Поиск</Button>
                    </div>

                </div>

                <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-wrap gap-5 ms-4 me-4 mt-5 w-100 pe-4' style={{maxWidth: '90%'}}>
                    {lenses.map((lens) => {
                        return (
                            <LensToChangeCard
                                key={lens.lens_id}
                                id={lens.lens_id!}
                                name={lens.name!}
                                imageUrl={lens.url ?? ''}
                                price={lens.price ?? 0}
                                status={lens.status!}
                                description={lens.description ?? ''}
                            ></LensToChangeCard>
                        )
                    })}
                    <LensToChangeCard></LensToChangeCard>
                </div>
                </div>
            </div>
            </BasePage>
        </>
    )
}

export default LensesPage