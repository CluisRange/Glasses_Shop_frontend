export const ROUTES = {
    HOME: '/',
    LENSES: '/lenses',
    LOGIN: "/login",
    GLASSES_ORDER: "/glasses_orders",
    REGISTRATION: "/registration",
    ACCOUNT: "/account",
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    LENSES: 'Линзы',
    LOGIN: "Авторизация",
    GLASSES_ORDER: "Заказы",
    REGISTRATION: "Регистрация",
    ACCOUNT: "Аккаунт",
  };