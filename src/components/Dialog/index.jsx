import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'components/Paper'
import Modal from 'components/Modal'
import Button from 'components/Button'
import styled from 'styled-components';

function Dialog({ open, onClose, onConfirm, children }) {

    return (
            <Modal isOpen={open} onClose={onClose} overlay top="250px">
                <Wrapper>
                    <MsgWrapper>
                        <Message>{children}</Message>
                    </MsgWrapper>
                    <Buttons>
                        <Button color="danger" onClick={onClose}>Отменить</Button>
                        <ConfirmBtn color="success" onClick={onConfirm}>Выполнить</ConfirmBtn>
                    </Buttons>
                </Wrapper>
            </Modal>
    )
}

Dialog.defaultProps = {
    variant: 'alert',
}

Dialog.propTypes = {
    variant: PropTypes.oneOf(['alert', 'prompt', 'confirm']),
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
}

export default Dialog

const Wrapper = styled(Paper)`
    width: 470px;
    min-height: 310px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const MsgWrapper = styled.div`
    min-height: 175px;
    max-width: calc(100% - 40px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

`
const ConfirmBtn = styled(Button)`
    min-width: 80px;
    margin-left: 18px;
`

const Message = styled.span`
    text-align: center;
`

