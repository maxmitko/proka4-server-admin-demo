import styled from 'styled-components';

export const DrawerStyled = styled.div`
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    /* transition: max-width 200ms ease-out;
    max-width: 300px;
    max-width: ${props => !props.open && props.minWidth}; */
    transition: width 200ms ease-out;
    width: 260px;
    width: ${props => !props.open && props.minWidth};
`;
