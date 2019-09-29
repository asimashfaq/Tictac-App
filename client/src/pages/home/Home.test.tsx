import React from 'react'
import Home from './Home'
import { shallow } from 'enzyme'

let wrapper: any
beforeEach(() => {
  wrapper = shallow(<Home />)
})
describe('<Home /> rendering', () => {
  it('should render correctly ', () => {
    expect(wrapper)
  })

})
