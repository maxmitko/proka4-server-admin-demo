import styled from 'styled-components'

export const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: ${props => props.invisible && "none"};
    z-index: -1;
`

export const CarpetStyled = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    transition: all 300ms linear;
    background-size: cover;
    background-position: center center;
    background-image: ${props => props.url && 'url(' + props.url + ')'};
`

export const FilterStyled = styled.div`
    top: 0;
    width: 100%;
    height: 100%;
    content: "";
    display: block;
    position: absolute;
    opacity: ${props => props.opacity ? props.opacity : 0.8};
    background-color: ${props => props.color ? props.color : "#000"};
`