import { FC } from 'react'
import NavigationBar from '../components/NavBar'
import '../assets/css/fonts.css'


const MainPage: FC = () => {

    return (
        <>
            <NavigationBar></NavigationBar>
            <div className='container d-flex flex-column justify-content-center mt-5 border p-3 w-75'>
                <h3 className='text-uppercase text-center'style={{ fontFamily: 'Inter' }}>Сервис продажи очков</h3>
                <div className='d-flex flex-column mt-4' style={{ fontFamily: 'Manrope' }}>
                    <p>Добро пожаловать в наш интернет-магазин, специализирующийся на продаже и подборе линз для очков!</p>
                    <p>Наши специалисты помогут вам подобрать оптимальные линзы с учетом вашего рецепта и индивидуальных потребностей, чтобы обеспечить максимальный комфорт и четкость зрения. Мы работаем только с проверенными производителями, предлагая линзы с различными покрытиями: антирефлексными, фотохромными, с защитой от ультрафиолета и многими другими.</p>
                </div>
            </div>
        </>
    )
}

export default MainPage