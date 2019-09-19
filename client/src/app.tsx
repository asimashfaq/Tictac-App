import { Provider } from 'react-redux'
import store, { history } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import publicRoutes from './configs/routes'
import { Main } from './pages/main'

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main routes={publicRoutes} />
    </ConnectedRouter>
  </Provider>
)
