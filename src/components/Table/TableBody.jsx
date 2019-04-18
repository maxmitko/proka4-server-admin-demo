import T from "prop-types";
import React from 'react'

const TableBody = props => {

    return (
        <tbody>
            {props.children}
        </tbody>
    )
}

TableBody.propTypes = {
    children: T.array,
    pageLimit: T.number,
};

TableBody.defaultProps = {
    children: [],
    pageLimit: 0,
};

export default TableBody