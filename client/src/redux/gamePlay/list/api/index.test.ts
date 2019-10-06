import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getGamePlays } from './index'
import { GET_GAMEPLAYS_REQUEST, GET_GAMEPLAYS_SUCCESS, GET_GAMEPLAYS_FAILURE } from '../actions'
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

  describe('GET_GAMEPLAYS action listgameplays', () => {
    it('dispatches GET_GAMEPLAYS action and returns data on success', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [
            {
              id: '1',
              boxes: [
                {
                  id: 'box0',
                },
              ],
              player1: '1',
            },
          ],
        })
      })
      return store.dispatch(getGamePlays()).then(() => {
        const actions = store.getActions()
        expect.assertions(3)
        expect(actions[0].type).toEqual(GET_GAMEPLAYS_REQUEST)
        expect(actions[1].type).toEqual(GET_GAMEPLAYS_SUCCESS)
        expect(actions[1].payload[0].player1).toEqual('1')
      })
    })

    it('tests GET_GAMEPLAYS action and that returns an error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 404,
        })
      })
      return store.dispatch(getGamePlays()).then(() => {
        const actions = store.getActions()
        expect.assertions(3)
        expect(actions[0].type).toEqual(GET_GAMEPLAYS_REQUEST)
        expect(actions[1].type).toEqual(GET_GAMEPLAYS_FAILURE)
        expect(actions[1].payload.error).toEqual('Request failed with status code 404')
      })
    })
  })
})
