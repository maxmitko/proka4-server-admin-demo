import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Radio = props =>
    <Wrapper {...props}>
        <Input type="checkbox" {...props} />
        {props.checked && <Dot />}
    </Wrapper>

Radio.defaultProps = {
    checked: false,
    disabled: false,
    color: 'default',
}

Radio.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    color: PropTypes.oneOf(['default', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose']),
}

export default Radio

const Input = styled.input`
    cursor: pointer;
    display: none;
`

const Dot = styled.span`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`
const Wrapper = styled.div`
    border-radius: 50%;
    margin: 0 7px;
    border: 2px solid;
    box-sizing: border-box;
    border-color: ${props => props.disabled ? "#ccc" : props.theme.extra[props.color]};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    min-width: ${props => props.theme.typography.subtitle1.fontSize + 0.2}rem;
    height: ${props => props.theme.typography.subtitle1.fontSize + 0.2}rem;

    & ${Dot} {
        background-color: ${props => props.disabled ? "#ccc" : props.theme.extra[props.color]};
    }
`