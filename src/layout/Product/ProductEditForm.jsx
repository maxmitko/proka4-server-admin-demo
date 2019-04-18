import BraftEditor from 'braft-editor'
import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import Editor from 'components/Editor'
import Paper from 'components/Paper'
import Text from 'components/Text'
import TextField from 'components/TextField'
import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import { ButtonsWrapper, FormStyled, SaveButton } from '../Form/index'
import ProductCategoryEditTable from './ProductCategoryEditTable'
import ProductPropsEditTable from './ProductPropsEditTable'

const ShopForm = props => {

    const mapState = useCallback(state => ({ loading: state.product.crud.loading }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);
    const [newImage, setNewImage] = useState();
    const [editorData, setEditorData] = useState(BraftEditor.createEditorState(initialData.description))
    const [tabValue, setTabValue] = useState(0)
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

    const { title, count, image } = state
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const imageSrc = `${process.env.REACT_APP_SERVER_URL}/images/catalog/product/${image}`

    return (
        <Wrapper>
            <HeaderBadge fullWidth>
                <TabsWrapper>
                    <Button
                        active={tabValue === 0}
                        onClick={() => setTabValue(0)}
                        variant="text"
                        color="white" >Описание
                    </Button>
                    {initialData.id && <Button
                        active={tabValue === 1}
                        onClick={() => setTabValue(1)}
                        variant="text"
                        color="white" >Свойства
                    </Button>}
                    {initialData.id && <Button
                        active={tabValue === 2}
                        onClick={() => setTabValue(2)}
                        variant="text"
                        color="white" >Категории
                    </Button>}
                </TabsWrapper>
            </HeaderBadge>

            <TabContentWrapper>

                <Hider isVisible={tabValue === 0}>
                    <FormStyled onSubmit={handleSubmitForm}>
                        <ContentWrapper>
                            <ImageZone>
                                <Dropzone {...getRootProps()} isDragActive={isDragActive} isDragAccept={image}>
                                    <input {...getInputProps()} />
                                    {image
                                        ? <img src={imageSrc} alt="" ref={imgRef} />
                                        : <DropzoneText variant="overline" >Кликните или перетащите файл</DropzoneText>}
                                </Dropzone>
                                <TextFieldStyled
                                    value={title}
                                    onChange={onChangeField('title')}
                                    label="Название"
                                />
                                <TextFieldStyled
                                    value={count}
                                    onChange={onChangeField('count')}
                                    label="Количество"
                                />
                            </ImageZone>
                            <Description>
                                <Editor
                                    value={editorData}
                                    onBlur={setEditorData}
                                />
                            </Description>
                        </ContentWrapper>

                        <ButtonsWrapper>
                            <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                        </ButtonsWrapper>
                    </FormStyled>
                </Hider>

                <Hider isVisible={tabValue === 1}>
                    <ProductPropsEditTable productId={initialData.id} />
                </Hider>

                <Hider isVisible={tabValue === 2}>
                    <ProductCategoryEditTable productId={initialData.id} />
                </Hider>

            </TabContentWrapper>
        </Wrapper>
    )
}

export default ShopForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 930px;
`

const ContentWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
`

const TextFieldStyled = styled(TextField)`
    margin-top: 30px;
`

const ImageZone = styled.div`
    display: flex;
    flex-direction: column;

    img {
        max-height: 300px;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 500px;
`

const DropzoneText = styled(Text)`
    color: #9b9b9b;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 100%;
    text-align: center;
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
    width: 340px;

    &:hover {
        border-color: #ff7c7c;

    }

    &:hover ${DropzoneText} {
        transition: 200ms color;
        color: #ff7c7c;   
    }
`

export const Hider = styled.div`
    display: ${props => props.isVisible ? 'block' : 'none'};
`

export const TabContentWrapper = styled.div`
    margin-top: 20px;
    min-height: 400px;
`

export const TabsWrapper = styled.div`

    display: flex;
    align-items: center;

    > * {
        margin-right: 10px;
    }

    svg {
        margin-right: 8px;
        height: 21px;
    }
`
