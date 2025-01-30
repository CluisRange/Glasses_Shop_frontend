export const ROUTES = {
    HOME: '/',
    LENSES: '/lenses',
    LOGIN: "/login",
    GLASSES_ORDER: "/glasses_orders",
    REGISTRATION: "/registration",
    ACCOUNT: "/account",
    LENSES_CHANGE: "/lenses_change",
    PAGE_NOT_FOUND: "/page_not_found",
    ANAUTHORIZED: "/unauthorized",
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    LENSES: 'Линзы',
    LOGIN: "Авторизация",
    GLASSES_ORDER: "Заказы",
    REGISTRATION: "Регистрация",
    ACCOUNT: "Аккаунт",
    LENSES_CHANGE: "Редакция линз",
    PAGE_NOT_FOUND: "Страница не найдена",
    ANAUTHORIZED: "Не авторизован", 
  };