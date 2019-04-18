import BraftEditor from 'braft-editor'
import Editor from 'components/Editor'
import Paper from 'components/Paper'
import Text from 'components/Text'
import TextField from 'components/TextField'
import Label from 'components/TextField/Label'
import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const ServiceForm = props => {

    const mapState = useCallback(state => ({ loading: state.service.crud.loading }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const [newImage, setNewImage] = useState();
    const [editorData, setEditorData] = useState(BraftEditor.createEditorState(initialData.description))
    const imgRef = useRef(null)

    const onDrop = useCallback(acceptedFiles => {
        var reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);

        reader.onload = e => {
            setNewImage(e.target.result)
            setState(state => ({ ...state, image: true }))
            imgRef.current.src = e.target.result;
        };
    }, [])

    const onChangeField = name => e => {
        e.preventDefault()
        e.persist()

        setState(state => ({
            ...state,
            [name]: e.target.value,
        }))
    };

    const handleSubmitForm = e => {
        e.preventDefault()

        const result = {
            ...state,
            myOrder: Number(state.myOrder),
            description: editorData.toHTML(),
            image: newImage
        }

        formState.submitForm(result)
    }

    const { title, myOrder, image } = state
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const imageSrc = `${process.env.REACT_APP_SERVER_URL}/images/service/410x240/${image}`

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
                        value={myOrder}
                        onChange={onChangeField('myOrder')}
                        label="Порядок"
                        labelPosition="left"
                    />
                    <ContentWrapper >
                        <Label labelPosition="left">Картинка</Label>
                        <Dropzone {...getRootProps()} isDragActive={isDragActive} isDragAccept={image}>
                            <input {...getInputProps()} />
                            {image
                                ? <img src={imageSrc} alt="" height="100px" ref={imgRef} />
                                : <DropzoneText variant="overline" >Кликните или перетащите файл</DropzoneText>}
                        </Dropzone>
                    </ContentWrapper>
                    <ContentWrapper >
                        <Label labelPosition="left">Описание</Label>
                        <Editor
                            value={editorData}
                            onBlur={setEditorData}
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

export default ServiceForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 930px;
`

const ContentWrapper = styled.div`
    display: flex;
    margin-top: 40px;

    label {
        min-width: 140px;
        margin-right: 30px;
        align-self: flex-start;
        justify-content: flex-end;
    }
`

const DropzoneText = styled(Text)`
    color: #9b9b9b;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
`

const Dropzone = styled.div`
    position: relative;
    min-height: 50px;
    width: ${props => props.isDragAccept ? "auto" : "100%"};
    border: 2px solid;
    border-color: ${props => props.isDragActive ? "#9b9b9b" : "#ccc"};
    border-style: dashed;
    padding: 5px;
    cursor: pointer;
    display: flex;
    vertical-align: center;
    justify-content: center;
    outline: none;
    transition: 200ms border-color;

    &:hover {
        border-color: #ff7c7c;

    }

    &:hover ${DropzoneText} {
        transition: 200ms color;
        color: #ff7c7c;   
    }
`


