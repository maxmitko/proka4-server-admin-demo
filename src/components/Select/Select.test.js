import { mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'
import TestComponent from './index'
import renderer from 'react-test-renderer';

const props = {
    data: [{
        value: 'item1',
        label: 'item1'
    },
    {
        value: 'item2',
        label: 'item2'
    },
    {
        value: 'item3',
        label: 'item3'
    }],
    color: 'default',
    value: undefined,
}

beforeAll(() => {
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);
});

const withHOC = ui => (
    <ThemeProvider theme={theme}>
        {ui}
    </ThemeProvider >
)

describe('react-testing Select', () => {
    let wrapper;
    let element;

    beforeEach(() => {
        element = withHOC(<TestComponent {...props} />)
    })

    afterEach(() => {
        wrapper && wrapper.exists() && wrapper.unmount();
    });

    it('default SNAPSHOT should render correctly', () => {
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('check List should render correctly', () => {
        wrapper = mount(element);
        wrapper.find('input').simulate('focus')
        expect(wrapper.find('ul').exists()).toBeTruthy();
    });

    it('select Item should render correctly', done => {
        wrapper = mount(element);
        wrapper.find('input').simulate('focus')
        expect(wrapper.find('ul').exists()).toBeTruthy();
        wrapper.find('ul span').at(0).simulate('click')

        setTimeout(() => {
            wrapper.update()
            expect(wrapper.find('ul').exists()).toBeFalsy()
            done()
        }, 450)

    });

});
