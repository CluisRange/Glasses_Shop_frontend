import MainPage from './pages/MainPage'
import { ROUTES } from './modules/Routes'
import LensesPage from './pages/LensesPage'
import LensPage from './pages/LensPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter basename='/Glasses_Shop_frontend'>
      <Routes>
        <Route path={ROUTES.HOME} index element={<MainPage />} />
        <Route path={ROUTES.LENSES} element={<LensesPage />} />
        <Route path={ROUTES.LENSES + "/:id"} element={<LensPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;