import { mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'
import TestComponent from './index'
import renderer from 'react-test-renderer';

const props = {
    text: 'test message',
    type: 'default',
    open: true,
    onClose: jest.fn(),
    autoClose: 0,
    hiddenButton: false,
    modal: false,
}

const withHOC = ui => (
    <ThemeProvider theme={theme}>
        {ui}
    </ThemeProvider >
)

describe('enzyme Paginator', () => {
    let wrapper;
    let element;

    beforeEach(() => {
        element = withHOC(<TestComponent {...props} />)
    })

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('default SNAPSHOT should render correctly', () => {
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('check message should render correctly', () => {
        wrapper = mount(element);
        expect(wrapper.find('Text').html()).toMatch(/test message/);
    });

    it('check color render correctly', () => {
        wrapper = mount(element);
        const color = theme.extra.default.replace(/\s/g, '')
        expect(wrapper.find({ "data-test-id": "MessageStyled" })).toHaveStyleRule('background-color', color)
    });
});
