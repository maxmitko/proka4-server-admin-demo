import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ListItemText = props =>
    <TextStyled {...props} as={props.component}>
        {props.primary}
    </TextStyled>

ListItemText.defaultProps = {
    title: '',
}

ListItemText.propTypes = {
    title: PropTypes.string,
}

export default ListItemText

const TextStyled = styled.span`
	font-family: ${props => props.theme.typography.subtitle2.fontFamily};
	font-size: ${props => props.theme.typography.subtitle2.fontSize}rem;
	margin-left: 15px;
    white-space: nowrap;
`