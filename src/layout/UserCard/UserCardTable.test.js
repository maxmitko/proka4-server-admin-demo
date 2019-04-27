import LocalesProvider from 'LocalesProvider'
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux'
import { StoreContext } from 'redux-react-hook';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'

import UserCardMock from '../../__mocks__/UserCardMock'
import TestComponent from './UserCardTable'

beforeAll(() => {
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);
});

const mockStore = createStore((state, action) => UserCardMock);

const withHOC = ui => {
    return (
        <StoreContext.Provider value={mockStore}>
            <LocalesProvider>
                <ThemeProvider theme={theme}>
                    {ui}
                </ThemeProvider >
            </LocalesProvider>
        </StoreContext.Provider>
    )
}

const props = {
    userId: 5
}

describe('renderer UserCardTable', () => {
    let wrapper;
    let element;
    
    beforeEach(() => {
        element = withHOC(<TestComponent {...props} />)
    })

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('should render correctly', () => {
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
    });


    it('row count should render correctly', () => {
        wrapper = mount(element);
        expect(wrapper.find('tr')).toHaveLength(6);
    });
});
