import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const Users = Loadable(lazy(() => import('../adminComponents/Users')));
const Shifts = Loadable(lazy(() => import('../adminComponents/Shifts')));
const Shift = Loadable(lazy(() => import('../adminComponents/Shift')));


const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/users', element: <Users />, auth: authRoles.admin },
  { path: '/dashboard/shifts', element: <Shifts />, auth: authRoles.admin },
  { path: '/dashboard/shift', element: <Shift />, auth: authRoles.admin },

];

export default dashboardRoutes;
