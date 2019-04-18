import LocalesProvider from 'LocalesProvider'
import StoreProvider from 'StoreProvider'
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'

import UserProfileForm from '../UserProfileForm';

const formState = {
    header: "Редактировать",
    saveButton: "Сохранить",
    submitForm: () => { }
}

const initialData = {
    email: "ovosh@mail.ru",
    fullname: "Моисеева Ульяна Дмитриевна",
    id: 5,
    isActive: 0,
    lastAct: "2019-04-03T19:18:33.000Z",
    money: 1200,
    phone: "",
    regDate: "2019-02-18T22:10:14.000Z",
    username: "sweet",
}

const withContext = ui => (
    <StoreProvider>
        <LocalesProvider>
            <ThemeProvider theme={theme}>
                {ui}
            </ThemeProvider >
        </LocalesProvider>
    </StoreProvider>
)

describe('UserProfileForm', () => {
    it('should render correctly', () => {
        const el = withContext(<UserProfileForm formState={formState} initialData={initialData} />)
        const tree = renderer.create(el).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
