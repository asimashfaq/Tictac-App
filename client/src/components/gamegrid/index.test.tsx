/**
 * Perform Testing for @GameGrid
 **/
import React from 'react'
import { mount, shallow } from 'enzyme'
import GameGrid from './index'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GameBox from '../gamebox'
import GameModal from '../gamemodal/index'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
// act is function to update the state of the wrapper
import { act } from '@testing-library/react'
import waitForExpect from 'wait-for-expect'

// mock the API function for saving the gameplay
jest.mock('../../redux/gamePlay/add/api')
// mock the function to bypass the timer
jest.mock('../../shared/functions/')

// initialize the mock store middlewares
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store: any

/**
 *  func @WiningSteps will simulate the  winning steps
 *  it take 7 steps to win the game.
 **/

const WiningSteps = async (wrapper: any) => {
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

/**
 *  func @Wining9Steps will simulate the  winning steps
 *  it take 9 steps to win the game.
 **/

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

/**
 *  func @DrawSteps will simulate the  winning steps
 *  it take 9 steps to draw the game.
 **/

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

/**
 *  func @WrapperCleanUp will destory the wrapper object
 *  Unmount the wrapper and then assign to null
 **/
const WrapperCleanUp = (wrapper: any) => {
  wrapper.unmount()
  // tslint:disable-next-line: no-parameter-reassignment
  wrapper = null
}

describe('GameGrid', () => {
  let wrapper: any
  jest.setTimeout(10000)
  store = mockStore()

  beforeEach(() => {
    /**
     * Mount the @GameGrid
     * Required Provider and Memory Router to Render the @GameGrid Component
     **/
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <GameGrid />
        </MemoryRouter>
      </Provider>
    )
  })

  it('renders', () => {
    expect(wrapper).not.toBeNull()
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
  it('should win the game', async () => {
    expect.assertions(1)
    // implement the fake implement for dispatch
    // need to avoid the call go to the thunk store
    wrapper.props().store.dispatch = jest.fn()
    await WiningSteps(wrapper)
    await waitForExpect(() => {
      wrapper.update()
      expect(
        wrapper.find('.ant-result-subtitle').text() === `Player 1 Wins` ||
          wrapper.find('.ant-result-subtitle').text() === `Player 2 Wins`
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
  })

  it('should win the game and playagain', async () => {
    expect.assertions(8)
    // simulate the win events
    await WiningSteps(wrapper)
    await act(async () => {
      // sumulate the Play again event
      wrapper.find('button#successplay_again').simulate('click')
    })
    /**
     * the @GameGrid should reset the UI and let the players play again.
     * validiting the UI Changes
     * by checking all the boxes values should be '-'
     **/
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('button#box1').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box2').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box3').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box4').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box5').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box6').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box7').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box8').text() === '-').toBeTruthy()
      wrapper.update()
      WrapperCleanUp(wrapper)
    })
  })
  it('should win the game and replay', async () => {
    await WiningSteps(wrapper)
    await act(async () => {
      wrapper.find('button#successreplay').simulate('click')
    })
    /**
     * the @GameGrid should reset the UI and start the replay.
     **/
    await waitForExpect(() => {
      wrapper.update()
      let text = wrapper.find('button#box0').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box1').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box2').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box3').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box4').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box5').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box6').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      wrapper.update()
      /**
       * validiting the replay end
       **/
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
      WrapperCleanUp(wrapper)
    })
    expect.assertions(8)
  })

  it('should win the game,reply the game and play again', async () => {
    // simulat the win event
    await WiningSteps(wrapper)
    await act(async () => {
      // do replay
      wrapper.find('button#successreplay').simulate('click')
    })
    // wait for replay to end
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    // play the game again after watching replay
    await act(async () => {
      wrapper.find('button#warningplay_again').simulate('click')
    })
    // validating the UI is reset
    await waitForExpect(() => {
      wrapper.update()
      expect(wrapper.find('button#box1').text() === '-').toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(2)
  })

  it('should win the game,replay the game and replay again', async () => {
    // simulat the win event
    await WiningSteps(wrapper)
    await act(async () => {
      // do replay
      wrapper.find('button#successreplay').simulate('click')
    })
    
    await waitForExpect(() => {
      wrapper.update()
      // wait for replay to end
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      // watch replay again
      wrapper.find('button#warningreplay').simulate('click')
    })
    await waitForExpect(() => {
      // validating the replay
      wrapper.update()
      expect(
        wrapper.find('button#box1').text() === 'o' || wrapper.find('button#box1').text() === 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box3').text() === 'o' || wrapper.find('button#box3').text() === 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box5').text() === 'o' || wrapper.find('button#box5').text() === 'x'
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
    // wrapper.update()
  })

  it('should win the game  with 9 Steps', async () => {
    expect.assertions(1)
    wrapper.props().store.dispatch = jest.fn()
    // simulate win event
    await Wining9Steps(wrapper)
    await waitForExpect(() => {
      wrapper.update()
      expect(
        // check for winner
        wrapper.find('.ant-result-subtitle').text() === `Player 1 Wins` ||
          wrapper.find('.ant-result-subtitle').text() === `Player 2 Wins`
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
  })

  it('should win the game and playagain  with 9 Steps', async () => {
    expect.assertions(8)
    // simulate win event
    await Wining9Steps(wrapper)
    await act(async () => {
      // play game again
      wrapper.find('button#successplay_again').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validating the ui is reset
      expect(wrapper.find('button#box1').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box2').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box3').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box4').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box5').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box6').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box7').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box8').text() === '-').toBeTruthy()
      wrapper.update()
      WrapperCleanUp(wrapper)
    })
  })

  it('should win the game and replay  with 9 Steps', async () => {
    // simulate win event
    await Wining9Steps(wrapper)
    await act(async () => {
      // click replay
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validating the replay
      let text = wrapper.find('button#box0').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box1').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box2').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box3').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box4').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box5').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box6').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      wrapper.update()
      // validate replay end
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
      WrapperCleanUp(wrapper)
    })
    expect.assertions(8)
  })

  it('should win the game,reply the game and play again  with 9 Steps', async () => {
    // simulate win event
    await Wining9Steps(wrapper)
    await act(async () => {
      // click replay
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validate replay end
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      // play the game again
      wrapper.find('button#warningplay_again').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validating the UI should be reset at game play
      expect(wrapper.find('button#box1').text() === '-').toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(2)
  })

  it('should win the game,replay the game and replay again  with 9 Steps', async () => {
    // simulate win event
    await Wining9Steps(wrapper)
    await act(async () => {
      // watch replay
      wrapper.find('button#successreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validate replay to end
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      // watch replay again
      wrapper.find('button#warningreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(
        // validating replay
        wrapper.find('button#box1').text() === 'o' || wrapper.find('button#box1').text() === 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box3').text() === 'o' || wrapper.find('button#box3').text() === 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box5').text() === 'o' || wrapper.find('button#box5').text() === 'x'
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
    // wrapper.update()
  })

  it('should Draw the game  with 9 Steps', async () => {
    expect.assertions(1)
    wrapper.props().store.dispatch = jest.fn()
    // simulate draw event
    await DrawSteps(wrapper)
    await waitForExpect(() => {
      wrapper.update()
      // validate the draw match event
      expect(wrapper.find('.ant-result-subtitle').text()).toEqual(`Both players failed`)
      WrapperCleanUp(wrapper)
    })
  })

  it('should Draw the game and playagain  with 9 Steps', async () => {
    expect.assertions(8)
    // simulate draw event
    await DrawSteps(wrapper)
    await act(async () => {
      // watch replay
      wrapper.find('button#errorplay_again').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validate the UI is reset
      expect(wrapper.find('button#box1').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box2').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box3').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box4').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box5').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box6').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box7').text() === '-').toBeTruthy()
      expect(wrapper.find('button#box8').text() === '-').toBeTruthy()
      wrapper.update()
      WrapperCleanUp(wrapper)
    })
  })

  it('should Draw the game and replay  with 9 Steps', async () => {
    // simulate draw event
    await DrawSteps(wrapper)
    await act(async () => {
      // watch replay
      wrapper.find('button#errorreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validate the UI after replay end.
      let text = wrapper.find('button#box0').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box1').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box2').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box3').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box4').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box5').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      text = wrapper.find('button#box6').text()
      expect(text === 'o' || text === 'x').toBeTruthy()
      wrapper.update()
      // validate replay end
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
      WrapperCleanUp(wrapper)
    })
    expect.assertions(8)
  })

  it('should Draw the game,reply the game and play again  with 9 Steps', async () => {
    // simulate draw event
    await DrawSteps(wrapper)
    await act(async () => {
      // watch replay
      wrapper.find('button#errorreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validate replay end
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      // play the game again
      wrapper.find('button#warningplay_again').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validate UI is ready to play new game
      expect(wrapper.find('button#box1').text() === '-').toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(2)
  })

  it('should Draw the game,replay the game and replay again  with 9 Steps', async () => {
    // simulate draw event
    await DrawSteps(wrapper)
    await act(async () => {
      // click replay
      wrapper.find('button#errorreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      // validate replay end
      expect(wrapper.find('.ant-result-info>.ant-result-title').text()).toEqual('Reply End')
    })
    await act(async () => {
      // watch replay again.
      wrapper.find('button#warningreplay').simulate('click')
    })
    await waitForExpect(() => {
      wrapper.update()
      expect(
        // validate the UI
        wrapper.find('button#box1').text() === 'o' || wrapper.find('button#box1').text() === 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box3').text() === 'o' || wrapper.find('button#box3').text() === 'x'
      ).toBeTruthy()
      expect(
        wrapper.find('button#box5').text() === 'o' || wrapper.find('button#box5').text() === 'x'
      ).toBeTruthy()
      WrapperCleanUp(wrapper)
    })
    expect.assertions(4)
  })
})
