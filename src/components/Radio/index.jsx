import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'
import theme from 'theme/theme'

const Radio = props => {

    const { disabled, checked, color } = props

    return (
        <Wrapper {...props}>
            <Input type="checkbox" disabled={disabled} />
            {checked && <Dot disabled={disabled} color={color}/>}
        </Wrapper>
    )
}


Radio.defaultProps = {
    checked: false,
    disabled: false,
    color: 'default',
}

Radio.propTypes = {
    checked: T.bool,
    disabled: T.bool,
    color: T.oneOf(Object.keys(theme.extra)),
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
    background-color: ${props => props.disabled ? "#ccc" : props.theme.extra[props.color]};
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
`