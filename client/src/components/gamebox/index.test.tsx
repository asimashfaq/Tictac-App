import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import GameBox from './gamebox'
import { Button } from 'antd'
describe('<GameBox />', () => {
  const onButtonClick = sinon.spy()
  it('renders the <GameBox /> components', () => {
    const ref = React.createRef<Button>()
    const wrapper = mount(<GameBox id="1" callback={onButtonClick} ref={ref} />)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
  it('simulate the click event', () => {
    let ref = React.createRef<Button>()
    const wrapper = mount(<GameBox id="1" callback={onButtonClick} ref={ref} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClick).toHaveProperty('callCount', 1)
    wrapper.unmount()
  })
})
