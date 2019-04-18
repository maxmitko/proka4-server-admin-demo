import styled from 'styled-components';

export const ListStyled = styled.ul`
    margin: 0;
    padding: 5px;
    list-style: none;
    border-radius: 0.2rem;
    cursor: pointer;
    min-width: 160px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
    background-color: white;
    min-width: ${props => props.width}px;
    box-sizing: border-box;
`

export const MenuItem = styled.span`
    font-size: ${props => props.theme.typography.subtitle1.fontSize - 0.1}rem;
    font-family: ${props => props.theme.typography.subtitle1.fontFamily}rem;
    font-weight: ${props => props.theme.typography.subtitle1.fontWeight};
    line-height: ${props => props.theme.typography.subtitle1.lineHeight};
    color: ${props => props.selected && props.theme.extraOn[props.color]};
    background-color: ${props => props.selected && props.theme.extra[props.color]};    
    clear: both;
    height: 100%;
    padding: 10px 20px;
    display: block;
    position: relative;
    transition: all 120ms linear;
    white-space: nowrap;
    border-radius: 3px;
    margin: 3px 0;
    
    &:hover {
        color: ${props => props.theme.palette.surface};
        background-color: ${props => props.theme.extra[props.color]};
        box-shadow:  
            0 3px 4px 0px ${props => props.theme.extraShadow[props.color]},
            2px 0px 4px 0px ${props => props.theme.extraShadow[props.color]},
            -2px 0px 4px 0px ${props => props.theme.extraShadow[props.color]};
    }
`