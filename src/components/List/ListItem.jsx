import React from 'react'
import styled, { css } from 'styled-components'

const ListItem = props =>
	<ListItemStyled
		{...props}
		as={props.button ? "div" : "li"}
	>
		<ContentWrapper selected={props.selected}>{props.children}</ContentWrapper>
	</ListItemStyled>

export default ListItem

const button = css`
	cursor: pointer;
`

const ListItemStyled = styled.li`
	${props => props.button && button};
	list-style: none;
	width: 100%;

	${props => props.showOnlyIcon && css`
		& > * {
			display: none;
		}

		& > svg:first-child {
			display: inline-block;
		} grid-auto-columns
	`}
`
const ContentWrapper = styled.div`
	margin: 10px 15px 0 15px;
    padding: 14px;
	border-radius: 3px;
	display: flex;
	align-items: center;
	color: white;
	background-color: ${props => props.selected ? props => props.theme.extra.default : "transparent"};
	transition: background-color 200ms linear;

	&:hover {
		background-color: hsla(0, 0%, 78%, 0.2);
	}
`
