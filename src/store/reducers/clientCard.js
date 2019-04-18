import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'
import produce from 'immer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'client_card' })

export const CLIENT_CARD_CHANGE_USER_STATUS = 'CLIENT_CARD_CHANGE_USER_STATUS';
export const CLIENT_CARD_SELECT_DEFAULT_STATUS = 'CLIENT_CARD_SELECT_DEFAULT_STATUS';
export const CLIENT_CARD_TOGGLE_REMAINDER_FILTER = 'CLIENT_CARD_TOGGLE_REMAINDER_FILTER';

const producedHandlers = {
    ...handlers,
    [CLIENT_CARD_CHANGE_USER_STATUS]: (draftState, { payload }) => {
        draftState.data[payload.index].visitStatus = payload.value
    },
    [CLIENT_CARD_SELECT_DEFAULT_STATUS]: (draftState, { payload }) => {
        draftState.defaultStatus = payload
        draftState.data = draftState.data.map(item => ({ ...item, visitStatus: payload }))
    },
    [CLIENT_CARD_TOGGLE_REMAINDER_FILTER]: (draftState, { payload }) => {
        draftState.options.positiveRemainder = !draftState.options.positiveRemainder
    }
}

const produceInitialState = produce(initialState, draftState => {
    draftState.defaultStatus = 1
    draftState.options.positiveRemainder = true
})

//REDUCER
export default immerReducer(produceInitialState, producedHandlers)

// Page Actions

export const selectStatus = (index, value) => ({ type: CLIENT_CARD_CHANGE_USER_STATUS, payload: { index, value } })
export const selectDefautStatus = value => ({ type: CLIENT_CARD_SELECT_DEFAULT_STATUS, payload: value })
export const toggleRemainderFilter = () => ({ type: CLIENT_CARD_TOGGLE_REMAINDER_FILTER })
