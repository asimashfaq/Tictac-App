import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getGamePlay } from './index'
import { GET_GAMEPLAY_REQUEST, GET_GAMEPLAY_SUCCESS, GET_GAMEPLAY_FAILURE } from '../actions'

Object.defineProperty(window, '_env_', {
  writable: true,
  value: { API_URL: 'http://' },
})

const mockStore = configureMockStore([thunk])
describe('User Actions', () => {
  let store: any

  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })
  // tslint:disable-next-line: prettier
  afterEach(() => {
    moxios.uninstall()
  })

  describe('GET_GAMEPLAY action will Get Game Play', () => {
    it('dispatches GET_GAMEPLAY action and returns data on success', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            boxes: [
              {
                id: 'box0',
              },
            ],
            player1: '1',
          },
        })
      })
      return store.dispatch(getGamePlay('123')).then(() => {
        const actions = store.getActions()
        expect.assertions(3)
        expect(actions[0].type).toEqual(GET_GAMEPLAY_REQUEST)
        expect(actions[1].type).toEqual(GET_GAMEPLAY_SUCCESS)
        expect(actions[1].payload.player1).toEqual('1')
      })
    })

    it('tests GET_GAMEPLAY action and that returns an error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 404,
        })
      })
      return store.dispatch(getGamePlay('123')).then(() => {
        const actions = store.getActions()
        expect.assertions(3)
        expect(actions[0].type).toEqual(GET_GAMEPLAY_REQUEST)
        expect(actions[1].type).toEqual(GET_GAMEPLAY_FAILURE)
        expect(actions[1].payload.error).toEqual('Request failed with status code 404')
      })
    })
  })
})
