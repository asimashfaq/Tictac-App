import React from 'react'
import { mount ,shallow } from 'enzyme'
import GameGrid from './index'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GameBox from '../gamebox/gamebox'
import GameModal from '../gamemodal/GameModal'
import thunk from 'redux-thunk'
jest.mock('../../redux/gamePlay/add/api')
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

let store: any
let wrapper: any

describe('GameGrid', () => {
  beforeEach(() => {
    store = mockStore({})
    wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
  })
  it('renders', () => {
    expect(wrapper)
  })

  it('have 9 GameBox, 3 GameModal', () => {
    console.log(wrapper.debug())
    expect(wrapper.render().find(GameBox)).toHaveLength(9)
    expect(wrapper.render().find(GameModal)).toHaveLength(3)
  })
  it('should perform click', () => {
    wrapper.find('button#box0').simulate('click')
    const text = wrapper.find('button#box0').text()
    expect(text == 'o' || text == 'x').toBeTruthy()
  })
  it('should win the game', () => {
    wrapper.find('button#box0').simulate('click')
    wrapper.find('button#box1').simulate('click')
    wrapper.find('button#box2').simulate('click')
    wrapper.find('button#box3').simulate('click')
    wrapper.find('button#box4').simulate('click')
    wrapper.find('button#box5').simulate('click')
    wrapper.find('button#box6').simulate('click')
    expect(
      wrapper.find('button#box0').text() == `o` || wrapper.find('button#box0').text() == `x`
    ).toBeTruthy() 
    expect(
      wrapper.find('button#box1').text() == `o` || wrapper.find('button#box1').text() == `x`
    ).toBeTruthy()
    expect(
      wrapper.find('button#box2').text() == `o` || wrapper.find('button#box2').text() == `x`
    ).toBeTruthy()
    expect(
      wrapper.find('button#box3').text() == `o` || wrapper.find('button#box3').text() == `x`
    ).toBeTruthy()
    expect(
      wrapper.find('button#box4').text() == `o` || wrapper.find('button#box4').text() == `x`
    ).toBeTruthy()
    expect(
      wrapper.find('button#box5').text() == `o` || wrapper.find('button#box5').text() == `x`
    ).toBeTruthy()
  })
})
