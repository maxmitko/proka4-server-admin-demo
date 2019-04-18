import styled, { css } from 'styled-components';
import React from 'react'


const Label = props => {

    const { fixedOnTop, labelPosition } = props

    return (
        <Wrapper fixedOnTop={fixedOnTop} labelPosition={labelPosition}>
            {props.children}
        </Wrapper>
    )
}


Label.defaultProps = {
    labelPosition: 'top',
};

export default Label

const base = css`
    font-weight: 300;
    color: hsl(0, 0%, 67%);
`

const top = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: ${props => props.children ? "flex" : "none"};
    align-items: center;
`

const left = css`
    position: relative;
`

const movedTop = css`
    margin-right: 30px;
    top: calc(100% / 4);
    transform-origin: top left;
    transform: ${props => props.fixedOnTop && "translateY(-120%) scale(0.8)"};
    transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    color: hsl(0, 0%, 67%);
    pointer-events: none;
`

const Wrapper = styled.label`
    ${base}
    ${props => props.labelPosition === 'top' && top}
    ${props => props.fixedOnTop && props.labelPosition === 'top' && movedTop}
    ${props => props.labelPosition === 'left' && left}
`