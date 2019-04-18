import PropTypes from "prop-types";
import React from 'react'

const TableRow = React.forwardRef((props, ref) => {
    return (
        <tr ref={ref}>
            {props.children}
        </tr>
    )
})

TableRow.propTypes = {
    children: PropTypes.array,
};

TableRow.defaultProps = {
    children: [],
};

export default TableRow
