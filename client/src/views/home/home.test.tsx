import React from 'react'
import Home from './index'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GameGrid from '../../components/gamegrid'
const mockStore = configureMockStore()
const store = mockStore({})

let wrapper: any
beforeEach(() => {
  wrapper = shallow(
    <Provider store={store}>
      <Home />
    </Provider>
  )
})
describe('<Home /> rendering', () => {
  it('should render correctly ', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should should have gamegrid ', () => {
    expect(GameGrid).toHaveLength(1)
  })
})
