import TextField from 'components/TextField'
import Label from 'components/TextField/Label'
import React, { useCallback, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';
import Text from 'components/Text'
import Paper from 'components/Paper'

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const ClientCardForm = props => {

    const mapState = useCallback(state => ({ ...state.clientCard.crud }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const defaultFormat = "DD-MM-YYYY"

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const handleDayChange = name => selectedDay => {
        setState({
            ...state,
            [name]: selectedDay,
        })
    }


    const handleSubmitForm = e => {
        e.preventDefault()

        const result = { ...state }
        formState.submitForm(result)
    }

    const { count, price, debt, purchaseTime } = state

    return (
        <Wrapper>
            <HeaderBadgeStyled><Text variant="h6" color="primary" >{formState.header}</Text></HeaderBadgeStyled>
            <FormStyled onSubmit={handleSubmitForm}>
                <FieldsWrapper>
                    <TextField
                        value={price}
                        onChange={onChangeField('price')}
                        label="Стоимость"
                        labelPosition="left"
                    />
                    <TextField
                        value={count}
                        onChange={onChangeField('count')}
                        label="Квота"
                        labelPosition="left"
                    />
                    <TextField
                        value={debt}
                        onChange={onChangeField('debt')}
                        label="Долг"
                        labelPosition="left"
                    />
                    <DayPickerWrapper>
                        <Label labelPosition="left">Дата покупки</Label>
                        <div className="InputFromTo">
                            <DayPickerInput
                                format={defaultFormat}
                                formatDate={formatDate}
                                placeholder={formatDate(purchaseTime, defaultFormat)}
                                parseDate={parseDate}
                                onDayChange={handleDayChange}
                                dayPickerProps={{
                                    selectedDays: new Date(purchaseTime),
                                    numberOfMonths: 2,
                                }}
                            />
                        </div>
                    </DayPickerWrapper>
                </FieldsWrapper>
                <ButtonsWrapper>
                    <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                </ButtonsWrapper>
            </FormStyled>
        </Wrapper>
    )
}

export default ClientCardForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 550px;
`


const DayPickerWrapper = styled.div`
    display: flex;
    margin-top: 40px;
        
    label {
        min-width: 140px;
        margin-right: 30px;
        align-self: center;
    }
`