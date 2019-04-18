import React from 'react'
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'
import './fade.scss'

const Fade = props => {

  const classNames = {
    enterDone: 'fade-enter-done',
  }

  return (
    <CSSTransition
      in={props.in}
      timeout={props.duration}
      className="fade"
      classNames={classNames}
      style={{ transitionDuration: `${props.duration}ms` }}
      unmountOnExit
    >
      <div>
        {props.children}
      </div>
    </CSSTransition>
  )

};

Fade.defaultProps = {
  in: undefined,
  duration: 150,
}

Fade.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
}

export default React.memo(Fade)