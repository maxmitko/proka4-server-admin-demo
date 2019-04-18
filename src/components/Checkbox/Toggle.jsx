import React from 'react'
import styled from 'styled-components'
// import { useLogger } from 'react-use'

const Toggle = props => {
    // useLogger('Toggle', props)
    return (
        <Wrapper {...props}>
            <Input type="checkbox" />
            <Knob {...props}/>
        </Wrapper>
    )
}


export default React.memo(Toggle)

export const Input = styled.input`
    cursor: pointer;
    display: none;
`

export const Wrapper = styled.div`
    position: relative;
    width: 38px;
    height: 16px;
    border-radius: 10px;
    display: flex;
    margin: 0 7px;
    align-items: inherit;
    justify-content: inherit;
    background-color:  ${props => !props.checked ? "#ccc" : props.theme.extra[props.color]};
    transition-duration: 200ms;
    transition-property: background-color;
    cursor: pointer;
    
`

export const Knob = styled.span`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid;
    border-color: ${props => !props.checked ? "#ccc" : props.theme.extra[props.color]};
    transform: ${props => props.checked ? "translate(16px, -50%)" : null};
    transition-duration: 200ms;
    transition-property: background-color transform;
    box-shadow: 0px 1px 3px 0px 
    rgba(0, 0, 0, 0.2), 0px 1px 1px 0px 
    rgba(0, 0, 0, 0.14), 0px 2px 1px -1px 
    rgba(0, 0, 0, 0.12);
`