import React from 'react';
import GamePlays from './gamePlays'
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

let wrapper:any;
beforeEach(() => {
    wrapper = shallow(
        <Provider store={store}>
            <GamePlays />
        </Provider>);
});
describe('<GamePlays /> rendering', () => {
    it ('should render correctly ',()=>{
        expect(wrapper).toMatchSnapshot();
    })
});