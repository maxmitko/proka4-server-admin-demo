
import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'
import produce from 'immer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'schedule_week_time' })

export const SCHEDULE_TIME_TOGGLE_ACTIVE_REQUEST = 'SCHEDULE_TIME_TOGGLE_ACTIVE_REQUEST';
export const SCHEDULE_TIME_TOGGLE_ACTIVE_SUCCESS = 'SCHEDULE_TIME_TOGGLE_ACTIVE_SUCCESS';
export const SCHEDULE_TIME_TOGGLE_ACTIVE_FAILURE = 'SCHEDULE_TIME_TOGGLE_ACTIVE_FAILURE';

handlers[constants.fetchListSuccess] = (draftState, { payload }) => {
    const [data, totalCount] = payload

    const selectFormat = data.map(item => ({ label: item.title.slice(0, -3), value: item.id }))
    selectFormat.unshift({ label: "Все", value: 'all' })

    draftState.data = data
    draftState.selectFormat = selectFormat
    draftState.totalCount = totalCount
    draftState.loading = false
}

const extend = {
    [SCHEDULE_TIME_TOGGLE_ACTIVE_REQUEST]: (draftState, { payload }) => {
        draftState.crud.data = payload
        draftState.crud.loading = true
    },
    [SCHEDULE_TIME_TOGGLE_ACTIVE_SUCCESS]: (draftState, { payload }) => {
        draftState.crud.loading = false
        draftState.data = draftState.data.map(item => {
            return item.id === draftState.crud.data.id
                ? { ...item, isActive: draftState.crud.data.isActive }
                : item
        })
    },
    [SCHEDULE_TIME_TOGGLE_ACTIVE_FAILURE]: (draftState, { payload }) => {
        draftState.crud.error = true
        draftState.crud.loading = false
    },
}

const produceInitialState = produce(initialState, draftState => {
    draftState['selectFormat'] = []
    draftState.options = { ...draftState.options, order: { title: "ASC" } }
})

export default immerReducer(produceInitialState, { ...handlers, ...extend })

// Page Actions

export const toggleActive = data => ({
    type: SCHEDULE_TIME_TOGGLE_ACTIVE_REQUEST,
    payload: data
})
