import Paper from 'components/Paper'
import Select from 'components/Select'
import Text from 'components/Text'
import TextField from 'components/TextField'
import Label from 'components/TextField/Label'
import React, { useCallback, useState } from 'react'
import { CirclePicker } from 'react-color';
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import DayPickerRange from '../DayPickerRange'
import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const ScheduleForm = props => {

    const mapState = useCallback(state => ({ ...state.scheduleList.crud, scheduleTypeList: state.scheduleType.data }), [])

    const { loading, scheduleTypeList } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const onChangeTypeSelect = e => {
        setState({
            ...state,
            scheduleType: {
                ...state.scheduleType,
                id: e.target.dataset.value || null
            },
        })
    };

    const onChangeDateField = name => value => {
        setState({
            ...state,
            [name]: value,
        });
    };

    const onChangeColorField = name => value => {
        setState({
            ...state,
            [name]: value.hex,
        });
    };

    const handleSubmitForm = e => {
        e.preventDefault()

        const result = { ...state }
        formState.submitForm(result)
    }

    const { title, color, startDate, endDate, scheduleType } = state

    let typeList = scheduleTypeList
        .map(item => ({ value: item.id, label: item.title }))

    typeList.unshift({ value: null, label: "Без группы" })

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
                        <Label labelPosition="left">Группа</Label>
                        <Select
                            value={scheduleType && scheduleType.id}
                            data={typeList}
                            variant="outlined"
                            onChange={onChangeTypeSelect}
                        />
                    </ContentWrapper>
                    <ContentWrapper>
                        <Label labelPosition="left">Дата</Label>
                        <DayPickerRange
                            from={startDate && new Date(startDate || "")}
                            to={endDate && new Date(endDate || "")}
                            setFromDate={onChangeDateField('startDate')}
                            setToDate={onChangeDateField('endDate')}
                        />
                    </ContentWrapper>
                    <ContentWrapper>
                        <Label labelPosition="left">Цвет</Label>
                        <CirclePicker
                            color={color}
                            width="auto"
                            colors={["#f44336", "#e91e63", "#9c27b0", "#009688", "#4caf50", "#8bc34a", "#ffc107", "#ff9800", "#ff5722", "#795548"]}
                            onChange={onChangeColorField('color')}
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

export default ScheduleForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 530px;
`
export const ContentWrapper = styled.div`
    display: flex;
    margin-top: 40px;

    > div {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
    }

    label {
        min-width: 140px;
        margin-right: 30px;
        align-self: center;
        justify-content: flex-end;
    }
`