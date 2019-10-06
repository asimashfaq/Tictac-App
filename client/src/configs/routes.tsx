import React from 'react'
import { Route } from 'react-router-dom'
import AsyncImport from './AsyncImport'

const Home = AsyncImport(() => import('../views/home'))
const GameHistory = AsyncImport(() => import('../views/gamehistory'))
const Gameplay = AsyncImport(() => import('../views/gamePlay'))
const publicPaths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/history', component: GameHistory },
  { exact: true, path: '/replay/:id', component: Gameplay },
]
const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
))
export default publicRoutes
