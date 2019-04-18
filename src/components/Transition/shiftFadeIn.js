import React from 'react'
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'
import './shiftFadeIn.scss'

const shiftFadeInIn = props => {

  const classNames = {
    // appear: 'fade-appear',
    // appearActive: 'fade-active-appear',
    enter: 'shift-fade-enter',
    // enterActive: 'fade-active-enter',
    // enterDone: 'fade-done-enter',
    // exit: 'fade-exit',
    // exitActive: 'fade-active-exit',
    // exitDone: 'fade-done-exit',
  }
  
  return (
    <CSSTransition
      in={props.in}
      timeout={props.duration}
      className="shift-fade"
      classNames={classNames}
      mountOnEnter
    >
      <div>
        {props.children}
      </div>
    </CSSTransition>
  )

};

shiftFadeInIn.defaultProps = {
  in: false,
  duration: 150,
}

shiftFadeInIn.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
}

export default shiftFadeInIn