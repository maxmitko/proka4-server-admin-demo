import Paper from 'components/Paper'
import Select from 'components/Select';
import Text from 'components/Text'
import TextField from 'components/TextField'
import Label from 'components/TextField/Label'
import React, { useCallback, useState } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const TicketForm = props => {

    const mapState = useCallback(state => ({ ...state.appointment.crud }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData, statusList } = props;

    const [state, setState] = useState(initialData);
    const [newStatus, setNewStatus] = useState();

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const handleSubmitForm = e => {
        e.preventDefault()

        const result = { ...state, status: newStatus }
        formState.submitForm(result)
    }

    const { customer, phone, comment, status } = state


    return (
        <Wrapper>
            <HeaderBadgeStyled><Text variant="h6" color="primary" >{formState.header}</Text></HeaderBadgeStyled>
            <FormStyled onSubmit={handleSubmitForm}>
                <FieldsWrapper>
                    <TextField
                        value={customer}
                        onChange={onChangeField('customer')}
                        label="Имя"
                        labelPosition="left"
                    />
                    <TextField
                        value={phone}
                        onChange={onChangeField('phone')}
                        label="Телефон"
                        labelPosition="left"
                    />
                    <Comment >
                        <Label labelPosition="left">Комментарий</Label>
                        <textarea
                            value={comment}
                            onChange={onChangeField('comment')}
                        />
                    </Comment>
                    <ContentWrapper >
                        <Label labelPosition="left">Статус</Label>
                        <Select
                            data={statusList}
                            value={newStatus || status}
                            placeholder="Выбирите cтатус"
                            onChange={e => setNewStatus(e.target.dataset.value)}
                            variant="outlined"
                        />
                    </ContentWrapper>
                </FieldsWrapper>

                <ButtonsWrapper>
                    <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                </ButtonsWrapper>
            </FormStyled>
        </Wrapper>
    )
}

export default TicketForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 550px;
`
const ContentWrapper = styled.div`
    display: flex;
    margin-top: 40px;

    > div {
        flex-grow: 1;
    }

    label {
        min-width: 140px;
        margin-right: 30px;
        align-self: center;
        justify-content: flex-end;
    }
`

const Comment = styled(ContentWrapper)`
    label {
        align-self: flex-start;
    }
    textarea {
        width: 100%;
        min-height: 100px;
        border-radius: 0.2rem;
        padding-left: 6px;
    }
`