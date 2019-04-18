import React from 'react'
import T from 'prop-types'
import styled, { css } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import produce from "immer"

const Header = props => {

    const { float } = props

    return (
        <ThemeProvider theme={newTheme}>
            <FlexWrap float={float}>
                <Content {...props}>
                    {props.children}
                </Content>
            </FlexWrap>
        </ThemeProvider>
    )
}



Header.defaultProps = {
    color: 'default',
    invisible: false,
    alignSelf: "flex-start",
    fullWidth: false,
    float: null,
}

Header.propTypes = {
    color: T.oneOf(['default', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose']),
    invisible: T.bool,
    badgeContent: T.node,
    alignSelf: T.string,
    fullWidth: T.bool,
    float: T.string,
}

export default Header

const newTheme = prevTheme => (
    produce(prevTheme, draftTheme => {
        draftTheme.typography.body2.fontWeight = 300
    })
)

const float = css`
    float: ${props => props.float};
    margin-right: 14px;
`

const FlexWrap = styled.span`
    display: flex;
    align-items: center;
    ${props => props.float && float};
`

const Content = styled.span`
    display: flex;
    justify-content: flex-start;
    padding: 20px;
    align-self: ${props => props.alignSelf};
    flex-grow: ${props => props.fullWidth && "1"};
    color: ${props => props.theme.extraOn[props.color]};
    background-color: ${props => props.theme.extra[props.color]};
    border-radius: 3px;
    margin-top: -20px;
    box-shadow: 
        0 4px 20px 0px rgba(0, 0, 0, 0.14), 
        0 10px 16px -5px ${props => props.theme.extraShadow[props.color]};
`