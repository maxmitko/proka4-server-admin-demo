import Paper from 'components/Paper'
import Select from 'components/Select';
import Text from 'components/Text'
import TextField from 'components/TextField'
import Label from 'components/TextField/Label'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator as serviceActions } from 'store/reducers/service'
import styled from 'styled-components';

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const TicketForm = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.ticket.crud, serviceList: state.service.selectFormat }), [])
    const fetchServiceList = useCallback(() => dispatch(serviceActions.fetchList()), []);

    const { loading, serviceList } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const [service, setService] = useState();

    useEffect(() => {
        if (!serviceList.length) fetchServiceList()
    }, [initialData])

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const handleSubmitForm = e => {
        e.preventDefault()

        const result = { ...state, service }
        formState.submitForm(result)
    }

    const { title, count, price } = state

    return (
        <Wrapper>
            <HeaderBadgeStyled><Text variant="h6" color="primary" >{formState.header}</Text></HeaderBadgeStyled>
            <FormStyled onSubmit={handleSubmitForm}>
                <FieldsWrapper>
                    <TextField
                        value={title}
                        onChange={onChangeField('title')}
                        label="Название"
                        labelPosition="left"
                    />

                    <ContentWrapper >
                        <Label labelPosition="left">Услуга</Label>
                        <Select
                            data={serviceList || []}
                            value={service || (initialData.service && initialData.service.id)}
                            placeholder="Выбирите услугу"
                            onChange={e => setService(e.target.dataset.value)}
                            variant="outlined"
                        />
                    </ContentWrapper>
                    <TextField
                        value={count}
                        onChange={onChangeField('count')}
                        label="Количество"
                        labelPosition="left"
                    />
                    <TextField
                        value={price}
                        onChange={onChangeField('price')}
                        label="Стоимость"
                        labelPosition="left"
                    />
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