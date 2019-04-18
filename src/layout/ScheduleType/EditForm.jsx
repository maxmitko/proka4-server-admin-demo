import Paper from 'components/Paper'
import Text from 'components/Text'
import TextField from 'components/TextField'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const ScheduleTypeForm = props => {
    const mapState = useCallback(state => ({ ...state.scheduleType.crud }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const titleRef = useRef(null)

    useEffect(() => {
        if (titleRef.current) titleRef.current.click()
    })

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

    const { title } = state

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
                        ref={titleRef}
                    />
                </FieldsWrapper>

                <ButtonsWrapper>
                    <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                </ButtonsWrapper>
            </FormStyled>
        </Wrapper>
    )
}

export default ScheduleTypeForm

const Wrapper = styled(Paper)`
    padding: 20px;
    padding-top: 0px;
    height: 100%;
    min-width: 550px;
`