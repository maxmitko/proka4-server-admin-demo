
import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'schedule_type' })

export const SCHEDULE_TYPE_TOGGLE_ACTIVE_REQUEST = 'SCHEDULE_TYPE_TOGGLE_ACTIVE_REQUEST';
export const SCHEDULE_TYPE_TOGGLE_ACTIVE_SUCCESS = 'SCHEDULE_TYPE_TOGGLE_ACTIVE_SUCCESS';
export const SCHEDULE_TYPE_TOGGLE_ACTIVE_FAILURE = 'SCHEDULE_TYPE_TOGGLE_ACTIVE_FAILURE';

const extend = {
    [SCHEDULE_TYPE_TOGGLE_ACTIVE_REQUEST]: (draftState, { payload }) => {
        draftState.crud.data = payload
        draftState.crud.loading = true
    },
    [SCHEDULE_TYPE_TOGGLE_ACTIVE_SUCCESS]: (draftState, { payload }) => {
        draftState.crud.loading = false
        draftState.data = draftState.data.map(item => {
            return item.id === draftState.crud.data.id
                ? { ...item, isActive: draftState.crud.data.isActive }
                : item
        })
    },
    [SCHEDULE_TYPE_TOGGLE_ACTIVE_FAILURE]: (draftState, { payload }) => {
        draftState.crud.error = true
        draftState.crud.loading = false
    },
}

export default immerReducer(initialState, { ...handlers, ...extend })

// Page Actions

export const toggleActive = data => ({
    type: SCHEDULE_TYPE_TOGGLE_ACTIVE_REQUEST,
    payload: data
})
