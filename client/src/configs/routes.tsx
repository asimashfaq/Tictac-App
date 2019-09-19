import React from 'react'
import { Route } from 'react-router-dom'
import AsyncImport from './AsyncImport'

const Home = AsyncImport(() => import('../pages/home'))
const History = AsyncImport(() => import('../pages/gamePlays'))
const publicPaths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/history', component: History },
]
const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
))
export default publicRoutes
