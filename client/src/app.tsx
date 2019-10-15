/**
 *  App's React initial point
 **/
import { Provider } from 'react-redux'
import store, { history } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import publicRoutes from './configs/routes'
import { Main } from './views/main'

/**
 *  Combines and returns @store @router and @components
 *  @store saves the redux part.
 *  @history presists the history of the app.
 *  @Main returns all the components.
 **/
export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main routes={publicRoutes} />
    </ConnectedRouter>
  </Provider>
)
