import { FC, useEffect, useState } from 'react'

import { LensInter, getLensesByName, ResultInter} from '../modules/Api'
import {LENSES_MOCK} from '../modules/Mock'

import NavigationBar from '../components/NavBar'
import LensCard from '../components/LensCard'
import { Button } from 'react-bootstrap'
import '../assets/css/lensesPage.css'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'

import { useDispatch } from 'react-redux'
import { setSearchLensValuesAction, useSearchLensValues } from '../slices/dataSlice'


const LensesPage: FC = () => {

    const [lenses, setLenses] = useState<LensInter[]>([])
    const [searchLensName, setSearchLensName] = useState('')
    const [searchLensMinPrice, setsearchLensMinPrice] = useState('')
    const [searchLensMaxPrice, setsearchLensMaxPrice] = useState('')

    const reactSearchValue = useSearchLensValues()
    const dispatch = useDispatch()

    const updateLenses = (searchLensValues_ = { name: '', minPrice: '', maxPrice: '' }) => {
        let gotResult = false
        if (searchLensValues_.name === '' && searchLensValues_.minPrice === '' && searchLensValues_.maxPrice === '') {
            searchLensValues_ = {
                name: searchLensName,
                minPrice: searchLensMinPrice,
                maxPrice: searchLensMaxPrice,
            }
        }
        dispatch(setSearchLensValuesAction(searchLensValues_))

        let min_price_numeric: number = parseInt(searchLensValues_.minPrice)
        if (isNaN(min_price_numeric)) min_price_numeric = 0
        let max_price_numeric: number = parseInt(searchLensValues_.maxPrice)
        if (isNaN(max_price_numeric)) max_price_numeric = 1000000

        getLensesByName(searchLensValues_.name, min_price_numeric, max_price_numeric).then((response) => {
            setLenses(response.lenses)
            gotResult = true
        })
        
        setTimeout(() => {
            if (!gotResult) {
                let result: ResultInter = { active_glasses_order: LENSES_MOCK.active_glasses_order, lenses: [] };
                LENSES_MOCK.lenses.forEach((lens: LensInter) => {
                    if (lens.name.includes(searchLensValues_.name,) && lens.price >= min_price_numeric && lens.price <= max_price_numeric) {
                        result.lenses.push(lens);
                    }
                });
                setLenses(result.lenses)
            }
        }, 1000);

    }

    useEffect(() => {
        setSearchLensName(reactSearchValue.name)
        setsearchLensMaxPrice(reactSearchValue.maxPrice)
        setsearchLensMinPrice(reactSearchValue.minPrice)

        updateLenses(reactSearchValue)
    },[])

    const handleSearch = () => {
        updateLenses()
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.LENSES}]}></BreadCrumbs>
            <div className='d-flex flex-column'>
                <div className='ms-3 d-flex w-100 search_and_basket'>
                    <div className='d-flex flex-column justify-content-start w-75'>
                        <InputField value={searchLensName} setValue={setSearchLensName} placeholder='Название линзы' inputClass='InputField' />
                        <InputField value={searchLensMinPrice} setValue={setsearchLensMinPrice} placeholder='Цена от, руб.' inputClass='InputField' />
                        <InputField value={searchLensMaxPrice} setValue={setsearchLensMaxPrice} placeholder='Цена до, руб.' inputClass='InputField' />
                        <Button className='mt-3 ms-3' variant='outline-danger' onClick={handleSearch} style={{ width: '100px' }}>Поиск</Button>
                    </div>
                    <img src='\img\empty_basket.jpeg' className='basket_img ms-3'></img>
                </div>

                <div className='d-flex justify-content-center'>
                    <div className='d-flex cards flex-wrap gap-5 ms-4 me-4 mt-5 w-100 pe-4'>
                        {lenses.map((lens) => {
                            return (
                                <LensCard
                                    key={lens.lens_id}
                                    id={lens.lens_id}
                                    title={lens.name}
                                    imageUrl={lens.url}
                                    price={lens.price}
                                ></LensCard>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LensesPage