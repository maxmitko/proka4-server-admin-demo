import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const Label = props => <LabelStyled {...props} />

Label.defaultProps = {

}

Label.propTypes = {

}

export default Label

export const LabelStyled = styled.label`
    cursor: pointer;
    font-family: ${props => props.theme.typography.subtitle2.fontFamily};
    font-size: ${props => props.theme.typography.subtitle2.fontSize}rem;
    color: ${props => props.theme.paletteOn.surface};
    display: flex;
    justify-content: flex-start;
    align-items: center;
`