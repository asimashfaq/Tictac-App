/**
 * Test @GameModal
 **/
import React from 'react'
import { mount } from 'enzyme'
import GameModal from './index'
import { MemoryRouter } from 'react-router-dom'
import { Result } from 'antd'
import { act } from '@testing-library/react'
import waitForExpect from 'wait-for-expect'
import sinon from 'sinon'

let wrapper: any

describe('GameModal', () => {
  beforeEach(() => {})
  afterEach(() => {
    // wrapper.unmount()
  })

  it('renders success modal', () => {
    const props = {
      visible: true,
      mstatus: 'success', // message status
      title: 'Title',
      subtitle: 'subtitle',
      playagain: jest.fn(),
      replay: jest.fn(),
    }
    wrapper = mount(
      <MemoryRouter>
        <GameModal {...props} />
      </MemoryRouter>
    )
    // validate the success message to show
    expect(wrapper.find('.ant-result-success').length).toEqual(1)
  })
  it('renders info modal', () => {
    const props = {
      visible: true,
      mstatus: 'info', // message status
      title: 'Title',
      subtitle: 'subtitle',
      playagain: jest.fn(),
      replay: jest.fn(),
    }
    wrapper = mount(
      <MemoryRouter>
        <GameModal {...props} />
      </MemoryRouter>
    )
    // validate the info message to show
    expect(wrapper.find('.ant-result-info').length).toEqual(1)
  })
  it('should not render child component of modal', () => {
    const props = {
      visible: false,
      mstatus: 'success', // message status
      title: 'Title',
      subtitle: 'subtitle',
      playagain: jest.fn(),
      replay: jest.fn(),
    }
    wrapper = mount(
      <MemoryRouter>
        <GameModal {...props} />
      </MemoryRouter>
    )
    // should not render the modal when visible
    expect(wrapper.find(Result).length).toEqual(0)
  })

  it('should simulate clicks', async () => {
    const props = {
      visible: true,
      mstatus: 'success', // message status
      title: 'Title',
      subtitle: 'subtitle',
      playagain: sinon.spy(),
      replay: sinon.spy(),
    }
    wrapper = mount(
      <MemoryRouter>
        <GameModal {...props} />
      </MemoryRouter>
    )
    await wrapper.update()
    await waitForExpect(() => {
      // validate the Play Again and Replay Button Exisits
      expect(wrapper.find('#successplay_again').length > 0).toBeTruthy()
      expect(wrapper.find('#successreplay').length > 0).toBeTruthy()
    })
    await act(async () => {
      // click the Play Again Button
      wrapper
        .find('#successplay_again')
        .first()
        .simulate('click')
    })
    await act(async () => {
      // Click the Replay Button
      wrapper
        .find('#successreplay')
        .first()
        .simulate('click')
    })

    await waitForExpect(() => {
      // validate the Button on Click Event
      expect(props.playagain).toHaveProperty('callCount', 1)
      expect(props.replay).toHaveProperty('callCount', 1)
    })
  })
})
