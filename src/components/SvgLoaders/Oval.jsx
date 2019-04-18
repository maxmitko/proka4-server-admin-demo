import React from 'react'

const Oval = props => {

    const { width, strokeWidth, stroke } = props

    return (
        <svg
            viewBox={`${-strokeWidth} ${-strokeWidth} ${(width + strokeWidth) * 2} ${(width + strokeWidth) * 2}`}
            width={width}
            stroke={stroke}
        >
            <g fill="none" fillRule="evenodd">
                <g strokeWidth={strokeWidth}>
                    <circle strokeOpacity=".5" cx={width} cy={width} r={width} />
                    <path d={`M${width * 2} 18c0-9.94-8.06-18-18-18`}>
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 ${width} ${width}`}
                            to={`360 ${width} ${width}`}
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </g>
        </svg >
    )

}

Oval.defaultProps = {
    width: 50,
    height: 50,
    strokeWidth: 3,
    stroke: "black",
}

export default Oval