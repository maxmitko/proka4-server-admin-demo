import React from 'react'
import Svg from '@material-ui/icons/Done'
import styled from 'styled-components'

const Checkbox = props => {

    return (
        <Wrapper {...props} >
            <Input type="checkbox" />
            <Svg />
        </Wrapper>
    )
}



export default React.memo(Checkbox)

export const Input = styled.input`
    cursor: pointer;
    display: none;
`

export const Wrapper = styled.div`
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin: 0 7px;
    justify-content: center;
    background-color:  ${props => props.disabled ? "#ccc" : props.theme.extra[props.color]};
    font-size: ${props => props.theme.typography.subtitle1.fontSize + 0.2}rem;
    
    svg {
        visibility: ${props => !props.checked && 'hidden'};
        color: ${props => props.theme.extraOn[props.color]};
        font-size: inherit;
    }
`