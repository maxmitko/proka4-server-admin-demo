import React, { useEffect } from 'react'
import T from 'prop-types'
import styled from 'styled-components'
import Text from 'components/Text'
import Button from 'components/Button'
import Close from '@material-ui/icons/Close'
import Modal from 'components/Modal'
import theme from 'theme/theme'

const Notification = props => {

    const { open, text, type, onClose, autoClose, hiddenButton, modal } = props
    
    useEffect(() => {
        if (autoClose) {
            const close = setTimeout(onClose, autoClose)
            return () => clearTimeout(close)
        }
    })

    const modalProps = {
        isOpen: open,
        zIndex: 1500,
        top: "20px",
        overlay: false,
        disableEvents: !!hiddenButton || !!autoClose
    }
    
    const Message =
        <MessageStyled color={type} data-test-id="MessageStyled">
            <Text variant="body2" color="inherit">
                {text}
            </Text>
            {!hiddenButton && <CloseButton variant="text" onClick={onClose} color="white" round><Close /></CloseButton>}
        </MessageStyled>

    return modal
        ? <Modal {...modalProps}>{Message}</Modal>
        : Message
}


Notification.defaultProps  = {
    text: '',
    type: 'default',
    open: false,
    onClose: () => { },
    autoClose: 0,
    hiddenButton: false,
    modal: true,
}

Notification.propTypes = {
    text: T.string,
    type: T.oneOf(Object.keys(theme.extra)),
    open: T.bool,
    onClose: T.func,
    autoClose: T.number,
    hiddenButton: T.bool,
    modal: T.bool,
}

export default Notification

const MessageStyled = styled.div`
    padding: 0 15px;
    position: absolute;
    display: flex;
    border-radius: 0.2rem;
    justify-content: space-between;
    align-items: center;
    transform: translateX(-50%);
    min-width: 560px;
    min-height: 70px;
    background-color: ${props => props.theme.extra[props.color]};
    color: ${props => props.theme.extraOn[props.color]};
    box-shadow: 
        0 4px 20px 0px rgba(0, 0, 0, 0.14), 
        0 10px 16px -5px ${props => props.theme.extraShadow[props.color]};
`

const CloseButton = styled(Button)`
    padding: 4px;

    svg {
        font-size: 18px;
    }
`