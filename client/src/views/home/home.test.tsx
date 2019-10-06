import React from 'react'
import Home from './index'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GameGrid from '../../components/gamegrid'
const mockStore = configureMockStore()
const store = mockStore({})

let wrapper: any
beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <Home />
    </Provider>
  )
})
describe('<Home /> rendering', () => {
  it('should should have gamegrid ', () => {
    expect(wrapper.find(GameGrid)).toHaveLength(1)
  })
})
