import React from 'react'
import { mount, shallow } from 'enzyme'
import GameGrid from './index'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GameBox from '../gamebox/gamebox'
import GameModal from '../gamemodal/index'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { act } from '@testing-library/react'
import waitForExpect from 'wait-for-expect'

jest.mock('../../redux/gamePlay/add/api')
jest.mock('../../shared/functions/')
const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

let store: any

const WiningSetps = async (wrapper: any) => {
  await act(async () => {
    wrapper.find('button#box0').simulate('click')
  })

  await act(async () => {
    wrapper.find('button#box1').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box2').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box3').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box4').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box5').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box6').simulate('click')
  })
  await wrapper.update()
}

const Wining9Steps = async (wrapper: any) => {
  await act(async () => {
    wrapper.find('button#box0').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box8').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box2').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box6').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box4').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box5').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box7').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box3').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box1').simulate('click')
  })
  await wrapper.update()
}

const DrawSteps = async (wrapper: any) => {
  await act(async () => {
    wrapper.find('button#box0').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box8').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box2').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box1').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box5').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box3').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box7').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box6').simulate('click')
  })
  await act(async () => {
    wrapper.find('button#box4').simulate('click')
  })
  await wrapper.update()
}

const WrapperCleanUp = (wrapper: any) => {
  wrapper.unmount()
  wrapper = null
}

describe('GameGrid', () => {
  let wrapper: any
  jest.setTimeout(10000)
  store = mockStore()

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
    //wrapper.update()
  })

  it('renders', () => {
    expect(wrapper)
  })

  it('have 9 GameBox, 3 GameModal', () => {
    expect(wrapper.find(GameBox)).toHaveLength(9)
    expect(wrapper.find(GameModal)).toHaveLength(3)
  })
  it('should not call the replay at start', () => {
    expect(wrapper.find('button#replay').length).toEqual(0)
  })
  it('should not call the play_again at start', () => {
    expect(wrapper.find('button#play_again').length).toEqual(0)
  })
  /********************/

  it('should win the game', async () => {
    expect.assertions(1)
    wrapper.props().store.dispatch = jest.fn()
    await WiningSetps(wrapper)
    await waitForExpect(() => {
      wrapper.update()
      expect(
        wrapper.find('.ant-result-subtitle').text() == `Player 1 Wins` ||
          wrapper.find('.ant-result-subtitle').text() == `Player 2 Wins`
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
  })

  it('should win the game and playagain', async () => {
    expect.assertions(8)
    await WiningSetps(wrapper)
    await act(async () => {
      wrapper.find('button#successplay_again').simulate('click')
    })
    await waitForExpect(() => {
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
      WrapperCleanUp(wrapper)
    })
  })

  it('should win the game and replay', async () => {
    await WiningSetps(wrapper)
    await act(async () => {
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
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
      WrapperCleanUp(wrapper)
    })
    expect.assertions(8)
  })

  it('should win the game,reply the game and play again', async () => {
    await WiningSetps(wrapper)
    await act(async () => {
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      wrapper.find('button#warningplay_again').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(2)
  })

  it('should win the game,replay the game and replay again', async () => {
    await WiningSetps(wrapper)
    await act(async () => {
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      wrapper.find('button#warningreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(
        wrapper.find('button#box1').text() == 'o' || wrapper.find('button#box1').text() == 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box3').text() == 'o' || wrapper.find('button#box3').text() == 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box5').text() == 'o' || wrapper.find('button#box5').text() == 'x'
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(4)
  })
})

describe('GameGrid Wins with 9 Steps', () => {
  let wrapper: any
  jest.setTimeout(10000)
  store = mockStore()

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
    //wrapper.update()
  })

  it('should win the game  with 9 Steps', async () => {
    expect.assertions(1)
    wrapper.props().store.dispatch = jest.fn()
    await Wining9Steps(wrapper)
    await waitForExpect(() => {
      wrapper.update()
      expect(
        wrapper.find('.ant-result-subtitle').text() == `Player 1 Wins` ||
          wrapper.find('.ant-result-subtitle').text() == `Player 2 Wins`
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
  })

  it('should win the game and playagain  with 9 Steps', async () => {
    expect.assertions(8)
    await Wining9Steps(wrapper)
    await act(async () => {
      wrapper.find('button#successplay_again').simulate('click')
    })
    await waitForExpect(() => {
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
      WrapperCleanUp(wrapper)
    })
  })

  it('should win the game and replay  with 9 Steps', async () => {
    await Wining9Steps(wrapper)
    await act(async () => {
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
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
      WrapperCleanUp(wrapper)
    })
    expect.assertions(8)
  })

  it('should win the game,reply the game and play again  with 9 Steps', async () => {
    await Wining9Steps(wrapper)
    await act(async () => {
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      wrapper.find('button#warningplay_again').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(2)
  })

  it('should win the game,replay the game and replay again  with 9 Steps', async () => {
    await Wining9Steps(wrapper)
    await act(async () => {
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      wrapper.find('button#warningreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(
        wrapper.find('button#box1').text() == 'o' || wrapper.find('button#box1').text() == 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box3').text() == 'o' || wrapper.find('button#box3').text() == 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box5').text() == 'o' || wrapper.find('button#box5').text() == 'x'
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(4)
  })
})

describe('GameGrid Draw with 9 Steps', () => {
  let wrapper: any
  jest.setTimeout(10000)
  store = mockStore()

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
    //wrapper.update()
  })

  it('should Draw the game  with 9 Steps', async () => {
    expect.assertions(1)
    wrapper.props().store.dispatch = jest.fn()
    await DrawSteps(wrapper)
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-subtitle').text()).toEqual(`Both players failed`)
      WrapperCleanUp(wrapper)
    })
  })

  it('should Draw the game and playagain  with 9 Steps', async () => {
    expect.assertions(8)
    await DrawSteps(wrapper)
    await act(async () => {
      wrapper.find('button#errorplay_again').simulate('click')
    })
    await waitForExpect(() => {
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
      WrapperCleanUp(wrapper)
    })
  })

  it('should Draw the game and replay  with 9 Steps', async () => {
    await DrawSteps(wrapper)
    await act(async () => {
      wrapper.find('button#errorreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
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
      WrapperCleanUp(wrapper)
    })
    expect.assertions(8)
  })

  it('should Draw the game,reply the game and play again  with 9 Steps', async () => {
    await DrawSteps(wrapper)
    await act(async () => {
      wrapper.find('button#errorreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      wrapper.find('button#warningplay_again').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('button#box1').text() == '-').toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(2)
  })

  it('should Draw the game,replay the game and replay again  with 9 Steps', async () => {
    await DrawSteps(wrapper)
    await act(async () => {
      wrapper.find('button#errorreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      wrapper.find('button#warningreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(
        wrapper.find('button#box1').text() == 'o' || wrapper.find('button#box1').text() == 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box3').text() == 'o' || wrapper.find('button#box3').text() == 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box5').text() == 'o' || wrapper.find('button#box5').text() == 'x'
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(4)
  })
})
