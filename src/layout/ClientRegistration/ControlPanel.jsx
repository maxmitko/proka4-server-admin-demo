import 'moment/locale/ru';

import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button';
import Checkbox from 'components/Checkbox'
import Label from 'components/Label'
import Paper from 'components/Paper'
import Select from 'components/Select';
import React, { useCallback, useEffect } from 'react'
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { toggleRemainderFilter } from "store/reducers/clientCard"
import { registrateVisit, selectDate, selectService, selectTime, toggleExpiredFilter } from "store/reducers/clientRegistration"
import { actionCreator as TimeListActions } from "store/reducers/scheduleWeekTime"
import { actionCreator as serviceActions } from "store/reducers/service"
import styled from 'styled-components';

import AccessTime from '@material-ui/icons/AccessTime'
import Build from '@material-ui/icons/Build'
import FitnessCenter from '@material-ui/icons/FitnessCenter'

const ControlPanel = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(({ service, scheduleWeekTime, clientCard, clientRegistration }) => ({
        service,
        scheduleWeekTime,
        clientCard,
        clientRegistration,
    }), [])

    const fetchServiceList = useCallback(props => dispatch(serviceActions.fetchList(props)), []);
    const fetchTimeList = useCallback(props => dispatch(TimeListActions.fetchList(props)), []);
    const toggleRemainder = useCallback(id => dispatch(toggleRemainderFilter(id)), []);
    const toggleExpired = useCallback(id => dispatch(toggleExpiredFilter(id)), []);

    const {
        service,
        scheduleWeekTime,
        clientCard,
        clientRegistration,
    } = useMappedState(mapState);

    const {
        expiredDate,
        serviceFilter,
        timeFilter,
        dateFilter,
    } = clientRegistration

    useEffect(() => {
        if (!service.data.length) fetchServiceList()
        if (!scheduleWeekTime.data.length) fetchTimeList()
    }, [service.data, scheduleWeekTime.data]);

    const selectServiceHandle = useCallback(e => {
        let value = e.target.dataset.value
        if (value === "all") value = undefined
        dispatch(selectService(value))
    }, []);

    const selectDateHandle = useCallback(value => {
        dispatch(selectDate(value))
    }, []);

    const selectTimeHandle = useCallback(e => {
        let value = e.target.dataset.value
        if (value === "all") value = undefined
        dispatch(selectTime(value))
    }, []);

    const registrateVisitHandle = useCallback(() => dispatch(registrateVisit()), []);

    return (
        <ControlWrapper>
            <HeaderBadge><Build /></HeaderBadge>
            <Content>
                <FilterLabel>Только с квотой
                <Checkbox
                        checked={clientCard.options.positiveRemainder}
                        variant="toggle"
                        onChange={() => toggleRemainder()}
                    />
                </FilterLabel>
                <FilterLabel>Истекшие по дате
                <Checkbox
                        checked={expiredDate}
                        variant="toggle"
                        onChange={() => toggleExpired()}
                    />
                </FilterLabel>
                <Select
                    data={service.selectFormat}
                    value={serviceFilter || 'all'}
                    onChange={selectServiceHandle}
                    variant="outlined"
                    icon={<FitnessCenter />}
                />
                <Select
                    data={scheduleWeekTime.selectFormat}
                    value={timeFilter || 'all'}
                    onChange={selectTimeHandle}
                    variant="outlined"
                    icon={<AccessTime />}
                />
                <DayPicker
                    localeUtils={MomentLocaleUtils}
                    locale="ru"
                    selectedDays={dateFilter}
                    onDayClick={selectDateHandle}
                    todayButton="текущий месяц"
                />
                <RegBtn
                    onClick={registrateVisitHandle}
                    disabled={!serviceFilter || !timeFilter}
                    fullWidth
                >
                    Зарегестрировать
                </RegBtn>
            </Content>
        </ControlWrapper>
    )
}

export default ControlPanel;


const RegBtn = styled(Button)`
    margin: 20px 0;
`

const FilterLabel = styled(Label)`
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 5px;
`

export const ControlWrapper = styled(Paper)`
    display: flex;
    flex-direction: column;
    margin-right: 24px;
    align-self: flex-start;
    max-width: 310px;
    box-sizing: border-box;
    padding-top: 0;
`

export const Content = styled.div`
    & > * {
        margin-top: 25px;
    }
`