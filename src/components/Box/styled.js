import styled, { css } from 'styled-components';


export const BoxStyled = styled.div`
	display: ${props => props.container ? 'flex' : props.display}
	
`;