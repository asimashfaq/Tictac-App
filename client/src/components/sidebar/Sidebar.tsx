import React, { useContext } from 'react'
import { Layout, Menu, Icon, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { Context } from '../../pages/main'
import './Sidebar.scss'
const { Text } = Typography
interface Props {
  collapse: boolean
  label: string
}
const { Sider } = Layout
const Siderbar = (props: Props) => {
  const { state, dispatch } = useContext(Context)
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={300}
      trigger={null}
      collapsible={true}
      onCollapse={(collapse, type) => {
        dispatch({ type: 'press' })
      }}
      collapsed={state.collapse}
    >
      <div className="logo">{state.label}</div>
      <Menu
        className="menu-list"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Icon type="user" />

          <Text type="secondary">
            <Link to="/">Home</Link>
          </Text>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <Text type="secondary">
            <Link to="/history">History</Link>
          </Text>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Siderbar
