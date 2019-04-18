import PropTypes from "prop-types";
import React from 'react'

const TableHead = props => {
    return (
        <thead>
            {props.children}
        </thead>
    )
}

TableHead.propTypes = {
    children: PropTypes.object,
};

TableHead.defaultProps = {
    children: {},
};

export default TableHead