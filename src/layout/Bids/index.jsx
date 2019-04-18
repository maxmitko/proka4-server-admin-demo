import React from 'react'
import AppointmentTable from '../Appointment/AppointmentTable'
import OrdersTable from '../Orders/OrdersTable'
import styled from 'styled-components';

const OrdersPage = props => {
    return (
        <Wrapper>
            <AppointmentTable />
            <OrdersTable />
        </Wrapper>
    )
}

export default OrdersPage

const Wrapper = styled.div`
    margin: 0 -15px;
    /* max-width: 1200px; */

    > div {
        margin: 0px 15px;
        margin-bottom: 30px;
    }
`