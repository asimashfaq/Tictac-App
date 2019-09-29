import React from 'react'
import { mount, shallow } from 'enzyme'
import GameModal from './GameModal'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GameBox from '../gamebox/gamebox'
import thunk from 'redux-thunk'
// jest.mock('../../redux/gamePlay/add/api')
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

let store: any
let wrapper: any

describe('GameModal', () => {
  beforeEach(() => {
    let props = {
      visible: true,
      mstatus: 'Mesage', // message status
      title: 'Title',
      subtitle: 'subtitle',
      playagain: jest.fn(),
      replay: jest.fn(),
    }
    store = mockStore({})
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameModal {...props} />
        </MemoryRouter>
      </Provider>
    )
  })
  afterEach(() => {
    // wrapper.unmount()
  })

  it('renders', () => {
    expect(wrapper)
  })

 
})
