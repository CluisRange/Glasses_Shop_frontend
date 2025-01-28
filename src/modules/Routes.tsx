export const ROUTES = {
    HOME: '/',
    LENSES: '/lenses'
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    LENSES: 'Линзы',
  };