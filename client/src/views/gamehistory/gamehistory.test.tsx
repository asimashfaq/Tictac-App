/**
 * Test @GameHistory
 **/
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GameHistory from './gamehistory'
import thunk from 'redux-thunk'
import waitForExpect from 'wait-for-expect'
import gamePlayListReducer from '../../redux/gamePlay/list/reducer'
import { GET_GAMEPLAYS_SUCCESS, GET_GAMEPLAYS_REQUEST } from '../../redux/gamePlay/list/actions'
import { MemoryRouter } from 'react-router'
jest.mock('../../redux/gamePlay/list/api')

let store: any
let wrapper: any
const createMockStore = configureMockStore([thunk])
waitForExpect.defaults.timeout = 55000

describe('GameHistory', () => {
  // create the reducer
  const createState = (initialState: any) => (actions: any) => {
    return {
      gameplay: {
        list: actions.reduce(gamePlayListReducer, initialState),
      },
    }
  }
  // create the initial state
  const initialState = createState({
    fetching: true,
    data: [],
    error: null,
  })
  // create the mock store
  beforeEach(() => {
    store = createMockStore(initialState)
  })

  it('load table after fetching data', async () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameHistory />
        </MemoryRouter>
      </Provider>
    )
    wrapper.props().store.getState = jest.fn().mockImplementation(() => [
      {
        id: '3',
        boxes: [
          {
            id: 'box0',
          },
        ],
        player1: '1',
      },
    ])

    const actions = store.getActions()

    await waitForExpect(() => {
      wrapper.update()
      expect.assertions(3)
      // validate the Actions  GET_GAMEPLAYS_REQUEST &  GET_GAMEPLAYS_SUCCESS call on the load
      expect(actions[0].type).toEqual(GET_GAMEPLAYS_REQUEST)
      expect(actions[1].type).toEqual(GET_GAMEPLAYS_SUCCESS)
      // validate table render properly
      expect(wrapper.find('Table').length > 0).toBeTruthy()
      wrapper.unmount()
    })
  })
})
