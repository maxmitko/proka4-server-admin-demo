import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Badge = props =>
    <Content {...props}>
        {props.badgeContent}
    </Content>

Badge.defaultProps = {
    color: 'default',
    invisible: false,
}

Badge.propTypes = {
    color: PropTypes.oneOf(['default', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose']),
    invisible: PropTypes.bool,
    badgeContent: PropTypes.node,
}

export default Badge

export const Content = styled.span`
    position: absolute;
    vertical-align: middle;
    top: -8px;
    right: -8px;
    width: 22px;
    height: 22px;
    display: flex;
    position: absolute;
    flex-wrap: wrap;
    color: ${props => props.theme.extraOn[props.color]};
    background-color: ${props => props.theme.extra[props.color]};
    font-size: ${props => props.theme.typography.caption.fontSize}rem;
    font-family: ${props => props.theme.typography.caption.fontFamily};
    transform: scale(1);
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    align-content: center;
    border-radius: 50%;
    flex-direction: row;
    justify-content: center;
`