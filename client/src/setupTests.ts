import React from 'react'
import { shallow, render, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
// React 16 Enzyme adapter
configure({ adapter: new Adapter() })
