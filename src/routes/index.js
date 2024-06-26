// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
// const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))

const Events = lazy(() => import('../pages/protected/Events'))
const Team = lazy(() => import('../pages/protected/Team'))
const Programmes = lazy(() => import('../pages/protected/Programs'))
const Courses = lazy(() => import('../pages/protected/Courses'))
const Campuses = lazy(() => import('../pages/protected/Campuses'))
const Faculties = lazy(() => import('../pages/protected/Faculties'))
const Buddies = lazy(() => import('../pages/protected/Buddies'))
const Research = lazy(() => import('../pages/protected/Research'))
const NewsSlider = lazy(() => import('../pages/protected/NewsSlider'))

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
    path: '/newsslider',
    component: NewsSlider,
  },
  {
    path: '/team',
    component: Team,
  },
  {
    path: '/levels',
    component: Programmes,
  },
  {
    path: '/campuses',
    component: Campuses,
  },
  {
    path: '/programmes',
    component: Courses,
  },
  {
    path: '/faculties',
    component: Faculties,
  },
  {
    path: '/buddies',
    component: Buddies,
  },
  {
    path: '/research',
    component: Research,
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
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes
