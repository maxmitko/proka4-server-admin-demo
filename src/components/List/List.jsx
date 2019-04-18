import React from 'react'
import styled from 'styled-components'

const List = props => <ListStyled {...props} as={props.component} />

export default List

export const ListStyled = styled.ul`
	overflow: hidden;
	position: relative;
`
