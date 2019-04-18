import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import styled from 'styled-components';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const FieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px 0;
    
    label {
        min-width: 140px;
        align-self: flex-end;
        justify-content: flex-end;
        margin-right: 30px;
        text-align: right;
    }

    > div {
        margin: 15px 0;
    }
`;

export const HeaderBadgeStyled = styled(HeaderBadge)`
    padding-top: 25px;
    padding-bottom: 25px;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`

export const SaveButton = styled(Button)`
    svg {
        fill: white;
    }
    margin-left: 18px;
`