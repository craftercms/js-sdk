import { item,
         descriptor,
         children,
         navBreadcrumb } from '../../../util/mock-responses-common';

export { item, descriptor, children, navBreadcrumb };

export const tree = { ...item, children: [] }

export const navItem = {
  url: "/",
  active: true,
  subItems: []
}
