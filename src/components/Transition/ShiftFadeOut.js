import React from 'react'
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types'

const FadeOut = props => {

  const { duration } = props

  const defaultStyle = {
    width: "100%",
    display: "inherit",
    justifyContent: "inherit",
    alignItems: "inherit",
    transitionProperty: "transform, opacity",
    transition: `${duration}ms ease-in`,
  }

  const transitionStyles = {
    exiting: {
      opacity: 1,
      transform: "translate3d(0px, 0, 0)",
    },
    exited: {
      opacity: 0,
      transform: "translate3d(-25px, 0, 0)",
    },
  };

  return <Transition {...props} timeout={duration}>
    {state =>
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {props.children}
      </div>
    }
  </Transition>
};

FadeOut.defaultProps = {
  in: false,
  duration: 100,
}

FadeOut.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
}

export default FadeOut
