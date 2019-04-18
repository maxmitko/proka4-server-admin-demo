import BraftEditor from 'braft-editor'
import Editor from 'components/Editor'
import Paper from 'components/Paper'
import Text from 'components/Text'
import TextField from 'components/TextField'
import Label from 'components/TextField/Label'
import React, { useCallback, useState } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';
import DayPickerRange from '../DayPickerRange'
import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const NewsForm = props => {

    const mapState = useCallback(state => ({ loading: state.news.crud.loading }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const [editorData, setEditorData] = useState(BraftEditor.createEditorState(initialData.content))

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const onChangeDateField = name => value => {
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmitForm = e => {
        e.preventDefault()
        const result = { ...state, content: editorData.toHTML() }
        formState.submitForm(result)
    }

    const { title, topic, startDate, endDate } = state

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
                    <TextField
                        value={topic}
                        onChange={onChangeField('topic')}
                        label="Топик"
                        labelPosition="left"
                    />
                    <DayPickerWrapper>
                        <Label labelPosition="left">Дата</Label>
                        <DayPickerRange
                            from={startDate && new Date(startDate)}
                            to={endDate && new Date(endDate)}
                            setFromDate={onChangeDateField('startDate')}
                            setToDate={onChangeDateField('endDate')}
                        />
                    </DayPickerWrapper>
                    <EditorWrapper >
                        <Label labelPosition="left">Описание</Label>
                        <Editor
                            value={editorData}
                            onBlur={setEditorData}
                        />
                    </EditorWrapper>
                </FieldsWrapper>
                <ButtonsWrapper>
                    <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                </ButtonsWrapper>
            </FormStyled>
        </Wrapper>
    )
}

export default NewsForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 930px;
`

const EditorWrapper = styled.div`
    display: flex;
    margin-top: 40px;

    label {
        min-width: 140px;
        margin-right: 30px;
        align-self: flex-start;
    }
`

const DayPickerWrapper = styled(EditorWrapper)`
    label {
        align-self: center;
    }
`

