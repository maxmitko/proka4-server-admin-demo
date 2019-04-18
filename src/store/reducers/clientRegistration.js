import { createDateAsUTC } from '../utils/createDateAsUTC'
import { immerReducer } from "../utils/reducers";

export const CLIENT_REGISTRATION_TOGGLE_EXPIRED_FILTER = 'CLIENT_REGISTRATION_TOGGLE_EXPIRED_FILTER';
export const CLIENT_REGISTRATION_SELECT_SERVICE = 'CLIENT_REGISTRATION_SELECT_SERVICE';
export const CLIENT_REGISTRATION_REGISTRATE = 'CLIENT_REGISTRATION_REGISTRATE';
export const CLIENT_REGISTRATION_SELECT_TIME = 'CLIENT_REGISTRATION_SELECT_TIME';
export const CLIENT_REGISTRATION_SELECT_DATE = 'CLIENT_REGISTRATION_SELECT_DATE';

const handlers = {
    [CLIENT_REGISTRATION_TOGGLE_EXPIRED_FILTER]: (draftState, { payload }) => {
        draftState.expiredDate = !draftState.expiredDate
    },
    [CLIENT_REGISTRATION_SELECT_SERVICE]: (draftState, { payload }) => {
        draftState.serviceFilter = payload
    },
    [CLIENT_REGISTRATION_SELECT_TIME]: (draftState, { payload }) => {
        draftState.timeFilter = payload
    },
    [CLIENT_REGISTRATION_SELECT_DATE]: (draftState, { payload }) => {
        draftState.dateFilter = payload
    },
}


const initialState = {
    positiveRemainder: true,
    expiredDate: false,
    serviceFilter: undefined,
    timeFilter: undefined,
    dateFilter: createDateAsUTC(new Date()),
}

//REDUCER
export default immerReducer(initialState, handlers)

// Page Actions

export const toggleExpiredFilter = () => ({ type: CLIENT_REGISTRATION_TOGGLE_EXPIRED_FILTER })
export const selectService = id => ({ type: CLIENT_REGISTRATION_SELECT_SERVICE, payload: id })
export const registrateVisit = () => ({ type: CLIENT_REGISTRATION_REGISTRATE })
export const selectTime = time => ({ type: CLIENT_REGISTRATION_SELECT_TIME, payload: time })
export const selectDate = date => ({ type: CLIENT_REGISTRATION_SELECT_DATE, payload: date })