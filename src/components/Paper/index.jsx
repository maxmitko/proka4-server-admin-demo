import styled from 'styled-components';

const PaperStyled = styled.div`
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.24);
    background-color: ${props => props.theme.palette.surface};
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 0 15px;
`;

export default PaperStyled