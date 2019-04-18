import React from 'react'
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'
import './blur.scss'

const Fade = props => {

  const classNames = {
    enterDone: 'blur-enter-done',
  }

  return (
    <CSSTransition
      in={props.in}
      timeout={props.duration}
      className="blur"
      classNames={classNames}
      style={{ transitionDuration: `${props.duration}ms` }}
      mountOnEnter
    >
      <div>
        {props.children}
      </div>
    </CSSTransition>
  )

};

Fade.defaultProps = {
  in: undefined,
  duration: 250,
}

Fade.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
}

export default React.memo(Fade)