import LocalesProvider from 'LocalesProvider'
import StoreProvider from 'StoreProvider'
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'

import userProfileMock from '../../__mocks__/userProfileMock'
import TestComponent from './UserProfile';

const withHOC = ui => (
    <StoreProvider>
        <LocalesProvider>
            <ThemeProvider theme={theme}>
                {ui}
            </ThemeProvider >
        </LocalesProvider>
    </StoreProvider>
)


describe('enzyme UserProfile', () => {

    let wrapper;
    let element;
    const mockData = userProfileMock.initialData

    beforeEach(() => {
        element = withHOC(<TestComponent {...userProfileMock} />)
    });

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('default SNAPSHOT should render correctly', () => {
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('check fields values', () => {
        wrapper = mount(element);

        const formFields = ["username", "fullname", "email", "money", "phone"]

        formFields.forEach(item => {
            expect(wrapper.find({ value: mockData[item] })).toBeDefined()
        })
    });
});