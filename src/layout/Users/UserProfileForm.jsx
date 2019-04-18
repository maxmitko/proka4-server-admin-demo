import Button from 'components/Button'
import TextField from 'components/TextField'
import { LocalesContext } from 'LocalesProvider'
import React, { useContext, useState } from 'react'
import styled from 'styled-components';

const UserProfileForm = props => {

    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const locales = useContext(LocalesContext)

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const handleSubmitForm = e => {
        e.preventDefault()

        const result = { ...state }
        formState.submitForm(result)
    }

    const { username, fullname, email, money, phone, password, repassword } = state

    return (
        <FormStyled onSubmit={handleSubmitForm}>
            <FieldsWrapper>
                <TextField
                    value={username}
                    onChange={onChangeField('username')}
                    label="Логин"
                    labelPosition="left"
                />
                <TextField
                    value={fullname}
                    onChange={onChangeField('fullname')}
                    label="ФИО"
                    labelPosition="left"
                />
                <TextField
                    value={email}
                    onChange={onChangeField('email')}
                    label="Почта"
                    labelPosition="left"
                />
                <TextField
                    value={money}
                    onChange={onChangeField('money')}
                    label="Кошелек (руб)"
                    labelPosition="left"
                />
                <TextField
                    value={phone}
                    onChange={onChangeField('phone')}
                    label="Телефон"
                    labelPosition="left"
                />
                <TextField
                    type="password"
                    value={password}
                    onChange={onChangeField('password')}
                    label="Пароль"
                    labelPosition="left"
                />
                <TextField
                    type="password"
                    value={repassword}
                    onChange={onChangeField('repassword')}
                    label="Повторите пароль"
                    labelPosition="left"
                />
            </FieldsWrapper>
            <ButtonsWrapper>
                <SaveButton type="submit" color="success">{formState.saveButton === locales.create ? locales.create : locales.save}</SaveButton>
            </ButtonsWrapper>
        </FormStyled>
    )
}

export default UserProfileForm

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const FieldsWrapper = styled.div`
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

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    > * {
        margin-left: 20px;
    }
`

const SaveButton = styled(Button)`
    svg {
        fill: white;
    }
`