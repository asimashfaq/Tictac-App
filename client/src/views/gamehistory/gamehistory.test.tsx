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
const middlewares = [thunk]
const createMockStore = configureMockStore([thunk])

waitForExpect.defaults.timeout = 55000
//const mockStore = configureMockStore(middlewares)

describe('GameHistory', () => {
  let useEffect: any
  const createState = (initialState: any) => (actions: any) => {
    return {
      gameplay: {
        list: actions.reduce(gamePlayListReducer, initialState),
      },
    }
  }
  const initialState = createState({
    fetching: true,
    data: [],
    error: null,
  })

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
      expect(actions[0].type).toEqual(GET_GAMEPLAYS_REQUEST)
      expect(actions[1].type).toEqual(GET_GAMEPLAYS_SUCCESS)
      expect(wrapper.find('Table').length > 0).toBeTruthy()
      wrapper.unmount()
    })
  })
})
