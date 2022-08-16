import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const Users = Loadable(lazy(() => import('../../adminComponents/Users')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/users', element: <Users />, auth: authRoles.admin },
];

export default dashboardRoutes;
