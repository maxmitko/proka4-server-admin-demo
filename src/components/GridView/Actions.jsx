import Button from 'components/Button'
import React from 'react'
import styled from 'styled-components';

import Clear from '@material-ui/icons/Clear'
import Info from '@material-ui/icons/InfoOutlined'
import Create from '@material-ui/icons/Create'

const Actions = props => {
    const { handleEditClick, handleDeleteClick, handleInfoClick } = props

    return <Wrapper>
        {handleInfoClick &&
            <Button
                variant="text"
                color="info"
                onClick={handleInfoClick}
                icon
                round
            >
                <Info />
            </Button>}
        {handleEditClick &&
            <Button
                variant="text"
                color="success"
                onClick={handleEditClick}
                icon
                round
            >
                <Create />
            </Button>}
        {handleDeleteClick &&
            <Button
                variant="text"
                color="danger"
                onClick={handleDeleteClick}
                icon
                round
            >
                <Clear />
            </Button>}

    </Wrapper>
}

export default Actions

export const Wrapper = styled.div`
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0;
    svg {
        font-size: 20px;
    }
`