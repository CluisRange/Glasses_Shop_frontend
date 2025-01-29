import MainPage from './pages/MainPage'
import { ROUTES } from './modules/Routes'
import LensesPage from './pages/LensesPage'
import LensPage from './pages/LensPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { invoke } from "@tauri-apps/api/core";
import { useEffect} from 'react';

function App() {
    useEffect(() => {
      invoke('tauri', {cmd: 'create'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
  
      return () => {
        invoke('tauri', {cmd: 'close'})
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error))
      }
    }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<MainPage />} />
        <Route path={ROUTES.LENSES} element={<LensesPage />} />
        <Route path={ROUTES.LENSES + "/:id"} element={<LensPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;