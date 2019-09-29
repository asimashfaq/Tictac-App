import React from 'react'
import { mount, shallow } from 'enzyme'
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
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders', () => {
    expect(wrapper)
  })

  it('have 9 GameBox, 3 GameModal', () => {
    
    expect(wrapper.find(GameBox)).toHaveLength(9)
    expect(wrapper.find(GameModal)).toHaveLength(3)
  })
  it('should perform click', () => {
    wrapper.find('button#box0').simulate('click')
    const text = wrapper.find('button#box0').text()
    expect(text == 'o' || text == 'x').toBeTruthy()
  })
  it('should win the game', () => {
    wrapper.props().store.dispatch = jest.fn()
    // wrapper.update()
    wrapper.find('button#box0').simulate('click')
    wrapper.find('button#box1').simulate('click')
    wrapper.find('button#box2').simulate('click')
    wrapper.find('button#box3').simulate('click')
    wrapper.find('button#box4').simulate('click')
    wrapper.find('button#box5').simulate('click')
    wrapper.find('button#box6').simulate('click')
    expect(
      wrapper.find('.ant-result-subtitle').text() == `Player 1 Wins` ||
        wrapper.find('.ant-result-subtitle').text() == `Player 2 Wins`
    )
  })
  it('should draw the game', () => {
    wrapper.props().store.dispatch = jest.fn()
    // wrapper.update()
    wrapper.find('button#box0').simulate('click')
    wrapper.find('button#box8').simulate('click')
    wrapper.find('button#box2').simulate('click')
    wrapper.find('button#box1').simulate('click')
    wrapper.find('button#box5').simulate('click')
    wrapper.find('button#box3').simulate('click')
    wrapper.find('button#box7').simulate('click')
    wrapper.find('button#box6').simulate('click')
    wrapper.find('button#box4').simulate('click')
    expect(wrapper.find('.ant-result-subtitle').text() == `Both players failed`)
  })
  it('should reply the game', () => {
    wrapper.props().store.dispatch = jest.fn()
    // wrapper.update()
    wrapper.find('button#box0').simulate('click')
    wrapper.find('button#box1').simulate('click')
    wrapper.find('button#box2').simulate('click')
    wrapper.find('button#box3').simulate('click')
    wrapper.find('button#box4').simulate('click')
    wrapper.find('button#box5').simulate('click')
    wrapper.find('button#box6').simulate('click')
    setTimeout(() => {
      wrapper.find('button#replay').simulate('click')
      let text = wrapper.find('button#box0').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box1').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box2').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box3').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box4').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box5').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box6').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      expect(wrapper.find('.ant-result-subtitle').text() == `Reply End`)
    }, 500)
  })

  it('should reset the UI', () => {
    wrapper.props().store.dispatch = jest.fn()
    // wrapper.update()
    wrapper.find('button#box0').simulate('click')
    wrapper.find('button#box1').simulate('click')
    wrapper.find('button#box2').simulate('click')
    wrapper.find('button#box3').simulate('click')
    wrapper.find('button#box4').simulate('click')
    wrapper.find('button#box5').simulate('click')
    wrapper.find('button#box6').simulate('click')
    
    setTimeout(() => {
      wrapper.find('button#play_again').simulate('click')
      expect(wrapper.find('button#box0').text() == '-').toBeTruthy()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
      expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
      expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
      expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
      expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    }, 500)
  })
})
