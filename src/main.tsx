import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import LensesPage from './pages/LensesPage'
import MainPage from './pages/MainPage'
import LensPage from './pages/LensPage'

import { ROUTES } from './modules/Routes'
import {store} from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainPage></MainPage>
  },
  {
    path: ROUTES.LENSES,
    element: <LensesPage />
  },
  {
    path: `${ROUTES.LENSES}/:id`,
    element: <LensPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
  })
}