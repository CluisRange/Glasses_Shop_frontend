import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './modules/Routes'
import LensesPage from './pages/LensesPage'
import MainPage from './pages/MainPage'
import LensPage from './pages/LensPage'
import LoginPage from "./pages/LoginPage"
import GlassesOrderPage from './pages/GlassesOrderPage'
import GlassesOrdersPage from './pages/GlassesOrdersPage'
import RegistrationPage from './pages/RegistrationPage'
import PersonalAccountPage from './pages/PersonalAccountPage'
import LensesChangePage from './pages/LensesChangePage'
import PageNotFound from './pages/Page404'
import PageUnauthorized from './pages/Page403'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = {ROUTES.HOME} element = {<MainPage />} />
          <Route path = {ROUTES.LENSES} element = {<LensesPage />} />
          <Route path = {ROUTES.LENSES + "/:id"} element = {<LensPage />} />
          <Route path = {ROUTES.LOGIN} element = {<LoginPage />} />
          <Route path = {ROUTES.GLASSES_ORDER  + "/:id"} element = {<GlassesOrderPage />} />
          <Route path = {ROUTES.GLASSES_ORDER} element = {<GlassesOrdersPage />} />
          <Route path = {ROUTES.REGISTRATION} element = {<RegistrationPage />} />
          <Route path = {ROUTES.ACCOUNT} element = {<PersonalAccountPage />} />
          <Route path = {ROUTES.LENSES_CHANGE} element = {<LensesChangePage />} />
          <Route path = {ROUTES.PAGE_NOT_FOUND} element = {<PageNotFound/>} />
          <Route path = {ROUTES.ANAUTHORIZED} element = {<PageUnauthorized/>} />
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
