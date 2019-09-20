import React from 'react'
import { Route } from 'react-router-dom'
import AsyncImport from './AsyncImport'

const Home = AsyncImport(() => import('../pages/home'))
const History = AsyncImport(() => import('../pages/gamePlays'))
const Gameplay = AsyncImport(() => import('../pages/gamePlay'))
const publicPaths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/history', component: History },
  { exact: true, path: '/replay/:id', component: Gameplay },
]
const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
))
export default publicRoutes
