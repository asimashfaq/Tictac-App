import React from 'react'
import { mount } from 'enzyme'
import GamePlays from './index'

let wrapper: any
describe('GamePlays', () => {
  it('renders game play successfully', () => {
    let props = {
      cloumns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Player 1',
          dataIndex: 'player1',
          key: 'player1',
        },
      ],
      data: [
        {
          id: '1',
          player1: 'o',
        },
        {
          id: '2',
          player1: 'x',
        },
        {
          id: '3',
          player1: 'o',
        },
      ],
    }
    wrapper = mount(<GamePlays {...props} />)
    expect(wrapper.find('Table').length > 0).toBeTruthy()
    // console.log(wrapper.debug())
  })
  it('should show error message', () => {
    let props = {
      cloumns: [],
      data: [],
    }
    wrapper = mount(<GamePlays {...props} />)
    expect(wrapper.find(`.msg`).text()).toEqual(`No data to load`)
  })
})
