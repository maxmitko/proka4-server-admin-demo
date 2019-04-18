import PropTypes from "prop-types";
import React from 'react'
import styled, { css } from 'styled-components'

const Collapse = props =>
    <CollapseStyled
        {...props}
        as={props.component}
        in={+props.in}
    >
        {props.children}
    </CollapseStyled>

Collapse.defaultProps = {
    in: false,
}

Collapse.propTypes = {
    in: PropTypes.bool,
}

export default Collapse

const baseCollapse = css`
	max-height: 0px;
	position: relative;
	transition: max-height 0.35s ease-out;
`
const hideCollapsePanel = css`
	max-height: 1000px;
	transition: max-height 0.7s ease-in;
`
const CollapseStyled = styled.div`
	${baseCollapse}
	${props => !!props.in && hideCollapsePanel}
`