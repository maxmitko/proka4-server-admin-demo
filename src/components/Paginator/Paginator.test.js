import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'
import produce from 'immer'
import TestComponent from './index'

const props = {
    totalRecords: 125,
    pageLimit: 10,
    pageNeighbours: 3,
    defaultPage: 0,
    onPageChanged: jest.fn(),
}

const withHOC = ui => (
    <ThemeProvider theme={theme}>
        {ui}
    </ThemeProvider >
)

describe('renderer Paginator', () => {
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


    it('check button count default props', () => {
        wrapper = mount(element);
        expect(wrapper.find('button')).toHaveLength(9);
    });

    it('check button count {totalRecords:55}', () => {
        const newProps = produce(props, draftProps => {
            draftProps.totalRecords = 55
        })

        wrapper = mount(withHOC(<TestComponent {...newProps} />));
        expect(wrapper.find('button')).toHaveLength(6);
    });

    it('check change button className after click', () => {
        wrapper = mount(element);
        const defaultButtonClass = wrapper.find('button').at(0).props().className

        wrapper.find('button').at(1).simulate('click')

        expect(wrapper.find('button').at(0)).not.toEqual(defaultButtonClass);
        expect(wrapper.find('button').at(1).props().className).toEqual(defaultButtonClass);
    });

    it('check &gt; before last button', () => {
        wrapper = mount(element);
        
        const count = wrapper.find('button').length
        const el = wrapper.find('button').at(count - 2).html()

        expect(el).toMatch(/&gt;/)
    });
});
