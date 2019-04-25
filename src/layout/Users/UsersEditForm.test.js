import 'jest-dom/extend-expect'

import LocalesProvider from 'LocalesProvider'
import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library'
import { createStore } from 'redux'
import { StoreContext } from 'redux-react-hook';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'

import UserCardMock from '../__mocks__/UserCardMock'
import UsersEditForm from './UsersEditForm';
import UserProfileMock from '../__mocks__/userProfileMock'
import produce from 'immer'

beforeAll(() => {
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);
});

afterEach(cleanup)

const mockStore = createStore((state, action) => UserCardMock);

const withHOC = ({ children }) => {
    return (
        <StoreContext.Provider value={mockStore}>
            <LocalesProvider>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider >
            </LocalesProvider>
        </StoreContext.Provider>
    )
}

describe('react-testing UsersEditForm', () => {

    const customRender = (ui, options) => render(ui, { wrapper: withHOC, ...options })

    it('card button should not render', () => {
        const newProps = produce(UserProfileMock, draftState => {
            draftState.initialData.id = undefined
        })

        const { getByText } = customRender(<UsersEditForm {...newProps} />)

        expect(() => { getByText('Карта клиента') }).toThrow(/Unable to find an element/);
    });

    it('Button & CornerBadge should render correctly', () => {
        const { getByText } = customRender(<UsersEditForm {...UserProfileMock} />)

        expect(() => { getByText('Карта клиента') }).not.toThrow(/Unable to find an element/);
        expect(getByText('Карта клиента').querySelector('span').textContent).toBe("5");
    });

    it('default SNAPSHOT should render correctly', () => {
        const { asFragment } = customRender(<UsersEditForm {...UserProfileMock} />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('classname should change after click', () => {
        const { getByText } = customRender(<UsersEditForm {...UserProfileMock} />)

        const profile = getByText('Личные данные').parentNode
        const card = getByText('Карта клиента').parentNode

        const temp = profile.className

        fireEvent.click(card)

        expect(temp).not.toEqual(profile.className);
    });
});