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
import { act } from '@testing-library/react'
import { ExceptionMap } from 'antd/lib/result'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

let store: any
jest.mock('../../shared/functions/')

describe('GameGrid', () => {
  let wrapper: any

  beforeEach(() => {
    store = mockStore({})
    //

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
    wrapper.update()
  })
  afterEach(() => {
    //wrapper.unmount()
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

  it('should not call the replay at start', () => {
    expect(wrapper.find('button#replay').length).toEqual(0)
  })
  it('should not call the play_again at start', () => {
    expect(wrapper.find('button#play_again').length).toEqual(0)
  })
  /********************/

  it('should win the game', () => {
    wrapper.props().store.dispatch = jest.fn()
    // wrapper.update()

    act(() => {
      wrapper.find('button#box0').simulate('click')
    })

    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    wrapper.update()
    expect(
      wrapper.find('.ant-result-subtitle').text() == `Player 1 Wins` ||
        wrapper.find('.ant-result-subtitle').text() == `Player 2 Wins`
    )
  })
  it('should win the game and replay', async done => {
    wrapper.props().store.dispatch = jest.fn(() => {
      console.log('in dispatch mock')
    })
    act(() => {
      wrapper.find('button#box0').simulate('click')
    })

    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    wrapper.update()
    act(() => {
      wrapper.find('button#successreplay').simulate('click')
    })
    wrapper.update()

    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()

    wrapper.update()
    // expect.assertions(17)
    setTimeout(() => {
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
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')

      done()
    }, 10)
    expect.assertions(16)
  })
  it('should win the game,reply the game and play again', async done => {
    wrapper.props().store.dispatch = jest.fn(() => {
      console.log('in dispatch mock')
    })
    act(() => {
      wrapper.find('button#box0').simulate('click')
    })

    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    wrapper.update()
    act(() => {
      wrapper.find('button#successreplay').simulate('click')
    })
    wrapper.update()

    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()

    wrapper.update()
    // expect.assertions(17)
    setTimeout(() => {
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
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
      act(() => {
        wrapper.find('button#warningplay_again').simulate('click')
      })
      wrapper.update()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      done()
    }, 10)
    expect.assertions(17)
  })
  it('should win the game,replay the game and replay again', async done => {
    wrapper.props().store.dispatch = jest.fn(() => {
      console.log('in dispatch mock')
    })
    act(() => {
      wrapper.find('button#box0').simulate('click')
    })

    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    wrapper.update()
    act(() => {
      wrapper.find('button#successreplay').simulate('click')
    })
    wrapper.update()

    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()

    wrapper.update()
    // expect.assertions(17)
    setTimeout(() => {
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
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
      act(() => {
        wrapper.find('button#warningreplay').simulate('click')
      })
      wrapper.update()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      done()
    }, 10)
    expect.assertions(17)
  })
  it('should win the game and playagain', async done => {
    wrapper.props().store.dispatch = jest.fn(() => {
      console.log('in dispatch mock')
    })
    act(() => {
      wrapper.find('button#box0').simulate('click')
    })

    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    wrapper.update()
    act(() => {
      wrapper.find('button#successplay_again').simulate('click')
    })
    wrapper.update()

    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()
    wrapper.update()
    expect.assertions(8)
    done()
  })

  /********************/
  /* it('should draw the game', () => {
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

  it('should draw the game and reply', () => {
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

    act(() => {
      wrapper.find('button#errorreplay').simulate('click')
      jest.runAllTimers()
      expect(wrapper.find('.ant-result-subtitle').text() == `Reply End`)
    })
  })

  it('should draw the game,reply the game and play again ', () => {
    wrapper.props().store.dispatch = jest.fn()

    wrapper.find('button#box0').simulate('click')
    wrapper.find('button#box8').simulate('click')
    wrapper.find('button#box2').simulate('click')
    wrapper.find('button#box1').simulate('click')
    wrapper.find('button#box5').simulate('click')
    wrapper.find('button#box3').simulate('click')
    wrapper.find('button#box7').simulate('click')
    wrapper.find('button#box6').simulate('click')
    wrapper.find('button#box4').simulate('click')

    act(() => {
      wrapper.find('button#errorreplay').simulate('click')
      jest.runAllTimers()
      expect(wrapper.find('.ant-result-subtitle').text() == `Reply End`)
      wrapper.find('button#warningplay_again').simulate('click')
      expect(wrapper.find('button#box0').text() == '-').toBeTruthy()
    })
  })

  it('should win the game,replay the game and replay again', () => {
    wrapper.props().store.dispatch = jest.fn()

    wrapper.find('button#box0').simulate('click')
    wrapper.find('button#box8').simulate('click')
    wrapper.find('button#box2').simulate('click')
    wrapper.find('button#box1').simulate('click')
    wrapper.find('button#box5').simulate('click')
    wrapper.find('button#box3').simulate('click')
    wrapper.find('button#box7').simulate('click')
    wrapper.find('button#box6').simulate('click')
    wrapper.find('button#box4').simulate('click')

    act(() => {
      wrapper.find('button#errorreplay').simulate('click')
      jest.runAllTimers()
      expect(wrapper.find('.ant-result-subtitle').text() == `Reply End`)
      wrapper.find('button#warningreplay').simulate('click')
      jest.runAllTimers()
      expect(wrapper.find('.ant-result-subtitle').text() == `Reply End`)
    })
  })

  it('should draw the game and play again', () => {
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
    act(() => {
      wrapper.find('button#errorplay_again').simulate('click')
      expect(wrapper.find('button#box0').text() == '-').toBeTruthy()
    })
  })*/
})

/*
describe('GameGrid with 9 Steps', () => {
  let wrapper: any

  beforeEach(() => {
    store = mockStore({})
    //

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
    wrapper.update()
  })
  afterEach(() => {
    //wrapper.unmount()
  })




  it('should win the game with 9 steps', async done => {
    wrapper.props().store.dispatch = jest.fn()

    act(() => {
      wrapper.find('button#box0').simulate('click')
    })
    act(() => {
      wrapper.find('button#box8').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box7').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    wrapper.update()
    expect(
      wrapper.find('.ant-result-subtitle').text() == `Player 1 Wins` ||
        wrapper.find('.ant-result-subtitle').text() == `Player 2 Wins`
    )
  })

  it('should win the game and reply with 9 steps', async done => {
    wrapper.props().store.dispatch = jest.fn()
    act(() => {
      wrapper.find('button#box0').simulate('click')
    })
    act(() => {
      wrapper.find('button#box8').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box7').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    wrapper.update()
    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()

    wrapper.update()
    // expect.assertions(17)
    setTimeout(() => {
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
      text = wrapper.find('button#box7').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box8').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')

      done()
    }, 10)
    expect.assertions(18)
  })

  it('should win the game,reply the game and play again with 9 steps', async done => {
    wrapper.props().store.dispatch = jest.fn()
    act(() => {
      wrapper.find('button#box0').simulate('click')
    })
    act(() => {
      wrapper.find('button#box8').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box7').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    wrapper.update()

    act(() => {
      wrapper.find('button#successreplay').simulate('click')
    })
    wrapper.update()

    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()

    wrapper.update()
    // expect.assertions(17)
    setTimeout(() => {
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
      text = wrapper.find('button#box7').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box8').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
      act(() => {
        wrapper.find('button#warningplay_again').simulate('click')
      })
      wrapper.update()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      done()
    }, 10)
    expect.assertions(19)
  })

  it('should win the game,replay the game and replay again with 9 steps', async done => {
    wrapper.props().store.dispatch = jest.fn()

    act(() => {
      wrapper.find('button#box0').simulate('click')
    })
    act(() => {
      wrapper.find('button#box8').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box7').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    wrapper.update()

    act(() => {
      wrapper.find('button#successreplay').simulate('click')
    })
    wrapper.update()

    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()

    wrapper.update()
    // expect.assertions(17)
    setTimeout(() => {
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
      text = wrapper.find('button#box7').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      text = wrapper.find('button#box8').text()
      expect(text == 'o' || text == 'x').toBeTruthy()
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
      act(() => {
        wrapper.find('button#warningreplay').simulate('click')
      })
      wrapper.update()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      done()
    }, 10)
    expect.assertions(19)
  })

  it('should win the game and playagain with 9 steps', async done => {
    wrapper.props().store.dispatch = jest.fn()
    act(() => {
      wrapper.find('button#box0').simulate('click')
    })
    act(() => {
      wrapper.find('button#box8').simulate('click')
    })
    act(() => {
      wrapper.find('button#box2').simulate('click')
    })
    act(() => {
      wrapper.find('button#box6').simulate('click')
    })
    act(() => {
      wrapper.find('button#box4').simulate('click')
    })
    act(() => {
      wrapper.find('button#box5').simulate('click')
    })
    act(() => {
      wrapper.find('button#box7').simulate('click')
    })
    act(() => {
      wrapper.find('button#box3').simulate('click')
    })
    act(() => {
      wrapper.find('button#box1').simulate('click')
    })
    wrapper.update()
    act(() => {
      wrapper.find('button#successplay_again').simulate('click')
    })
    wrapper.update()

    expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box2').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box3').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box4').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box5').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box6').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box7').text() == '-').toBeTruthy()
    expect(wrapper.find('button#box8').text() == '-').toBeTruthy()
    expect.assertions(8)
    done()
  })
})
*/
