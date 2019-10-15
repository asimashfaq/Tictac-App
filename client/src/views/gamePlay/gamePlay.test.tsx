/**
 * Test @GamePlay
 **/
import React from 'react'
import GamePlay from './gamePlay'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import gamePlayGetReducer from '../../redux/gamePlay/get/reducer'
import waitForExpect from 'wait-for-expect'
// load the mock api
jest.mock('../../redux/gamePlay/get/api')
jest.mock('../../shared/functions/')

let store: any
let wrapper: any
const createMockStore = configureMockStore([thunk])
// create reducer with state
const createState = (initialState: any) => (actions: any) => {
  return {
    gameplay: {
      get: actions.reduce(gamePlayGetReducer, initialState),
    },
  }
}
// initialize state
const initialState = createState({
  fetching: true,
  data: {},
  error: null,
})
// create the store
beforeEach(() => {
  store = createMockStore(initialState)
})

describe('<GamePlay /> rendering', () => {
  window.alert = () => {} // provide an empty implementation for window.alert
  it('should render correctly ', () => {
    wrapper = mount(
      <Provider store={store}>
        <GamePlay
          match={{ params: { id: 1 }, isExact: true, path: '/replay/:id', url: '/replay/1' }}
          errorMsg={false}
          loadingMsg={false}
        />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should show error message ', async () => {
    wrapper = mount(
      <Provider store={store}>
        <GamePlay
          match={{ params: { id: 1 }, isExact: true, path: '/replay/:id', url: '/replay/1' }}
          errorMsg={true}
          loadingMsg={false}
        />
      </Provider>
    )
    await waitForExpect(() => {
      // validate the error message
      expect(wrapper.find('.errorMsg').text()).toEqual('Unable to Load Data')
    })
    wrapper.unmount()
  })
  it('should show loading message ', async () => {
    wrapper = mount(
      <Provider store={store}>
        <GamePlay
          match={{ params: { id: 1 }, isExact: true, path: '/replay/:id', url: '/replay/1' }}
          errorMsg={true}
          loadingMsg={true}
        />
      </Provider>
    )
    await waitForExpect(() => {
      // validate the loading message
      expect(wrapper.find('.loadingMsg').text()).toEqual('Loading')
    })
    wrapper.unmount()
  })
})
