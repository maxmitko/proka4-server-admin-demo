import { mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'
import TestComponent from './index'
import renderer from 'react-test-renderer';
import produce from 'immer'

const props = {
    checked: true,
    disabled: false,
    color: 'default',
}

const withHOC = ui => (
    <ThemeProvider theme={theme}>
        {ui}
    </ThemeProvider >
)

describe('enzyme Radio', () => {
    let wrapper;
    let element;
    const dangerColor = theme.extra.danger.replace(/\s/g, '')

    beforeEach(() => {
        element = props => withHOC(<TestComponent {...props} />)
    })

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('default SNAPSHOT should render correctly', () => {
        const tree = renderer.create(element(props)).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('checked should render correctly', () => {
        wrapper = mount(element(props));
        expect(wrapper.find('div[checked=true] span').html()).toBeDefined();
    });
    
    it('unchecked should render correctly', () => {
        const newProps = produce(props, draftProps => {
            draftProps.checked = false
        })
        wrapper = mount(element(newProps));
        expect(() => { wrapper.find('div[checked=false] span').html() }).toThrow();
    });

    it('disabled should render correctly', () => {
        const newProps = produce(props, draftProps => {
            draftProps.disabled = true
        })
        wrapper = mount(element(newProps));
        expect(wrapper.find('div[checked=true]')).toHaveStyleRule("border-color", "#ccc");
        expect(wrapper.find('div[checked=true] span')).toHaveStyleRule("background-color", "#ccc");
    });
    
    it('change color should render correctly', () => {
        const newProps = produce(props, draftProps => {
            draftProps.color = 'danger'
        })
        wrapper = mount(element(newProps));

        expect(wrapper.find('div[checked=true]')).toHaveStyleRule("border-color", dangerColor);
        expect(wrapper.find('div[checked=true] span')).toHaveStyleRule("background-color", dangerColor);
    });

});
