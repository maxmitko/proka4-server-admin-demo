import React from 'react'
import styled from 'styled-components'

const ColorBox = props => <Wrapper color={props.color}></Wrapper>

const Wrapper = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background-color: ${props => props.color && props.color};
`

export default ColorBox