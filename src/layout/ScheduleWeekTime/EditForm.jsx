import Paper from 'components/Paper'
import Text from 'components/Text'
import TextField from 'components/TextField'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const WeekTimeForm = props => {

    const mapState = useCallback(state => ({ ...state.scheduleWeekTime.crud }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const timeRef = useRef(null)

    useEffect(() => {
        if (timeRef.current) timeRef.current.click()
    })

    const onChangeField = name => e => {

        let time = e.target.value
        if (time.length === 2) time = time + ':'

        setState({
            ...state,
            [name]: time,
        })
    };

    const handleSubmitForm = e => {
        e.preventDefault()

        const result = { ...state }
        formState.submitForm(result)
    }

    const { title } = state

    return (
        <Wrapper>
            <HeaderBadgeStyled><Text variant="h6" color="primary" >{formState.header}</Text></HeaderBadgeStyled>
            <FormStyled onSubmit={handleSubmitForm}>
                <FieldsWrapper>
                    <TextField
                        value={title}
                        onChange={onChangeField('title')}
                        label="Время"
                        labelPosition="left"
                        ref={timeRef}
                    />
                </FieldsWrapper>

                <ButtonsWrapper>
                    <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                </ButtonsWrapper>
            </FormStyled>
        </Wrapper>
    )
}

export default WeekTimeForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 550px;
`