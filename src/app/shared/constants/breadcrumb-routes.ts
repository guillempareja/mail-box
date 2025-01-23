import { BreadcrumbRoute } from '@shared/models/breadcrumb.type';

const BASE_BREAD_CRUMB_ROUTE: BreadcrumbRoute[] = [
  { link: '/', text: 'Bandeja de entrada' },
];

export const MESSAGE_BREAD_CRUMB_ROUTE: BreadcrumbRoute[] = [
  ...BASE_BREAD_CRUMB_ROUTE,
  { text: 'mensaje' },
];
