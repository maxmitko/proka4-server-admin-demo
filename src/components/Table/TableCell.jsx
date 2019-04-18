import PropTypes from "prop-types";
import React from 'react'

const TableCell = props => {
    return (
        <td {...props} />
    )
}

TableCell.propTypes = {
    children: PropTypes.any,
};

TableCell.defaultProps = {
    children: "",
};

export default TableCell
