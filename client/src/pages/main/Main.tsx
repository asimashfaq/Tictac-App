import React, { useReducer } from 'react'
import { Layout, Icon } from 'antd'
import Siderbar from '../../components/sidebar/Sidebar'
import { Switch } from 'react-router-dom'
import { IContextProps } from '../../shared/context/Context'
const { Header, Content } = Layout

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'press':
      return {
        label: state.label === 'TicTac' ? 'TT' : 'TicTac',
        collapse: !state.collapse,
      }
    default:
      return state
  }
}

const Context = React.createContext({} as IContextProps)
interface Props {
  routes: JSX.Element[]
}
const Main = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    label: 'TicTac',
    collapse: false,
  })
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Context.Provider value={{ state, dispatch }}>
        <Siderbar collapse={state.collapse} label={state.label} />
      </Context.Provider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={state.collapse ? 'menu-unfold' : 'menu-fold'}
            onClick={() => {
              dispatch({ type: 'press' })
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <Switch>{props.routes}</Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
export { Context, Main }
