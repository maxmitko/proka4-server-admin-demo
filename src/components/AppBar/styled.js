import styled from 'styled-components';

export const AppBarStyled = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    flex-shrink: 0;
    flex-direction: column;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 
                0px 4px 5px 0px rgba(0, 0, 0, 0.14), 
                0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    position: ${props => props.position ? props.position : "static"}
`