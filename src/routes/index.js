// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
// const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))

const Events = lazy(() => import('../pages/protected/Events'))
const Team = lazy(() => import('../pages/protected/Team'))
// const HostCenter = lazy(() => import('../pages/protected/HostCenters'))
// const Integration = lazy(() => import('../pages/protected/Integration'))
// const Calendar = lazy(() => import('../pages/protected/Calendar'))
// const Teams = lazy(() => import('../pages/protected/Team'))
// const Bookings = lazy(() => import('../pages/protected/Bookings'))
// const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
// const GettingStarted = lazy(() => import('../pages/GettingStarted'))
// const DocFeatures = lazy(() => import('../pages/DocFeatures'))
// const DocComponents = lazy(() => import('../pages/DocComponents'))



const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: '/welcome', // the url
  //   component: Welcome, // view rendered
  // },
  {
    path: '/events',
    component: Events,
  },
  {
    path: '/team',
    component: Team,
  },
  // {
  //   path: '/settings-team',
  //   component: Team,
  // },
  // {
  //   path: '/calendar',
  //   component: Calendar,
  // },
  // {
  //   path: '/bookings',
  //   component: Bookings,
  // },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  // {
  //   path: '/settings-billing',
  //   component: Bills,
  // },
  // {
  //   path: '/getting-started',
  //   component: GettingStarted,
  // },
  // {
  //   path: '/features',
  //   component: DocFeatures,
  // },
  // {
  //   path: '/components',
  //   component: DocComponents,
  // },
  // {
  //   path: '/integration',
  //   component: Integration,
  // },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
