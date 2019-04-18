import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components';
import Fade from 'components/Transition/Fade'

const modalElement = document.createElement('div');
const modalRoot = document.getElementById('modal-root');

function Modal(props) {
    
    const { isOpen, overlayColor, overlay, disableEvents } = props
    const contentRef = useRef(null)
    const overlayRef = useRef(null)
    
    useEffect(() => {
        modalRoot.appendChild(modalElement);
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside); // Clean up the subscription
    }, [])

    const handleClickOutside = event => {
        const modalNode = ReactDOM.findDOMNode(contentRef && contentRef.current)
        const overlayNode = ReactDOM.findDOMNode(overlayRef && overlayRef.current)

        if (modalNode && event.target === overlayNode) props.onClose();
    }

    const Modal =
        <Fade in={isOpen}>
            <Overlay color={overlayColor} overlay={overlay} ref={overlayRef} disableEvents={disableEvents}>
                <Content {...props} ref={contentRef}>
                    {props.children}
                </Content>
            </Overlay>
        </Fade>

    return ReactDOM.createPortal(Modal, modalElement)
};

Modal.defaultProps = {
    top: null,
    left: null,
    isOpen: false,
    onClose: () => { },
    overlayColor: "",
    overlay: false,
    disableEvents: false,
}

Modal.propTypes = {
    top: PropTypes.string,
    left: PropTypes.string,
    overlay: PropTypes.bool,
    onClose: PropTypes.func,
    zIndex: PropTypes.number,
    overlayColor: PropTypes.string,
    disableEvents: PropTypes.bool,
}

export default Modal

const Content = styled.div`
    position: absolute;
    z-index: ${props => props.zIndex || props.theme.zIndex.modal};
    left: ${props => props.left ? props.left : "50%"};
    top: ${props => props.top ? props.top : "50%"};
    transform: translate(${props => props.left ? "0%" : "-50%"}, ${props => props.top ? "0%" : "-50%"});
`

const disableEvents = css`
    pointer-events: none;
`

const Overlay = styled.div`
    ${props => props.disableEvents && disableEvents};
    background-color: ${props => props.color && props.color};
    background-color: ${props => props.overlay && "rgba(0, 0, 0, 0.4)"};
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`