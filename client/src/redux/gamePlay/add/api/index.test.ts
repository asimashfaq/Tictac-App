import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addGamePlay } from './index'
import { ADD_GAMEPLAY_REQUEST, ADD_GAMEPLAY_SUCCESS, ADD_GAMEPLAY_FAILURE } from '../actions'

Object.defineProperty(window, '_env_', {
  writable: true,
  value: { API_URL: 'http://' },
})

const mockStore = configureMockStore([thunk])
describe('User Actions', () => {
  let store: any
  const gameData: iGamePlay = {
    winner: '1',
    player1: 'o',
    player2: 'x',
    draw: true,
    boxes: [],
  }
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })
  // tslint:disable-next-line: prettier
  afterEach(() => {
    moxios.uninstall()
  })

  describe('ADD_GAMEPLAY action will ADD Game Play', () => {
    it('dispatches ADD_GAMEPLAY action and returns data on success', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            id: '123',
          },
        })
      })
      return store.dispatch(addGamePlay(gameData)).then(() => {
        const actions = store.getActions()
        expect.assertions(3)
        expect(actions[0].type).toEqual(ADD_GAMEPLAY_REQUEST)
        expect(actions[1].type).toEqual(ADD_GAMEPLAY_SUCCESS)
        expect(actions[1].payload).toEqual('123')
      })
    })

    it('tests ADD_GAMEPLAY action and that returns an error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 404,
        })
      })
      return store.dispatch(addGamePlay(gameData)).then(() => {
        const actions = store.getActions()
        expect.assertions(3)
        expect(actions[0].type).toEqual(ADD_GAMEPLAY_REQUEST)
        expect(actions[1].type).toEqual(ADD_GAMEPLAY_FAILURE)
        expect(actions[1].payload.error).toEqual('Request failed with status code 404')
      })
    })
  })
})
