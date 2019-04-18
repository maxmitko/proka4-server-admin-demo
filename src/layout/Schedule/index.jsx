import React from 'react'
import ScheduleList from '../ScheduleList/ScheduleListTable'
import Groups from '../ScheduleType/ScheduleTypeTable'
import ScheduleWeekTime from '../ScheduleWeekTime/ScheduleWeekTable'
import Week from '../ScheduleWeek/index'
import styled from 'styled-components'
import Paper from 'components/Paper'

const SchedulePage = props => {
    return (
        <Wrapper>
            <Paper>
                <ScheduleList />
                <Devider />
                <Week />
            </Paper>
            <Bottom>
                <Groups />
                <ScheduleWeekTime />
            </Bottom>

        </Wrapper>
    )
}

export default SchedulePage

const Wrapper = styled.div`
    margin: 0 -15px;

    > div {
        margin: 0px 15px;
        margin-bottom: 30px;
    }
`
const Devider = styled.div`
    border-bottom: 1px solid #eee;
`

const Bottom = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 0px !important;

    > div {
        flex-grow: 1;
        margin: 0 15px;
    }
`